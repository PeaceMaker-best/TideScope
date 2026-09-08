"use client";

import Image from "next/image";
import { BRAND_FULL_NAME } from "@/lib/brand";

function AboutTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-20 w-20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl" />
          <Image
            src="/tidescope-mark.svg"
            alt={`${BRAND_FULL_NAME} 图标`}
            width={80}
            height={80}
            className="relative z-10 h-full w-full rounded-2xl object-contain shadow-lg"
          />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{BRAND_FULL_NAME}</h3>
        <p className="mt-2 font-medium text-muted-foreground">金融研究与交互式看板工作台</p>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-muted/50 p-6">
        <div className="text-center">
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            {BRAND_FULL_NAME} 基于 QuantPilot 开源项目进行界面定制，是面向量化研发的 AI 工作台，通过开源 PI Agent 与 ModelPort 使用本地 Qwen、
            托管 DeepSeek 及可选官方直连，并串联 GitHub、Supabase 与 Vercel 等工程化服务。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-xl border border-border/50 bg-transparent p-3">
            <div className="mb-2 flex items-center justify-center">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-foreground">快速部署</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-transparent p-3">
            <div className="mb-2 flex items-center justify-center">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-foreground">AI 驱动</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/tiammomo/QuantPilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary transition-colors hover:text-primary/80"
          >
            开源项目 · GitHub
          </a>
          <a
            href="https://discord.gg/NJNbafHNQC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary transition-colors hover:text-primary/80"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  );
}

export { AboutTab };
