// Extracts Aula14-Som.zip to a temporary folder and opens the pages from file://, as the class will.
// Requires local Chromium (Playwright); never uses an external service.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

const kit = path.join(__dirname, '../modelos/producao-audiovisual/aula-14');
const manifest = JSON.parse(fs.readFileSync(path.join(kit, 'kit-manifest.json'), 'utf8'));

(async () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'aula14-'));
  execFileSync('python3', ['-c', 'import sys, zipfile; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', path.join(kit, 'Aula14-Som.zip'), folder]);
  const extracted = path.join(folder, 'Aula14-Som');
  const browser = await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {}), headless: true});
  try {
    const context = await browser.newContext({viewport: {width: 1366, height: 900}, acceptDownloads: true});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

    // Mesa de som: the four layers decode from sons.js without a server.
    await page.goto('file://' + path.join(extracted, 'mesa.html'));
    await page.waitForFunction(() => window.AULA14_MESA, null, {timeout: 30000});
    assert.equal(await page.locator('.strip').count(), 4);
    assert.equal(await page.locator('.fala').count(), 4);
    const measured = await page.evaluate(async (reference) => {
      const peak = (buffer) => { let max = 0; for (const c of [0, 1]) for (const v of buffer.getChannelData(c)) max = Math.max(max, Math.abs(v)); return 20 * Math.log10(max); };
      const rms = (buffer, from, to) => { let sum = 0, n = 0; for (const c of [0, 1]) { const d = buffer.getChannelData(c); for (let i = Math.round(from * 48000); i < Math.round(to * 48000); i++) { sum += d[i] * d[i]; n++; } } return 10 * Math.log10(sum / n + 1e-30); };
      const initial = window.AULA14_MESA.settings();
      const ref = JSON.parse(JSON.stringify(initial));
      Object.assign(ref.voz, {db: reference.voz_db, falas: reference.falas_db, hp: reference.passa_alta, pres: reference.presenca_db, vaos: reference.vaos});
      Object.assign(ref.trilha, {db: reference.trilha_db, duck: reference.abaixar_db, fadeIn: reference.entrada, fadeOut: reference.saida});
      ref.ambiencia.db = reference.ambiencia_db; ref.efeitos.db = reference.efeitos_db; ref.master.db = reference.master_db;
      const solo = (settings) => { const copy = JSON.parse(JSON.stringify(settings)); copy.voz.solo = true; return copy; };
      const [mixInitial, mixRef, voiceInitial, voiceRef] = await Promise.all([initial, ref, solo(initial), solo(ref)].map((s) => window.AULA14_MESA.render(s)));
      const noVoice = JSON.parse(JSON.stringify(ref)); noVoice.voz.mute = true;
      const mixNoVoice = await window.AULA14_MESA.render(noVoice);
      return {initialPeak: peak(mixInitial), refPeak: peak(mixRef), length: mixRef.length,
        gapInitial: rms(voiceInitial, 4.7, 7.3), gapRef: rms(voiceRef, 4.7, 7.3),
        startInitial: rms(mixInitial, 0, 0.1), startRef: rms(mixRef, 0, 0.1), endInitial: rms(mixInitial, 29.8, 30), endRef: rms(mixRef, 29.8, 30),
        noVoiceGap: Math.abs(rms(mixNoVoice, 20, 25) - rms(mixRef, 20, 25))};
    }, manifest.referencia);
    assert.equal(measured.length, 30 * 48000, 'a exportação tem 30 s');
    assert.ok(measured.initialPeak > 0, 'a mesa inicial precisa estourar para o pedido 1');
    assert.ok(measured.refPeak <= -1, `a mixagem de referência fica abaixo de −1 dBFS (${measured.refPeak.toFixed(1)})`);
    assert.ok(measured.gapInitial > -45 && measured.gapRef < -90, 'cortar os vãos silencia o ruído entre as falas');
    assert.ok(measured.startRef < measured.startInitial - 15 && measured.endRef < measured.endInitial - 15, 'entrada e saída graduais');
    assert.ok(measured.noVoiceGap < 0.5, 'a versão sem voz mantém o equilíbrio nos trechos sem fala');

    // Real export through the UI: a 30 s, 16-bit stereo WAV.
    await page.selectOption('#exportName', 'mix-final');
    const [download] = await Promise.all([page.waitForEvent('download'), page.click('#export')]);
    assert.equal(download.suggestedFilename(), 'mix-final.wav');
    const wav = fs.readFileSync(await download.path());
    assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
    assert.equal(wav.readUInt16LE(22), 2);
    assert.equal(wav.readUInt32LE(40), 30 * 48000 * 4);
    assert.match(await page.locator('#exportResult').innerText(), /passou do limite/, 'a mesa inicial avisa o pico acima do limite');
    assert.match(await page.locator('#exportResult').innerText(), /apague antes o arquivo anterior/);
    // Leftover solo is flagged on export.
    await page.click('#voz-solo');
    await Promise.all([page.waitForEvent('download'), page.click('#export')]);
    assert.match(await page.locator('#exportResult').innerText(), /S ligado em VOZ/, 'exportar com solo ligado avisa');
    // After a pointer click on M/S, Space plays instead of toggling the focused button.
    await page.keyboard.press('Space');
    assert.equal(await page.locator('#voz-solo').getAttribute('aria-pressed'), 'true', 'espaço não alterna o botão tocado com a caneta');
    assert.match(await page.locator('#play').innerText(), /Pausar/, 'espaço toca a cena');
    await page.keyboard.press('Space');
    await page.click('#voz-solo');
    // A/B plays the clipping initial mesa without polluting the peak of the student's mix.
    // Play and pause in quick succession must never leave the position before the start.
    await page.click('#play');
    await page.click('#play');
    const ambience = await page.locator('[data-lane="ambiencia"]').boundingBox();
    await page.mouse.click(ambience.x + ambience.width * 19 / 30, ambience.y + ambience.height / 2);
    await page.click('#ab');
    await page.click('#play');
    await page.waitForTimeout(5000);
    await page.click('#play');
    assert.equal(await page.locator('#clip').getAttribute('class'), 'led', 'A/B toca a mesa inicial sem acender Estourou');
    assert.match(await page.locator('#peak').innerText(), /−∞/, 'A/B não conta no pico da mixagem');
    await page.click('#ab');
    await page.click('#rewind');

    // Controls persist and redraw; the playhead moves with the video.
    await page.locator('#trilhaDb').fill('-12');
    await page.locator('input[name="hp"][value="120"]').check({force: true});
    await page.click('#play');
    await page.waitForTimeout(1500);
    const sync = await page.evaluate(() => ({video: document.getElementById('video').currentTime, label: document.getElementById('play').textContent, time: document.getElementById('time').textContent}));
    assert.ok(sync.video > 0.8, 'o vídeo acompanha o som');
    await page.click('#play');
    await page.reload();
    await page.waitForFunction(() => window.AULA14_MESA);
    const saved = await page.evaluate(() => window.AULA14_MESA.settings());
    assert.equal(saved.trilha.db, -12);
    assert.equal(saved.voz.hp, 120);

    // Volume desenhado: a stroke low on the TRILHA lane lowers the music; the pen eraser restores 0 dB.
    await page.locator('#useDraw').check();
    assert.equal(await page.locator('input[name="duck"]').first().isDisabled(), true, 'o desenho substitui o abaixamento automático');
    const lane = await page.locator('[data-lane="trilha"]').boundingBox();
    const xAt = (seconds) => lane.x + seconds / 30 * lane.width;
    await page.mouse.move(xAt(10), lane.y + lane.height * 0.95);
    await page.mouse.down();
    for (let t = 10; t <= 20; t += 0.5) await page.mouse.move(xAt(t), lane.y + lane.height * 0.95);
    await page.mouse.up();
    const drawn = await page.evaluate(async () => {
      const s = window.AULA14_MESA.settings();
      const rms = (buffer, from, to) => { let sum = 0, n = 0; const d = buffer.getChannelData(0); for (let i = Math.round(from * 48000); i < Math.round(to * 48000); i++) { sum += d[i] * d[i]; n++; } return 10 * Math.log10(sum / n + 1e-30); };
      const only = (settings) => { const copy = JSON.parse(JSON.stringify(settings)); copy.trilha.solo = true; return copy; };
      const flat = JSON.parse(JSON.stringify(s)); flat.trilha.useDraw = false;
      const [withDraw, without] = await Promise.all([only(s), only(flat)].map((x) => window.AULA14_MESA.render(x)));
      return {low: s.trilha.draw[150], untouched: s.trilha.draw[50], drop: rms(without, 12, 18) - rms(withDraw, 12, 18), same: Math.abs(rms(without, 2, 6) - rms(withDraw, 2, 6))};
    });
    assert.ok(drawn.low <= -27 && drawn.untouched === 0, `o traço grava o volume desenhado (${drawn.low} dB)`);
    assert.ok(drawn.drop > 20 && drawn.same < 0.5, 'a música desce só onde a linha foi desenhada');
    // Pen hover shows the value before touching; the eraser end (button 5) restores 0 dB.
    await page.evaluate(({x, y}) => {
      const target = document.querySelector('[data-lane="trilha"]');
      const pen = (type, extra) => target.dispatchEvent(new PointerEvent(type, {bubbles: true, pointerId: 7, pointerType: 'pen', clientX: x, clientY: y, ...extra}));
      pen('pointermove', {buttons: 0, pressure: 0});
      window.__hover = document.getElementById('drawReadout').textContent;
      pen('pointerdown', {button: 5, buttons: 32, pressure: 0.6});
      pen('pointerup', {button: 5, buttons: 0, pressure: 0});
    }, {x: xAt(15), y: lane.y + lane.height * 0.95});
    assert.match(await page.evaluate(() => window.__hover), /00:15,0 · −2\d,\d dB/, 'a caneta pairando mostra tempo e volume');
    assert.equal(await page.evaluate(() => window.AULA14_MESA.settings().trilha.draw[150]), 0, 'a borracha da caneta volta a 0 dB');
    await page.click('#clearDraw');
    await page.locator('#useDraw').uncheck();

    // Laboratório de espera: 1 Mbps in 1080p stalls; the editor diagnosis separates the five tools.
    await page.goto('file://' + path.join(extracted, 'buffering.html'));
    await page.locator('input[name="bw"][value="1"]').check({force: true});
    await page.locator('#fast').check();
    await page.click('#start');
    await page.waitForTimeout(6000);
    await page.click('#stop');
    assert.ok(Number(await page.locator('#mStalls').innerText()) >= 1, '1 Mbps em 1080p precisa travar');
    assert.match(await page.locator('#log').innerText(), /1 Mbps · 1080p/);
    const answers = ['Buffering', 'Render de trecho', 'Proxy', 'Resolução de preview', 'Cache', 'Buffering', 'Cache', 'Proxy'];
    for (const [index, answer] of answers.entries()) await page.locator(`button[data-case="${index}"]`, {hasText: answer}).click();
    assert.match(await page.locator('#score').innerText(), /8 de 8/);
    const [diagnosis] = await Promise.all([page.waitForEvent('download'), page.click('#download')]);
    assert.equal(diagnosis.suggestedFilename(), 'diagnostico-aula14.txt');
    assert.match(fs.readFileSync(await diagnosis.path(), 'utf8'), /Correta: Render de trecho/);

    assert.deepEqual(errors, [], 'sem erros nas páginas do kit');
    console.log(`Aula 14 no navegador: mesa abre do ZIP extraído, inicial ${measured.initialPeak.toFixed(1)} dBFS, referência ${measured.refPeak.toFixed(1)} dBFS, WAV de 30 s, ajustes guardados, volume desenhado com caneta e borracha, buffering e diagnóstico 8/8.`);
  } finally {
    await browser.close();
    fs.rmSync(folder, {recursive: true, force: true});
  }
})().catch((error) => { console.error(error); process.exit(1); });
