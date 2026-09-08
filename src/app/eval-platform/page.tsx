import { getQuantEvalDashboardData } from '@/lib/eval';
import EvalsDashboardClient from './EvalsDashboardClient';
import type { Metadata } from 'next';
import { BRAND_ENGLISH_NAME } from '@/lib/brand';

export const metadata: Metadata = {
  title: `评测平台 · ${BRAND_ENGLISH_NAME}`,
};

export default async function EvalPlatformPage() {
  const data = await getQuantEvalDashboardData();
  return <EvalsDashboardClient data={data} />;
}

export const dynamic = 'force-dynamic';
