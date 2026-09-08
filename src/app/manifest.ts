import type { MetadataRoute } from 'next';
import { BRAND_FULL_NAME, BRAND_ENGLISH_NAME } from '@/lib/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_FULL_NAME} · 金融研究工作台`,
    short_name: BRAND_ENGLISH_NAME,
    description: '从真实行情与证据出发，生成、评测和治理可验证的量化研究看板。',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#157d8b',
    icons: [
      {
        src: '/icons/tidescope-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/tidescope-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
