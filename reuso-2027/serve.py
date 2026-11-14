#!/usr/bin/env python3
"""Dois servidores: docente somente em loopback; discente somente arquivos autorizados."""
import argparse
import json
import mimetypes
import re
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


def make_handler(package, role):
    root = (package / role).resolve()
    resources = set(json.loads((package / "resources.json").read_text()))
    class Handler(BaseHTTPRequestHandler):
        def do_HEAD(self):
            self.respond(False)

        def do_GET(self):
            self.respond(True)

        def respond(self, body):
            url = unquote(urlsplit(self.path).path)
            if "\x00" in url or ".." in Path(url).parts:
                return self.send_error(404)
            if url.startswith("/recursos/"):
                relative = url.removeprefix("/recursos/")
                if relative not in resources:
                    return self.send_error(404)
                base = (package / "recursos").resolve()
                path = (base / relative).resolve()
            else:
                base = root
                path = (root / url.lstrip("/")).resolve()
                if url in ("/", ""):
                    path = root / "index.html"
                allowed = path.name in ("index.html", "app.js", "app.css", "media.js") and path.parent == root
                allowed |= path.parent == root / "data" and path.suffix == ".json"
                allowed |= role == "docente" and path.parent == root / "visuais" and bool(re.fullmatch(r"fotografia-\d{2}\.html", path.name))
                if not allowed:
                    return self.send_error(404)
            if not path.is_relative_to(base) or not path.is_file():
                return self.send_error(404)
            size = path.stat().st_size
            start, end = 0, size - 1
            partial = False
            if value := self.headers.get("Range"):
                match = re.fullmatch(r"bytes=(\d*)-(\d*)", value.strip())
                if not match or not any(match.groups()):
                    return self.send_error(416)
                if match.group(1):
                    start = int(match.group(1))
                    end = min(end, int(match.group(2))) if match.group(2) else end
                else:
                    start = max(0, size - int(match.group(2)))
                if start > end or start >= size:
                    self.send_response(416)
                    self.send_header("Content-Range", f"bytes */{size}")
                    self.end_headers()
                    return
                partial = True
            self.send_response(206 if partial else 200)
            content_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
            if content_type.startswith("text/") or content_type in ("application/json", "application/javascript"):
                content_type += "; charset=utf-8"
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(end - start + 1))
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "same-origin")
            if partial:
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.end_headers()
            if body:
                try:
                    with path.open("rb") as stream:
                        stream.seek(start)
                        remaining = end - start + 1
                        while remaining:
                            chunk = stream.read(min(65536, remaining))
                            if not chunk:
                                break
                            self.wfile.write(chunk)
                            remaining -= len(chunk)
                except (BrokenPipeError, ConnectionResetError):
                    pass

        def log_message(self, format, *args):
            if args and str(args[1] if len(args) > 1 else "").startswith(("4", "5")):
                super().log_message(format, *args)
    return Handler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", type=Path, default=Path(__file__).resolve().parent)
    parser.add_argument("--teacher-port", type=int, default=8870)
    parser.add_argument("--student-port", type=int, default=8871)
    parser.add_argument("--student-host", default="127.0.0.1", help="Use 0.0.0.0 apenas para compartilhar com a rede da sala")
    parser.add_argument("--open", action="store_true")
    args = parser.parse_args()
    package = args.package.resolve()
    servers = []
    for role, host, port in (("docente", "127.0.0.1", args.teacher_port), ("alunos", args.student_host, args.student_port)):
        server = ThreadingHTTPServer((host, port), make_handler(package, role))
        servers.append(server)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        print(f'{role}: http://127.0.0.1:{port} ({host})', flush=True)
    if args.open:
        webbrowser.open(f"http://127.0.0.1:{args.teacher_port}")
    print("Deixe esta janela aberta. Ctrl+C encerra os dois servidores.", flush=True)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        for server in servers:
            server.shutdown()


if __name__ == "__main__":
    main()
