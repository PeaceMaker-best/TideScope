const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const root = process.cwd();
const sourcePath = path.join(root, 'public', 'tidescope-mark.svg');
const targets = [
  { size: 16, path: 'public/tidescope-16.png' },
  { size: 32, path: 'public/tidescope-32.png' },
  { size: 180, path: 'public/tidescope-180.png' },
  { size: 192, path: 'public/icons/tidescope-192.png' },
  { size: 512, path: 'public/icons/tidescope-512.png' },
];

async function main() {
  const source = await fs.readFile(sourcePath);
  await Promise.all(targets.map(async (target) => {
    const outputPath = path.join(root, target.path);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(source, { density: 768 })
      .resize(target.size, target.size, { fit: 'contain' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);
  }));
  console.log(`[brand-icons] generated ${targets.length} assets from public/tidescope-mark.svg`);
}

main().catch((error) => {
  console.error('[brand-icons] failed', error);
  process.exit(1);
});
