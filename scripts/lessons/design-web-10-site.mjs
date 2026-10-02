// Aula 10 de Design Web: a página da Arena Pixel publicada em duas versões.
// A versão de teste esconde cinco problemas para a turma encontrar; a corrigida resolve todos.
export const problems = [
  'Erro de escrita: "Xadres rápido" no quarto cartão.',
  'Dado pessoal: telefone particular do Rafael no rodapé.',
  'Botão Quero participar leva a uma página que não existe.',
  'Imagem do destaque não carrega (arquivo não encontrado).',
  'No celular, os quatro cartões continuam lado a lado, espremidos e cortados.'
];

const cards = fixed => [
  ['Corrida', 'Sexta · 19h', '#FF4F7B'],
  ['Futebol', 'Sexta · 20h', '#6C4CF5'],
  ['Luta', 'Sexta · 21h', '#1F8A5B'],
  [fixed ? 'Xadrez rápido' : 'Xadres rápido', 'Sábado · 15h', '#C2185B']
];

const controller = `<svg viewBox="0 0 120 80" aria-hidden="true"><rect x="8" y="18" width="104" height="48" rx="24" fill="#FFD23F"/><rect x="26" y="36" width="24" height="8" rx="2" fill="#1B1440"/><rect x="34" y="28" width="8" height="24" rx="2" fill="#1B1440"/><circle cx="82" cy="34" r="6" fill="#FF4F7B"/><circle cx="96" cy="46" r="6" fill="#6C4CF5"/></svg>`;

