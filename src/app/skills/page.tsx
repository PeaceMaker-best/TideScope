import { getSkillsDashboardData } from '@/lib/quant/skills-dashboard';
import SkillsManagementClient from './SkillsManagementClient';
import type { Metadata } from 'next';
import { BRAND_ENGLISH_NAME } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Skills Market · ${BRAND_ENGLISH_NAME}`,
  description: `发现、理解并治理 ${BRAND_ENGLISH_NAME} 的研究技能与工作流能力。`,
};

export default async function SkillsManagementPage() {
  const data = await getSkillsDashboardData();
  return <SkillsManagementClient initialData={data} />;
}

export const dynamic = 'force-dynamic';
