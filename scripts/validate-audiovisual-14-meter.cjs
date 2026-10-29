// Exercise the real canvas drawing loop at ordinary and high pixel densities.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({headless: true, ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {})});
  try {
    for (const deviceScaleFactor of [1, 1.1, 1.25, 1.5, 1.75, 2]) {
      const page = await browser.newPage({viewport: {width: 1366, height: 900}, deviceScaleFactor});
      await page.goto('file://' + path.resolve(__dirname, '../modelos/producao-audiovisual/aula-14/mesa.html'));
      await page.waitForFunction(() => window.AULA14_MESA);
      await page.click('#play');
      for (const width of [1366, 700, 1366]) {
        await page.setViewportSize({width, height: 900});
        await page.evaluate(() => new Promise(resolve => {
          let remaining = 30;
          function frame() { if (--remaining) requestAnimationFrame(frame); else resolve(); }
          requestAnimationFrame(frame);
        }));
        const sizes = await page.locator('.meter canvas').evaluateAll(canvases => canvases.map(canvas => ({
          height: canvas.clientHeight, width: canvas.clientWidth,
          bitmapHeight: canvas.height, bitmapWidth: canvas.width,
          containerHeight: canvas.parentElement.clientHeight
        })));
        console.log(JSON.stringify({deviceScaleFactor, width, sizes}));
        for (const size of sizes) {
          assert.ok(size.height <= size.containerHeight, 'peak canvas must stay inside its fixed-height meter');
          assert.ok(size.width <= 84, 'peak canvas must stay inside its meter column');
          assert.equal(size.bitmapHeight, Math.round(size.height * deviceScaleFactor));
          assert.equal(size.bitmapWidth, Math.round(size.width * deviceScaleFactor));
        }
      }
      assert.match(await page.locator('#peak').innerText(), /dBFS/);
      await page.click('#play');
      await page.click('#resetPeak');
      assert.equal(await page.locator('#peak').innerText(), '−∞ dBFS');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => {console.error(error); process.exitCode = 1;});
