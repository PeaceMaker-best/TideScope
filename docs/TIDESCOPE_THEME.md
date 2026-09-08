# 潮汐 TideScope · 海岸主题

## 本次修改

- 产品品牌：潮汐 TideScope。品牌常量位于 src/lib/brand.ts。
- 首页采用无人海岸全景横幅、暖白研究卡片与海蓝交互色；登录页与看板生成等待页共用原创海岸插画。
- 新增海浪与日光 SVG 标识，更新浏览器图标与应用安装图标。
- 保留浅色/深色模式、金融红绿含义，以及原有输入、任务、服务与数据逻辑。
- 主题改造不迁移用户数据。原有图片文件保留，但前端已不再引用人物插画。
- About 中保留 QuantPilot 开源来源，数据库名、存储键、服务名等技术标识不做品牌替换。

## 原创图像

生成方式：内置 image_gen 工具（非 CLI / API 回退）。图像生成技能用于生成并检查海岸画面，没有使用角色、游戏标识或现成游戏截图。

项目资产：src/assets/tidescope-coast-v1.png

最终提示词：

> Use case: stylized-concept. Asset type: wide hero illustration for TideScope, a calm financial research workspace. Primary request: original uninhabited sunny coastal cove, comfortable turquoise sea, warm ivory sand beach, sculpted coastal rocks and a few palms at the edge, a clean distant horizon and puffy clouds. Style: polished American comic and stylized 3D game environment concept art with the bright welcoming, chunky sculpted shapes and painterly material finish of Overwatch environments, but an entirely original place; sophisticated rather than childish. Composition: wide 16:9 establishing landscape, the cove curves through the right two thirds, readable tranquil ocean and sky in the left third; clear depth, uncluttered. Light: gentle sunny late morning, beautiful aqua reflections and warm sand, relaxed airy vacation mood. No people, no characters, no faces, no animals, no weapons, no UI, no text, no watermark, no logos, no franchise-specific buildings. The image should be beautiful and legible when cropped horizontally into a website banner.

新 Logo 是项目原生 SVG，PNG 安装图标由 npm run brand:icons 生成；网页引用项目内的海岸图片，不依赖开发者机器上的外部文件。

## 验证与边界

- TypeScript 检查通过。
- 桌面 1440px / 手机 390px 的浅色、深色首页均 HTTP 200，无页面脚本异常、破损图片或横向溢出。
- 验证输入内容保留、模式按钮与项目抽屉可用。
- Skills、评测、运行治理页面 HTTP 200，页面标题显示新品牌；manifest 和新安装图标可访问。
- 验证入口：node scripts/checks/check-tidescope-visual.cjs；截图与结果位于 tmp/tidescope-visual/。
- 当前本地关闭登录鉴权，因此 /login 会正常跳回首页；登录页改动已通过类型检查，但未在启用鉴权的运行环境下做登录全流程验证。
- 没有提交付费模型任务；本次前端测试不代表金融数据生成或看板验收已端到端通过。