export function hubPage() {
  const card = (href, tag, title, text) => `<a class="card" href="${href}"><span class="tag">${tag}</span><strong>${title}</strong><span>${text}</span></a>`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Do protótipo ao link · Oficinas de Design Web</title>
<link rel="icon" href="data:,">
<style>
  :root{--ink:#251e3d;--muted:#655d78;--line:#ddd8e6;--accent:#6141ce;--ground:#f3f1f6;--card:#ffffff}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;background:var(--ground);color:var(--ink);font:16px/1.5 Arial,Helvetica,sans-serif;padding:48px 20px}
  main{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:24px}
  h1{margin:0;font-size:28px;letter-spacing:-.4px}
  p{margin:0;color:var(--muted)}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
  a.card{display:flex;flex-direction:column;gap:8px;padding:22px;background:var(--card);border:1px solid var(--line);border-radius:10px;color:inherit;text-decoration:none}
  a.card:hover,a.card:focus-visible{border-color:var(--accent);outline:none;box-shadow:0 0 0 3px #6141ce33}
  .tag{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
  .card strong{font-size:20px}
  small{color:var(--muted);font-size:13px}
  small a{color:var(--accent)}
</style>
</head>
<body>
<main>
  <div>
    <h1>Do protótipo ao link</h1>
    <p>A Arena Pixel sai da pasta e ganha um endereço. Siga os cartões na ordem indicada nos slides.</p>
  </div>
  <div class="grid">
    ${card('../aula-09/', '1 · Revisar', 'Oficina responsiva', 'Abra o seu projeto-responsivo.grade e leve o recado do cliente para as três telas.')}
    ${card('teste/', '2 · Testar', 'Página de teste', 'A Arena Pixel publicada sem conferir. Encontre os cinco problemas.')}
    ${card('corrigida/', '3 · Comparar', 'Versão corrigida', 'Abra só depois da caça aos problemas.')}
  </div>
  <small>Empresa e conteúdo fictícios, para estudo. <a href="../">Voltar às oficinas</a></small>
</main>
</body>
</html>
`;
}

export function arenaPage({fixed}) {
  const title = fixed ? 'Arena Pixel · Campeonatos' : 'Arena Pixel · Campeonatos (versão de teste)';
  const picture = fixed
    ? `<div class="pic">${controller}</div>`
    : `<div class="pic broken" role="img" aria-label="Imagem não encontrada"><span class="broken-icon"></span><small>foto-arena-final2.jpg</small></div>`;
  const footer = fixed
    ? 'Arena Pixel · Rua das Flores, 120 · Dúvidas pelo formulário da página. Empresa e conteúdo fictícios, para estudo.'
    : 'Arena Pixel · Rua das Flores, 120 · Dúvidas? Chama o Rafael no (48) 90000-0000. Empresa e conteúdo fictícios, para estudo.';
  const button = fixed ? '#inscricao' : '#pagina-que-nao-existe';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="Campeonatos de games na Arena Pixel, sexta e sábado, com entrada gratuita.">
<link rel="icon" href="data:,">
<style>
  :root{--ink:#1B1440;--purple:#6C4CF5;--pink:#FF4F7B;--yellow:#FFD23F;--ground:#F4F1FA}
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--ground);color:var(--ink);font:16px/1.5 Arial,Helvetica,sans-serif}
  .wrap{max-width:960px;margin:0 auto;padding:24px 20px 40px;display:flex;flex-direction:column;gap:24px}
  header{display:flex;justify-content:space-between;align-items:center;gap:16px;background:var(--ink);color:#fff;border-radius:12px;padding:14px 20px}
  .logo{font-weight:800;font-size:20px;letter-spacing:.02em}.logo b{color:var(--yellow)}
  nav{display:flex;gap:18px}nav a{color:#fff;text-decoration:none;font-size:15px}
  .menu{display:none;color:#fff;font-weight:700}
  .hero{display:grid;grid-template-columns:1.4fr 1fr;gap:20px;align-items:center;background:var(--purple);color:#fff;border-radius:16px;padding:32px}
  .hero h1{margin:0 0 8px;font-size:40px;line-height:1.1}.hero p{margin:0;font-size:18px}
  .pic{aspect-ratio:3/2;border-radius:12px;background:#1B144033;display:grid;place-items:center;padding:12px}
  .pic svg{width:80%}
  .pic.broken{background:#fff;border:2px dashed #b9b2c9;color:#655d78;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
  .broken-icon{width:44px;height:36px;border:3px solid #b9b2c9;border-radius:4px;position:relative}
  .broken-icon::after{content:"";position:absolute;inset:-6px auto auto 18px;width:3px;height:48px;background:#b9b2c9;transform:rotate(35deg)}
  h2{margin:0;font-size:24px}
  .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .card{background:#fff;border-radius:12px;padding:18px;border-top:8px solid var(--c);min-height:130px}
  .card strong{display:block;font-size:20px}.card span{color:#655d78}
  .cta{align-self:flex-start;background:var(--pink);color:#fff;font-weight:700;font-size:18px;text-decoration:none;padding:16px 28px;border-radius:999px}
  #inscricao{background:#fff;border-radius:12px;padding:20px;display:none}
  #inscricao:target{display:block}
  footer{font-size:14px;color:#655d78;border-top:1px solid #ddd8e6;padding-top:16px}
${fixed ? '' : `  .notfound{display:none;position:fixed;inset:0;background:#fff;color:#333;font-family:Georgia,serif;padding:40px;z-index:9}
  #pagina-que-nao-existe:target{display:block}
  .notfound h1{font-size:28px;margin:0 0 12px}.notfound a{color:#00c}
`}${fixed ? `  @media (max-width:640px){
    nav{display:none}.menu{display:block}
    .hero{grid-template-columns:1fr;padding:24px}.hero h1{font-size:30px}
    .pic{aspect-ratio:3/1}.pic svg{width:40%}
    .cta{align-self:stretch;text-align:center;order:2}
    header{order:0}.hero{order:1}h2{order:3}.cards{order:4}#inscricao{order:5}footer{order:6}
    .cards{grid-template-columns:1fr;gap:12px}.card{min-height:0}
    .wrap{gap:20px}
  }` : `  @media (max-width:640px){
    nav{gap:10px}nav a{font-size:12px}
    .hero{padding:20px}.hero h1{font-size:26px}
    .card{padding:8px;overflow:hidden;white-space:nowrap}.card strong{font-size:15px}
    .cards{gap:6px}
  }`}
</style>
</head>
<body>
<div class="wrap">
  <header><span class="logo">Arena <b>Pixel</b></span><nav><a href="#campeonatos">Campeonatos</a><a href="#campeonatos">Horários</a><a href="#contato">Contato</a></nav><span class="menu">Menu</span></header>
  <section class="hero"><div><h1>Campeonatos na Arena</h1><p>Sexta e sábado · entrada gratuita</p></div>${picture}</section>
  <h2 id="campeonatos">Campeonatos</h2>
  <section class="cards">${cards(fixed).map(([t, i, c]) => `<article class="card" style="--c:${c}"><strong>${t}</strong><span>${i}</span></article>`).join('')}</section>
  <a class="cta" href="${button}">Quero participar</a>
  <section id="inscricao"><h2>Inscrição</h2><p>Escolha o campeonato no balcão da Arena. Vagas limitadas.</p></section>
  <footer id="contato">${footer}</footer>
</div>
${fixed ? '' : `<div class="notfound" id="pagina-que-nao-existe"><h1>Página não encontrada</h1><p>O endereço que você abriu não existe.</p><p><a href="#">Voltar</a></p></div>`}
</body>
</html>
`;
}
