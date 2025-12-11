# 🎨 Flux AI Pro - v9.1.1 計時器 + 歷史記錄版

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-orange?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)
[![Version](https://img.shields.io/badge/Version-9.1.1-blue?style=for-the-badge)](https://github.com/kinai9661/Flux-AI-Pro)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Cost](https://img.shields.io/badge/Cost-100%25%20FREE-success?style=for-the-badge)](https://pollinations.ai/)

> **基於 Cloudflare Workers 的智能 AI 圖像生成平台**
> 
> **⏱️ 實時計時** | **📜 歷史記錄** | **🍌 4K超高清** | **🎨 17個免費模型** | **🌍 自動翻譯** | **完全開源**

---

## 🆕 v9.1.1 最新版本亮點

### 🎉 核心功能

#### ⏱️ **實時生成計時器**

```javascript
// 生成過程中實時顯示
生成中 ⏱️ 3.2s...
生成中 ⏱️ 8.7s...
✅ 生成成功! ⏱️ 12.4s

• 每 100ms 更新一次
• 精確到 0.1 秒
• 完成後顯示總耗時
• 自動儲存到歷史記錄
```

#### 📜 **完整歷史記錄系統**

| 功能 | 描述 |
|------|------|
| **本地存儲** | localStorage 持久化，最多 100 條 |
| **完整資訊** | 圖片 URL + 提示詞 + 模型 + 尺寸 + 耗時 + 時間戳 |
| **一鍵重生** | 載入歷史配置重新生成 |
| **刪除管理** | 單筆刪除 / 清空所有 |
| **計數徽章** | 實時顯示歷史記錄數量 |
| **點擊預覽** | 新視窗打開大圖 |

#### 🍌 **4K 超高清支持**

**Nano Banana Pro** 專屬功能:
- ✅ **4K 解析度**: 最高 4096x4096px
- ✅ **超高清模式**: 獨特的 ultra_4k 質量配置
- ✅ **Google Gemini 3 Pro**: 頂級 AI 模型
- ✅ **極致細節**: 1.5x 步數倍率 + 1.25x 引導倍率

#### 1️⃣ **三檔質量模式系統**

| 模式 | 特性 | 最低分辨率 | 步數倍率 | 適用場景 |
|------|------|------------|----------|----------|
| **⚡ 經濟模式** | 快速出圖 | 1024px | 0.85× | 快速測試、草稿預覽 |
| **⭐ 標準模式** | 平衡質量 | 1280px | 1.0× | 日常使用、一般項目 |
| **💎 超高清模式** | 極致質量 | 1536px | 1.35× | 最終交付、專業作品 |
| **🍌 4K超高清** | 頂級質量 | 2048px | 1.5× | Nano Banana Pro 專屬 |

#### 2️⃣ **智能提示詞分析器**

自動分析提示詞複雜度（0-100%），智能推薦最佳質量模式：

```javascript
// 分析維度
✓ 關鍵詞複雜度: 'detailed', 'photorealistic', 'intricate' 等
✓ 提示詞長度: >100字 / >200字
✓ 描述深度: 分句數量、細節層次

// 自動推薦
複雜度 > 70% → 超高清模式
複雜度 40-70% → 標準模式
複雜度 < 40% → 經濟模式
```

#### 3️⃣ **自動中譯英功能**

使用 Cloudflare Workers AI 免費翻譯，提高中文提示詞生成質量：

```javascript
// 自動檢測中文並翻譯
"一個穿著漢服的少女" → "A girl wearing traditional Chinese hanfu"

✓ 完全免費（Cloudflare Workers AI）
✓ 無需額外 API Key
✓ 支持中英文混合提示詞
✓ 自動檢測，純英文不翻譯
✓ 高可靠性，錯誤時保持原文
```

#### 4️⃣ **17 種 AI 模型**

- **Flux 系列**: 7 種模型（基礎/寫實/動漫/3D/Pro/暗黑/極速）
- **Flux 高級版**: 3 種實驗性模型（Flux 1.1 Pro, Kontext, Kontext Pro）
- **Nano Banana**: 2 種 Google Gemini 模型（支持 4K）
- **Stable Diffusion**: 5 種 SD 模型（SD3, SD3.5 Large/Turbo, SDXL, SDXL Lightning）

#### 5️⃣ **8 種藝術風格**

動漫、寫實照片、油畫、水彩、素描、賽博朋克、奇幻、向量圖

---

## ✨ 完整功能列表

- ✅ **實時計時器**: 生成過程中顯示實時耗時，完成後顯示總耗時
- ✅ **歷史記錄系統**: localStorage 持久化，一鍵重生，完整管理
- ✅ **4K 超高清**: Nano Banana Pro 專屬，最高 4096x4096px
- ✅ **自動高清 (Auto HD)**: 智能注入 8k/UHD 提示詞 + 尺寸優化
- ✅ **智能參數優化**: 根據模型/尺寸/風格自動調整 Steps/Guidance
- ✅ **自動中譯英**: 使用 Cloudflare Workers AI 免費翻譯
- ✅ **17 種頂級模型**: Flux Pro/Realism, Nano Banana, SD3.5, SDXL Lightning 等
- ✅ **8 種藝術風格**: 動漫、賽博朋克、寫實、油畫、水彩等
- ✅ **私密模式**: 保護用戶隱私
- ✅ **OpenAI 相容 API**: 直接對接 NextChat/LobeChat

---

## 🎨 模型與風格列表

### 17 個免費模型 (Pollinations.ai)

<details>
<summary><strong>查看完整列表 (點擊展開)</strong></summary>

| 分類 | 模型 ID | 描述 | 質量配置 |
|------|---------|------|---------|
| **Flux 標準** | `flux` | 基礎版 | 標準優化 |
| | `flux-realism` | 超寫實 | 💎 極致細節 |
| | `flux-anime` | 動漫 | ⭐ 清晰度優先 |
| | `flux-3d` | 3D 渲染 | ⭐ 細節增強 |
| | `flux-pro` | 專業版 | 💎 最高質量 |
| | `any-dark` | 暗黑 | ⭐ 紋理增強 |
| | `turbo` | 極速版 | ⚡ 速度優先 |
| **Flux 高級** | `flux-1.1-pro` 🧪 | v1.1 Pro | 💎 最高質量 |
| | `flux-kontext` 🧪 | Context | ⭐ 標準 |
| | `flux-kontext-pro` 🧪 | Context Pro | 💎 專業級 |
| **Nano Banana** | `nanobanana` | Gemini 2.5 Flash | ⭐ 快速生成 |
| | `nanobanana-pro` | Gemini 3 Pro | 🍌 4K超高清 |
| **SD3 系列** | `sd3` 🧪 | SD3 標準 | ⭐ 質量增強 |
| | `sd3.5-large` 🧪 | SD3.5 Large | 💎 旗艦畫質 |
| | `sd3.5-turbo` 🧪 | SD3.5 Turbo | ⚡ 快速迭代 |
| **SDXL** | `sdxl` 🧪 | SDXL 1.0 | ⭐ 質量增強 |
| | `sdxl-lightning` 🧪 | Lightning | ⚡ 閃電生成 |

> 🧪 = 實驗性模型 (可能自動回退到穩定模型)

</details>

### 8 種藝術風格

| 風格 | 提示詞加成 | 負面提示詞 |
|------|------------|------------|
| ✨ Anime | vibrant colors, anime art | realistic, photograph |
| 📷 Photorealistic | 8k uhd, professional photography | anime, cartoon |
| 🌃 Cyberpunk | neon lights, futuristic | natural, rustic |
| 🎨 Oil Painting | classical style, brushstrokes | digital art, anime |
| 💧 Watercolor | soft colors, hand-painted | digital, sharp edges |
| ✏️ Sketch | hand-drawn, graphite | colored, digital |
| 🐉 Fantasy | magical, epic fantasy | modern, mundane |
| 📐 Vector | flat design, clean lines | realistic, textured |

---

## 🚀 部署指南

### 前置要求
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (v3.0+)
- Cloudflare 帳號 (免費計劃即可)

### 快速部署

```bash
# 1. 克隆項目
git clone https://github.com/kinai9661/Flux-AI-Pro.git
cd Flux-AI-Pro

# 2. 安裝 Wrangler
npm install -g wrangler
wrangler login

# 3. 部署
wrangler deploy

# 4. 訪問 Worker URL
# 例: https://flux-ai-pro.your-subdomain.workers.dev
```

### 一鍵部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kinai9661/Flux-AI-Pro)

---

## 🔌 API 文檔

### 1. 圖像生成 (Standard)

**Endpoint:** `POST /v1/images/generations`

#### Request Body
```json
{
  "prompt": "a futuristic city with flying cars, highly detailed",
  "model": "flux-realism",
  "quality_mode": "ultra",      // 🆕 "economy" | "standard" | "ultra" | "ultra_4k"
  "width": 1536,
  "height": 1536,
  "style": "photorealistic",
  "n": 1,
  "auto_hd": true,              // 自動高清
  "auto_optimize": true,        // 智能優化
  "negative_prompt": "blurry, low quality",
  "seed": 123456,
  "private": true
}
```

#### Response
```json
{
  "created": 1733923200,
  "data": [
    {
      "url": "https://image.pollinations.ai/prompt/...",
      "provider": "Pollinations.ai",
      "model": "flux-realism",
      "width": 1536,
      "height": 1536,
      "is_4k": false,
      "seed": 123456,
      "quality_mode": "ultra",             // 🆕 使用的質量模式
      "prompt_complexity": 0.78,           // 🆕 提示詞複雜度 (0-1)
      "hd_optimized": true,                // 是否 HD 優化
      "auto_translated": true,             // 🆕 是否自動翻譯
      "hd_details": {                      // 🆕 HD 優化詳情
        "hd_level": "maximum",
        "size_upscaled": true,
        "optimizations": [
          "HD增強: maximum",
          "尺寸優化: 1024x1024 → 1536x1536"
        ]
      },
      "auto_optimized": true,              // 是否智能優化
      "steps": 48,                         // 🆕 最終步數 (含質量模式加成)
      "guidance": 9.6,                     // 🆕 最終引導 (含質量模式加成)
      "cost": "FREE"
    }
  ]
}
```

### 2. 聊天生成 (OpenAI Compatible)

**Endpoint:** `POST /v1/chat/completions`

```json
{
  "model": "flux-pro",
  "messages": [
    { "role": "user", "content": "畫一隻在太空的貓，極致細節" }
  ],
  "quality_mode": "ultra",  // 🆕
  "width": 1536,
  "height": 1536,
  "auto_hd": true,
  "auto_optimize": true
}
```

### 3. 查詢接口

| Endpoint | 方法 | 描述 |
|----------|------|------|
| `/v1/models` | GET | 列出所有可用模型 + 質量配置 |
| `/v1/providers` | GET | 查詢提供商資訊 |
| `/v1/styles` | GET | 列出所有風格預設 |
| `/health` | GET | 健康檢查 + 版本資訊 |

---

## ⚙️ 配置文件

### wrangler.toml
```toml
name = "flux-ai-pro"
main = "worker.js"
compatibility_date = "2025-12-12"

[vars]
PROJECT_VERSION = "9.1.1"
ENABLE_QUALITY_MODES = "true"
ENABLE_AUTO_TRANSLATE = "true"
ENABLE_HISTORY = "true"
```

---

## 📅 更新日誌

### v9.1.1 (2025-12-12) - 🧹 簡化版
- **移除**: 繁體中文文字優化功能
- **移除**: ChineseTextOptimizer 類別
- **移除**: enableChineseBoost 參數
- **移除**: UI 繁中優化選項
- **簡化**: 模型配置 (17個模型)
- **簡化**: 風格配置 (8種風格)
- **保留**: 計時器、歷史、4K 等核心功能
- **減少**: 代碼量 -15%

### v9.1.0 (2025-12-12) - ⏱️ 計時器 + 歷史
- **新增**: 實時生成計時器 (精確到 0.1 秒)
- **新增**: 完整歷史記錄系統 (localStorage 存儲)
- **新增**: 歷史面板 (顯示所有生成記錄)
- **新增**: 一鍵重新生成歷史圖片
- **新增**: 清空歷史記錄
- **新增**: 歷史計數徽章

### v9.0.1 (2025-12-11) - 🔧 語法修復
- **修復**: JavaScript 模板字符串嵌套語法錯誤
- **優化**: 所有嵌套模板字符串改為字符串拼接
- **增強**: Cloudflare Workers 編譯器相容性

### v8.8.1 (2025-12-11) - ✨ 優化版
- **優化**: 移除主界面中文提示詞相關提示文字
- **保留**: 後台自動翻譯功能仍然工作
- **增強**: 界面更加簡潔專業
- **修復**: 代碼完整性驗證和錯誤修復

### v8.8.0 (2025-12-10) - 🍌 Nano Banana
- **新增**: Nano Banana 模型支持 (Google Gemini 2.5 Flash / 3 Pro)
- **新增**: Nano Banana 專用界面 (/nanobanana)
- **支持**: 4K 畫質、繁中文字生成、14 圖融合

---

## 🌐 演示與部署

- **最新演示站**: [https://koy.xx.kg/](https://koy.xx.kg/)
- **GitHub 倉庫**: [kinai9661/Flux-AI-Pro](https://github.com/kinai9661/Flux-AI-Pro)
- **部署平台**: Cloudflare Workers (免費計劃支持)

---

## 💡 使用建議

### 質量模式選擇指南

| 場景 | 推薦模式 | 理由 |
|------|----------|------|
| 快速測試概念 | ⚡ 經濟 | 速度優先，節省資源 |
| 日常社交媒體 | ⭐ 標準 | 平衡質量與速度 |
| 專業作品集 | 💎 超高清 | 極致細節，適合印刷 |
| 客戶交付 | 💎 超高清 | 最高標準，零妃協 |
| 4K 頂級畫質 | 🍌 4K超高清 | Nano Banana Pro 專屬 |

### 模型 + 模式組合推薦

```
頂級質量:
flux-realism + 超高清 + photorealistic 風格
→ 適合: 商業攝影、產品展示、人像特寫

動漫高清:
flux-anime + 標準/超高清 + anime 風格
→ 適合: 遊戲角色、漫畫封面、插畫

快速迭代:
turbo + 經濟 + 任意風格
→ 適合: 概念草圖、頭腦風暴、A/B 測試

4K 頂級:
nanobanana-pro + 4K超高清
→ 適合: 極致畫質、4K 顯示器、專業交付
```

---

## ⚠️ 重要提醒

### Pollinations.ai 服務說明
1. **完全免費**，但服務穩定性由第三方控制
2. 請遵守其 [使用條款](https://pollinations.ai/terms)
3. 部分實驗性模型可能不可用 (自動回退)

### 質量模式與效能
1. **超高清模式**會增加生成時間 (約 +35%)
2. **4K超高清**會增加生成時間 (約 +50%)
3. **自動優化**會根據複雜度推薦最佳模式
4. 建議首次測試使用**標準模式**找到平衡點

### 自動翻譯功能
1. **自動檢測**中文提示詞並翻譯成英文
2. **提高質量**：Flux/SD 模型對英文理解更好
3. **完全免費**：使用 Cloudflare Workers AI
4. **高可靠**：翻譯失敗時自動使用原文

---

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request!

### 開發指南
```bash
# 本地開發
wrangler dev

# 部署測試
wrangler deploy --env dev

# 生產部署
wrangler deploy
```

---

## 📄 許可證

MIT License - 查看 [LICENSE](LICENSE) 文件

---

## 🙏 致謝

- [Pollinations.ai](https://pollinations.ai/) - 免費 AI 圖像生成服務
- [Cloudflare Workers](https://workers.cloudflare.com/) - 全球邊緣計算平台
- [Black Forest Labs](https://blackforestlabs.ai/) - FLUX 系列模型
- [Stability AI](https://stability.ai/) - Stable Diffusion 系列
- [Google](https://deepmind.google/) - Gemini AI (用於 Nano Banana)

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/kinai9661">kinai9661</a></sub>
  <br><br>
  <a href="https://workers.cloudflare.com">
    <img src="https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare&style=flat-square" alt="Cloudflare Workers">
  </a>
  <a href="https://pollinations.ai">
    <img src="https://img.shields.io/badge/Pollinations-AI-green?style=flat-square" alt="Pollinations AI">
  </a>
  <a href="https://github.com/kinai9661/Flux-AI-Pro/stargazers">
    <img src="https://img.shields.io/github/stars/kinai9661/Flux-AI-Pro?style=flat-square" alt="GitHub stars">
  </a>
</div>