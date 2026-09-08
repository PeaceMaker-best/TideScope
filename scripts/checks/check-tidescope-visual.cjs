const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const root = path.resolve(__dirname, '../..');
  const output = path.join(root, 'tmp', 'tidescope-visual');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const checks = [];
  try {
    for (const profile of [
      { name: 'desktop-light', width: 1440, height: 1000, mode: 'light' },
      { name: 'desktop-dark', width: 1440, height: 1000, mode: 'dark' },
      { name: 'mobile-light', width: 390, height: 844, mode: 'light' },
      { name: 'mobile-dark', width: 390, height: 844, mode: 'dark' },
    ]) {
      const context = await browser.newContext({ viewport: profile, colorScheme: profile.mode, reducedMotion: 'reduce' });
      await context.addInitScript(mode => localStorage.setItem('quantpilot-color-mode', mode), profile.mode);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle', timeout: 60000 });
      await page.getByRole('heading', { name: '今天想研究什么？' }).waitFor();
      await page.locator('img[alt*="无人海湾"]').evaluate(img => img.decode());
      const layout = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.title,
        images: Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
      }));
      if (response.status() !== 200 || layout.scrollWidth > layout.width || layout.images.length || errors.length || !layout.title.includes('TideScope')) {
        throw new Error(JSON.stringify({ profile: profile.name, status: response.status(), layout, errors }));
      }
      await page.screenshot({ path: path.join(output, `${profile.name}.png`), fullPage: true });
      const prompt = page.getByRole('textbox', { name: '量化分析需求' });
      await prompt.fill('对比贵州茅台与五粮液近三个月走势');
      await page.getByRole('button', { name: '生成看板', exact: true }).click();
      if (!(await prompt.inputValue()).includes('贵州茅台')) throw new Error('Mode toggle lost input');
      const drawer = page.getByRole('button', { name: /^项目/ }).filter({ visible: true }).first();
      await drawer.click();
      await page.getByRole('textbox', { name: '搜索任务记录' }).waitFor();
      await page.keyboard.press('Escape');
      checks.push({ profile: profile.name, status: response.status(), ...layout, errors, inputAndDrawer: 'passed' });
      await context.close();
    }
    const page = await browser.newPage();
    for (const url of ['/skills', '/eval-platform', '/ops-platform']) {
      const response = await page.goto(`http://127.0.0.1:3000${url}`, { waitUntil: 'networkidle', timeout: 60000 });
      if (response.status() !== 200 || !(await page.title()).includes('TideScope')) throw new Error(`Failed page: ${url}`);
      checks.push({ page: url, status: response.status(), title: await page.title() });
    }
    const manifest = await (await page.request.get('http://127.0.0.1:3000/manifest.webmanifest')).json();
    if (!manifest.name.includes('TideScope')) throw new Error('Manifest not rebranded');
    for (const icon of manifest.icons) {
      if (!(await page.request.get(`http://127.0.0.1:3000${icon.src}`)).ok()) throw new Error(`Missing icon ${icon.src}`);
    }
    await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(checks, null, 2));
    console.log(JSON.stringify(checks, null, 2));
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
