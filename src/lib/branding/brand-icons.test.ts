import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

describe('TideScope brand icons', () => {
  it('keeps the browser and application icons on the same SVG brand mark', async () => {
    const [publicMark, appIcon] = await Promise.all([
      fs.readFile(path.join(root, 'public', 'tidescope-mark.svg'), 'utf8'),
      fs.readFile(path.join(root, 'src', 'app', 'icon.svg'), 'utf8'),
    ]);

    expect(appIcon.trim()).toBe(publicMark.trim());
    expect(publicMark).toContain('#126F7D');
    expect(publicMark).toContain('#F3D9A4');
    expect(publicMark).toContain('<circle cx="43" cy="20" r="7"');
    expect(publicMark).toContain('M10 34C20 22 29 22 39 34C44 40 49 40 54 35');
  });

  it.each([
    ['public/tidescope-16.png', 16],
    ['public/tidescope-32.png', 32],
    ['public/tidescope-180.png', 180],
    ['public/icons/tidescope-192.png', 192],
    ['public/icons/tidescope-512.png', 512],
  ])('provides %s at %ipx', async (relativePath, size) => {
    const metadata = await sharp(path.join(root, relativePath)).metadata();
    expect(metadata.format).toBe('png');
    expect(metadata.width).toBe(size);
    expect(metadata.height).toBe(size);
    expect(metadata.hasAlpha).toBe(true);
  });
});
