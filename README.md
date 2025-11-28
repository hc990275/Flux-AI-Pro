# 🎨 Multi-Provider AI Image Generator (v8.5.0)

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-orange?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com/)
[![Version](https://img.shields.io/badge/Version-8.5.0-blue?style=for-the-badge)](https://github.com/yourusername/repo)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Cost](https://img.shields.io/badge/Cost-100%25%20FREE-success?style=for-the-badge)]()

> **基於 Cloudflare Workers 的下一代無伺服器 AI 圖像生成後端。**
> 集成 Flux & SD3 系列模型，內置智能參數優化、自動高清增強 (Auto HD) 及 OpenAI 兼容接口。

---

## ✨ 項目亮點

本項目是一個開箱即用的 Serverless 解決方案，利用 Pollinations.ai 的免費接口，提供企業級的圖像生成能力。

### 🔥 核心優勢
- **極致性能 (Serverless)**: 部署於 Cloudflare Edge，全球毫秒級響應，無冷啟動。
- **自動高清 (Auto HD)**: v8.5.0 新增功能，自動注入 8k/UHD 提示詞並智能提升小尺寸圖片分辨率。
- **智能參數優化**: 根據模型類型（Turbo/Pro）和畫布尺寸，自動計算最佳步數 (Steps) 和引導係數 (Guidance)。
- **OpenAI 兼容**: 提供 `/v1/chat/completions` 接口，可直接接入 NextChat、LobeChat 等現有 AI 客戶端。
- **隱私與安全**: 支持私密模式 (Private Mode)，生成內容不被公開索引。

### 🛠️ 功能特性
- ✅ **17 種頂級模型**: 涵蓋 Flux Pro/Realism, SD3.5 Large/Turbo, SDXL Lightning 等。
- ✅ **12 種藝術風格**: 內置日本漫畫、賽博朋克、寫實攝影等風格預設。
- ✅ **NSFW 支持**: 內置成人內容開關及年齡確認機制。
- ✅ **動態 UI 界面**: 包含實時進度條、狀態反饋及歷史記錄管理（Local Storage）。
- ✅ **歷史記錄**: 自動保存最近 100 條生成記錄，支持一鍵重繪和參數回溯。

---

## 🚀 部署指南

### 前置要求
- [Node.js](https://nodejs.org/) (v16+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare 賬號

### 快速部署

1. **克隆項目**
git clone https://github.com/yourusername/multi-provider-image-generator.git
cd multi-provider-image-generator

text

2. **安裝依賴**
npm install

text

3. **本地開發 (可選)**
wrangler dev

訪問 http://localhost:8787
text

4. **發布到 Cloudflare Workers**
wrangler deploy

text
部署完成後，您將獲得一個訪問地址：`https://<your-worker>.<your-subdomain>.workers.dev`

---

## 🎨 模型與風格列表

<details>
<summary><strong>查看支持的 17 個模型 (點擊展開)</strong></summary>

| 分類 | 模型 ID | 描述 | 特性 |
|------|---------|------|------|
| **Flux 標準** | `flux` | 基礎版 | 均衡 |
| | `flux-realism` | 超寫實 | 照片級細節 |
| | `flux-anime` | 動漫 | 日系二次元 |
| | `flux-3d` | 3D 渲染 | Blender/C4D 風格 |
| | `flux-pro` | 專業版 | 最高質量 |
| | `any-dark` | 暗黑 | 風格化強 |
| | `turbo` | 極速版 | 4-8步出圖 |
| **Flux 高級** | `flux-1.1-pro` | v1.1 Pro | 🧪 實驗性 (6x 速度) |
| | `flux-kontext` | Context | 智能語境理解 |
| | `flux-kontext-pro` | Context Pro | 專業語境控制 |
| **SD3 系列** | `sd3` | SD3 標準 | 穩定性高 |
| | `sd3.5-large` | SD3.5 Large | 🔥 旗艦畫質 |
| | `sd3.5-turbo` | SD3.5 Turbo | 快速迭代 |
| **SDXL** | `sdxl` | SDXL 1.0 | 經典模型 |
| | `sdxl-lightning` | Lightning | 閃電生成 |

</details>

<details>
<summary><strong>查看支持的 12 種風格 (點擊展開)</strong></summary>

- 🎌 **Japanese Manga** (日本漫畫)
- ✨ **Anime** (動漫風格)
- 📷 **Photorealistic** (寫實攝影)
- 🌃 **Cyberpunk** (賽博朋克)
- 🎨 **Oil Painting** (油畫)
- 💧 **Watercolor** (水彩)
- 📐 **Vector** (矢量圖)
- 👾 **Pixel Art** (像素藝術)
- 🌿 **Studio Ghibli** (吉卜力)
- 💥 **Comic Book** (美式漫畫)
- ✏️ **Sketch** (素描)
- 🐉 **Fantasy** (奇幻)

</details>

---

## 🔌 API 文檔

本項目提供標準的 REST API 和 OpenAI 兼容接口。

### 1. 圖像生成 (Standard)

**Endpoint:** `POST /v1/images/generations`

**Request Body:**
{
"prompt": "a futuristic city with flying cars, cyberpunk style",
"model": "flux-realism",
"width": 1024,
"height": 1024,
"n": 1,
"auto_hd": true, // v8.5.0 新增：自動高清優化
"auto_optimize": true, // v8.5.0 新增：智能參數優化
"private": true
}

text

**Response:**
{
"created": 1732838400,
"data": [
{
"url": "https://image.pollinations.ai/...",
"width": 1024,
"height": 1024,
"seed": 123456,
"hd_optimized": true,
"cost": "FREE"
}
]
}

text

### 2. 聊天生成 (OpenAI Compatible)

此接口允許您將圖像生成器集成到任何支持 OpenAI 協議的聊天機器人中。

**Endpoint:** `POST /v1/chat/completions`

**Request Body:**
{
"model": "flux-pro",
"messages": [
{ "role": "user", "content": "畫一隻在太空的貓" }
],
"width": 1024, // 可選：自定義寬度
"height": 1024, // 可選：自定義高度
"auto_hd": true // 可選：開啟高清
}

text

**Response:**
返回包含 Markdown 圖片鏈接的流式或非流式響應：`![Generated Image](url)`

---

## ⚙️ 配置與自定義

您可以在 `worker.js` 頂部的 `CONFIG` 對象中修改核心設置：

const CONFIG = {
// 默認模型提供商
DEFAULT_PROVIDER: "pollinations",

// 高清優化策略 (v8.5.0)
HD_OPTIMIZATION: {
enabled: true,
// 定義不同模型的優化強度
MODEL_HD_STRATEGY: { ... }
},

// 智能步數規則
OPTIMIZATION_RULES: {
// Turbo 模型使用較少步數，Pro 模型使用較多步數
MODEL_STEPS: { ... }
}
};

text

---

## 📅 更新日誌

### v8.5.0 (2025-11-29) - 💎 當前版本
- **新增**: `Auto HD` (自動高清) 功能，智能注入細節提示詞並優化分辨率。
- **新增**: `HDOptimizer` 類，針對不同模型（如 Flux vs SD3）應用不同的增強策略。
- **優化**: Web UI 增加高清開關及狀態顯示。

### v8.4.0 - 🎬 動態 UI
- **新增**: 生成過程中的實時進度條模擬。
- **新增**: 狀態消息反饋（"正在初始化...", "正在繪製..."）。
- **新增**: 用戶可中途取消生成請求。

### v8.3.0 - 🧠 智能優化
- **新增**: 根據畫布尺寸（Pixel count）和風格自動計算最佳 `steps` 和 `guidance_scale`。

### v8.0.0 - 🦄 架構重構
- **重構**: 引入多提供商（Multi-Provider）架構。
- **新增**: 完整的歷史記錄管理系統（Local Storage）。

---

## ⚠️ 免責聲明

1. 本項目調用第三方接口 (Pollinations.ai)，請遵守其 [使用條款](https://pollinations.ai/terms)。
2. 請勿用於生成非法、仇恨或違反當地法律的內容。
3. 用戶需自行承擔生成內容帶來的責任。

---

<div align="center">
  <sub>Made with ❤️ by AI kinai9661</sub>
</div>
