// ============================================
// 🎨 Web UI HTML 界面 - 方案 3 混合式
// ============================================

/**
 * 生成 Web UI HTML（方案 3：標籤頁 + 比例/風格選擇）
 */
function getWebUI() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pollinations AI 圖片生成器 v9.5.3</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      min-height: 100vh;
      box-shadow: 0 0 60px rgba(0,0,0,0.3);
    }
    
    /* ========== Header ========== */
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    .header-left h1 {
      font-size: 1.8em;
      margin-bottom: 5px;
    }
    
    .header-left .version {
      opacity: 0.9;
      font-size: 0.85em;
    }
    
    .api-status {
      padding: 8px 16px;
      background: rgba(255,255,255,0.2);
      border-radius: 20px;
      font-size: 0.85em;
    }
    
    /* ========== Tab Navigation ========== */
    .tab-navigation {
      display: flex;
      background: #f8f9fa;
      border-bottom: 2px solid #e0e0e0;
      padding: 0 30px;
    }
    
    .tab-button {
      padding: 15px 30px;
      background: none;
      border: none;
      font-size: 1em;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      position: relative;
    }
    
    .tab-button:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }
    
    .tab-button.active {
      color: #667eea;
      border-bottom-color: #667eea;
      background: white;
    }
    
    .tab-button .badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #667eea;
      color: white;
      font-size: 0.7em;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }
    
    /* ========== Tab Content ========== */
    .tab-content {
      display: none;
      padding: 30px;
      animation: fadeIn 0.3s;
    }
    
    .tab-content.active {
      display: block;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* ========== Generate Tab ========== */
    .generate-tab {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    
    .form-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
    }
    
    .preview-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
      font-size: 0.95em;
    }
    
    .form-group input[type="text"],
    .form-group textarea,
    .form-group select,
    .form-group input[type="number"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1em;
      transition: border-color 0.3s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 100px;
      font-family: inherit;
    }
    
    /* ========== Ratio Selector ========== */
    .ratio-selector {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .ratio-btn {
      padding: 12px 8px;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    
    .ratio-btn:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }
    
    .ratio-btn.active {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      font-weight: 600;
    }
    
    .ratio-icon {
      width: 30px;
      height: 30px;
      background: #667eea;
      border-radius: 4px;
      position: relative;
    }
    
    .ratio-icon.square {
      width: 30px;
      height: 30px;
    }
    
    .ratio-icon.landscape-wide {
      width: 40px;
      height: 22px;
    }
    
    .ratio-icon.portrait-tall {
      width: 22px;
      height: 40px;
    }
    
    .ratio-icon.landscape {
      width: 36px;
      height: 27px;
    }
    
    .ratio-icon.portrait {
      width: 27px;
      height: 36px;
    }
    
    .ratio-icon.ultrawide {
      width: 42px;
      height: 18px;
    }
    
    .ratio-btn span {
      font-size: 0.85em;
      color: #666;
    }
    
    .ratio-btn.active span {
      color: #667eea;
    }
    
    .size-preview {
      text-align: center;
      padding: 10px;
      background: white;
      border-radius: 6px;
      font-size: 0.9em;
      color: #666;
    }
    
    .size-preview strong {
      color: #667eea;
    }
    
    /* ========== Style Selector ========== */
    .style-selector {
      margin-bottom: 15px;
    }
    
    .style-quick {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .style-btn {
      padding: 12px;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    
    .style-btn:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }
    
    .style-btn.active {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      font-weight: 600;
      color: #667eea;
    }
    
    .style-more {
      width: 100%;
      padding: 10px;
      background: white;
      border: 2px dashed #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9em;
      color: #666;
    }
    
    .style-more:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .style-expanded {
      display: none;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
      padding: 15px;
      background: white;
      border-radius: 8px;
    }
    
    .style-expanded.show {
      display: grid;
    }
    
    .style-card {
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
    }
    
    .style-card:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }
    
    .style-card.active {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }
    
    .style-card-icon {
      font-size: 2em;
      margin-bottom: 8px;
    }
    
    .style-card-name {
      font-weight: 600;
      margin-bottom: 4px;
      color: #333;
    }
    
    .style-card-desc {
      font-size: 0.8em;
      color: #999;
    }
    
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1em;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-secondary {
      background: #6c757d;
      margin-top: 10px;
    }
    
    .info {
      background: #e3f2fd;
      color: #1976d2;
      padding: 10px;
      border-radius: 6px;
      font-size: 0.9em;
      margin-top: 8px;
    }
    
    /* ========== Preview Area ========== */
    .preview-container {
      background: #fff;
      border-radius: 8px;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border: 2px dashed #e0e0e0;
    }
    
    .preview-container.has-image {
      border: none;
    }
    
    .preview-container img {
      max-width: 100%;
      max-height: 600px;
      display: block;
      border-radius: 8px;
    }
    
    .preview-placeholder {
      text-align: center;
      color: #999;
      padding: 40px;
    }
    
    .preview-placeholder .icon {
      font-size: 4em;
      margin-bottom: 15px;
      opacity: 0.3;
    }
    
    .loading {
      text-align: center;
      padding: 40px;
    }
    
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .image-meta {
      background: white;
      padding: 15px;
      border-radius: 8px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      font-size: 0.9em;
    }
    
    .image-meta .meta-item {
      display: flex;
      flex-direction: column;
    }
    
    .image-meta .meta-label {
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }
    
    .image-meta .meta-value {
      color: #333;
    }
    
    .preview-actions {
      display: flex;
      gap: 10px;
    }
    
    .preview-actions button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .btn-download {
      background: #28a745;
      color: white;
    }
    
    .btn-download:hover {
      background: #218838;
    }
    
    .btn-save {
      background: #667eea;
      color: white;
    }
    
    .btn-save:hover {
      background: #5568d3;
    }
    
    /* ========== History Tab ========== */
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .history-stats {
      display: flex;
      gap: 20px;
      font-size: 0.9em;
      color: #666;
    }
    
    .history-actions {
      display: flex;
      gap: 10px;
    }
    
    .history-actions button,
    .history-actions select {
      padding: 8px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 0.9em;
      transition: all 0.3s;
    }
    
    .history-actions button:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .search-box {
      margin-bottom: 20px;
    }
    
    .search-box input {
      width: 100%;
      padding: 12px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1em;
    }
    
    .search-box input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .gallery-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    
    .gallery-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .gallery-item-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      background: #f5f5f5;
    }
    
    .gallery-item-info {
      padding: 15px;
    }
    
    .gallery-item-prompt {
      font-size: 0.9em;
      color: #333;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
    
    .gallery-item-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.8em;
      color: #999;
      margin-bottom: 10px;
    }
    
    .gallery-item-style {
      display: inline-block;
      padding: 2px 8px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border-radius: 4px;
      font-size: 0.75em;
      margin-bottom: 10px;
    }
    
    .gallery-item-actions {
      display: flex;
      gap: 5px;
    }
    
    .gallery-item-actions button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      font-size: 0.85em;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 600;
    }
    
    .btn-reuse {
      background: #667eea;
      color: white;
    }
    
    .btn-reuse:hover {
      background: #5568d3;
    }
    
    .btn-item-delete {
      background: #dc3545;
      color: white;
    }
    
    .btn-item-delete:hover {
      background: #c82333;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }
    
    .empty-state .icon {
      font-size: 5em;
      margin-bottom: 20px;
      opacity: 0.3;
    }
    
    /* ========== Messages ========== */
    .message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s;
      max-width: 400px;
    }
    
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .message.success {
      background: #d4edda;
      color: #155724;
      border-left: 4px solid #28a745;
    }
    
    .message.error {
      background: #f8d7da;
      color: #721c24;
      border-left: 4px solid #dc3545;
    }
    
    .message.info {
      background: #d1ecf1;
      color: #0c5460;
      border-left: 4px solid #17a2b8;
    }
    
    /* ========== Floating Button ========== */
    .floating-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.5em;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: transform 0.3s;
      z-index: 999;
      display: none;
    }
    
    .floating-button.show {
      display: block;
    }
    
    .floating-button:hover {
      transform: scale(1.1);
    }
    
    /* ========== Modal ========== */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s;
    }
    
    .modal.active {
      display: flex;
    }
    
    .modal-content {
      max-width: 95%;
      max-height: 95%;
      position: relative;
    }
    
    .modal-close {
      position: absolute;
      top: -50px;
      right: 0;
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5em;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .modal-close:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .modal-image {
      max-width: 100%;
      max-height: 90vh;
      display: block;
      border-radius: 8px;
    }
    
    /* ========== Responsive ========== */
    @media (max-width: 1024px) {
      .generate-tab {
        grid-template-columns: 1fr;
      }
      
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      
      .style-expanded {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .tab-navigation {
        padding: 0 15px;
        overflow-x: auto;
      }
      
      .tab-button {
        padding: 12px 20px;
        white-space: nowrap;
      }
      
      .tab-content {
        padding: 20px 15px;
      }
      
      .ratio-selector {
        grid-template-columns: repeat(4, 1fr);
      }
      
      .ratio-btn {
        padding: 10px 6px;
      }
      
      .ratio-icon {
        transform: scale(0.8);
      }
      
      .style-quick {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .style-expanded {
        grid-template-columns: 1fr;
      }
      
      .row {
        grid-template-columns: 1fr;
      }
      
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
      }
      
      .gallery-item-image {
        height: 180px;
      }
      
      .history-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .history-actions {
        width: 100%;
        flex-direction: column;
      }
      
      .history-actions button,
      .history-actions select {
        width: 100%;
      }
      
      .floating-button {
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        font-size: 1.2em;
      }
    }
  </style>
</head>
<body>
`;
}
// 接續第 1 部分...

function getWebUI() {
  return `<!DOCTYPE html>
<!-- 前面的 CSS 省略，與第 1 部分相同 -->

<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>🎨 Pollinations AI 圖片生成器</h1>
        <div class="version">v9.5.3-gen-api | Powered by gen.pollinations.ai</div>
      </div>
      <div class="api-status" id="apiStatus">檢查中...</div>
    </div>
    
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button class="tab-button active" data-tab="generate">
        🚀 生成圖片
      </button>
      <button class="tab-button" data-tab="history">
        📚 歷史記錄
        <span class="badge" id="historyCount">0</span>
      </button>
    </div>
    
    <!-- Generate Tab -->
    <div class="tab-content active" id="generateTab">
      <div class="generate-tab">
        <!-- Form Section -->
        <div class="form-section">
          <form id="generateForm">
            <div class="form-group">
              <label for="prompt">📝 圖片描述 *</label>
              <textarea 
                id="prompt" 
                name="prompt" 
                placeholder="例如：a beautiful sunset over mountains"
                required
              ></textarea>
              <div class="info">💡 使用英文描述效果更佳</div>
            </div>
            
            <div class="form-group">
              <label for="model">🤖 生成模型</label>
              <select id="model" name="model">
                <option value="flux">FLUX - 最新穩定模型（推薦）</option>
                <option value="zimage">ZImage - 高質量細節</option>
                <option value="turbo">Turbo - 快速生成</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>📐 圖片比例</label>
              <div class="ratio-selector">
                <button type="button" class="ratio-btn active" data-ratio="1:1" data-width="1024" data-height="1024">
                  <div class="ratio-icon square"></div>
                  <span>1:1</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="16:9" data-width="1344" data-height="768">
                  <div class="ratio-icon landscape-wide"></div>
                  <span>16:9</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="9:16" data-width="768" data-height="1344">
                  <div class="ratio-icon portrait-tall"></div>
                  <span>9:16</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="4:3" data-width="1152" data-height="896">
                  <div class="ratio-icon landscape"></div>
                  <span>4:3</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="3:4" data-width="896" data-height="1152">
                  <div class="ratio-icon portrait"></div>
                  <span>3:4</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="21:9" data-width="1536" data-height="640">
                  <div class="ratio-icon ultrawide"></div>
                  <span>21:9</span>
                </button>
                <button type="button" class="ratio-btn" data-ratio="custom" data-width="1024" data-height="1024">
                  <div class="ratio-icon square"></div>
                  <span>自定義</span>
                </button>
              </div>
              <div class="size-preview" id="sizePreview">
                → <strong id="currentSize">1024 x 1024</strong>
              </div>
            </div>
            
            <div class="form-group" id="customSizeGroup" style="display: none;">
              <div class="row">
                <div>
                  <label for="width">寬度（像素）</label>
                  <input type="number" id="width" name="width" value="1024" min="256" max="2048" step="64">
                </div>
                <div>
                  <label for="height">高度（像素）</label>
                  <input type="number" id="height" name="height" value="1024" min="256" max="2048" step="64">
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>🎨 圖片風格（可選）</label>
              <div class="style-selector">
                <div class="style-quick">
                  <button type="button" class="style-btn active" data-style="none">
                    ∅ 無
                  </button>
                  <button type="button" class="style-btn" data-style="photorealistic">
                    📷 寫實
                  </button>
                  <button type="button" class="style-btn" data-style="digital_art">
                    🎨 數位
                  </button>
                  <button type="button" class="style-btn" data-style="anime">
                    🎭 動漫
                  </button>
                </div>
                <button type="button" class="style-more" id="styleMoreBtn">
                  📋 更多風格...
                </button>
                
                <div class="style-expanded" id="styleExpanded">
                  <div class="style-card" data-style="none">
                    <div class="style-card-icon">∅</div>
                    <div class="style-card-name">無風格</div>
                    <div class="style-card-desc">原始提示詞</div>
                  </div>
                  <div class="style-card" data-style="photorealistic">
                    <div class="style-card-icon">📷</div>
                    <div class="style-card-name">寫實攝影</div>
                    <div class="style-card-desc">專業攝影風格</div>
                  </div>
                  <div class="style-card" data-style="digital_art">
                    <div class="style-card-icon">🎨</div>
                    <div class="style-card-name">數位藝術</div>
                    <div class="style-card-desc">鮮豔概念藝術</div>
                  </div>
                  <div class="style-card" data-style="oil_painting">
                    <div class="style-card-icon">🖌️</div>
                    <div class="style-card-name">油畫</div>
                    <div class="style-card-desc">古典繪畫風格</div>
                  </div>
                  <div class="style-card" data-style="anime">
                    <div class="style-card-icon">🎭</div>
                    <div class="style-card-name">動漫</div>
                    <div class="style-card-desc">日式動畫風格</div>
                  </div>
                  <div class="style-card" data-style="watercolor">
                    <div class="style-card-icon">💧</div>
                    <div class="style-card-name">水彩</div>
                    <div class="style-card-desc">柔和水彩畫</div>
                  </div>
                  <div class="style-card" data-style="render_3d">
                    <div class="style-card-icon">🔮</div>
                    <div class="style-card-name">3D渲染</div>
                    <div class="style-card-desc">高質量3D效果</div>
                  </div>
                  <div class="style-card" data-style="cyberpunk">
                    <div class="style-card-icon">🌃</div>
                    <div class="style-card-name">賽博朋克</div>
                    <div class="style-card-desc">霓虹未來感</div>
                  </div>
                  <div class="style-card" data-style="vintage">
                    <div class="style-card-icon">📻</div>
                    <div class="style-card-name">復古</div>
                    <div class="style-card-desc">懷舊復古風</div>
                  </div>
                  <div class="style-card" data-style="minimalist">
                    <div class="style-card-icon">◻️</div>
                    <div class="style-card-name">極簡</div>
                    <div class="style-card-desc">簡潔現代風</div>
                  </div>
                  <div class="style-card" data-style="fantasy">
                    <div class="style-card-icon">✨</div>
                    <div class="style-card-name">奇幻</div>
                    <div class="style-card-desc">魔法史詩風</div>
                  </div>
                  <div class="style-card" data-style="sketch">
                    <div class="style-card-icon">✏️</div>
                    <div class="style-card-name">素描</div>
                    <div class="style-card-desc">鉛筆手繪風</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="seed">🎲 隨機種子（可選）</label>
              <input type="number" id="seed" name="seed" placeholder="留空自動生成">
            </div>
            
            <button type="submit" class="btn" id="generateBtn">
              🚀 開始生成
            </button>
            
            <button type="button" class="btn btn-secondary" id="randomBtn">
              🎲 隨機種子
            </button>
          </form>
        </div>
        
        <!-- Preview Section -->
        <div class="preview-section">
          <div class="preview-container" id="previewContainer">
            <div class="preview-placeholder">
              <div class="icon">🖼️</div>
              <p>生成的圖片將在這裡顯示</p>
            </div>
          </div>
          
          <div id="imageMeta" style="display: none;"></div>
          
          <div class="preview-actions" id="previewActions" style="display: none;">
            <button class="btn-download" id="downloadBtn">
              📥 下載圖片
            </button>
            <button class="btn-save" id="saveBtn">
              💾 保存到歷史
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- History Tab -->
    <div class="tab-content" id="historyTab">
      <div class="history-header">
        <div class="history-stats">
          <span>📊 總計：<strong id="totalCount">0</strong> 張</span>
          <span>💾 已用：<strong id="storageUsed">0</strong> MB</span>
        </div>
        <div class="history-actions">
          <select id="sortSelect">
            <option value="newest">最新優先</option>
            <option value="oldest">最舊優先</option>
          </select>
          <button id="clearAllBtn">🗑️ 清空全部</button>
        </div>
      </div>
      
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="🔍 搜索提示詞...">
      </div>
      
      <div class="gallery" id="gallery"></div>
      
      <div class="empty-state" id="emptyState">
        <div class="icon">📭</div>
        <h3>還沒有歷史記錄</h3>
        <p>生成圖片後會自動保存在這裡</p>
      </div>
    </div>
  </div>
  
  <!-- Floating Button -->
  <button class="floating-button" id="floatingBtn" title="返回生成">
    ⬆️
  </button>
  
  <!-- Modal -->
  <div class="modal" id="imageModal">
    <div class="modal-content">
      <button class="modal-close" id="modalClose">✕</button>
      <img class="modal-image" id="modalImage" src="" alt="Preview">
    </div>
  </div>
  
  <!-- Message Container -->
  <div id="messageContainer"></div>

  <script>
`;
}
// 接續第 2 部分...

function getWebUI() {
  return `<!DOCTYPE html>
<!-- 前面的 HTML 省略 -->

  <script>
    // ==========================================
    // 風格預設詞
    // ==========================================
    const STYLE_PRESETS = {
      none: "",
      photorealistic: "photorealistic, professional photography, high detail, 8k uhd, dslr, soft lighting",
      digital_art: "digital art, vibrant colors, concept art, trending on artstation, highly detailed",
      oil_painting: "oil painting, artistic, painterly, fine art, classical style, textured brushstrokes",
      anime: "anime style, manga art, cel shaded, vibrant, japanese animation, detailed",
      watercolor: "watercolor painting, soft colors, artistic, flowing, delicate, traditional medium",
      render_3d: "3d render, octane render, unreal engine, high quality, detailed, cinematic lighting",
      cyberpunk: "cyberpunk style, neon lights, futuristic, sci-fi, dark atmosphere, vibrant colors",
      vintage: "vintage style, retro aesthetic, nostalgic, film grain, faded colors, classic",
      minimalist: "minimalist, clean, simple, modern design, elegant, uncluttered",
      fantasy: "fantasy art, magical, ethereal, epic, dramatic lighting, mystical atmosphere",
      sketch: "pencil sketch, hand drawn, artistic, detailed linework, monochrome"
    };
    
    // 風格中文名稱映射
    const STYLE_NAMES = {
      none: "無風格",
      photorealistic: "寫實攝影",
      digital_art: "數位藝術",
      oil_painting: "油畫",
      anime: "動漫",
      watercolor: "水彩",
      render_3d: "3D渲染",
      cyberpunk: "賽博朋克",
      vintage: "復古",
      minimalist: "極簡",
      fantasy: "奇幻",
      sketch: "素描"
    };
    
    // ==========================================
    // IndexedDB 設置
    // ==========================================
    let db;
    const DB_NAME = 'PollinationsHistory';
    const DB_VERSION = 1;
    const STORE_NAME = 'images';
    
    // 初始化 IndexedDB
    function initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          db = request.result;
          resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('timestamp', 'timestamp', { unique: false });
            objectStore.createIndex('prompt', 'prompt', { unique: false });
          }
        };
      });
    }
    
    // 保存圖片到 IndexedDB
    async function saveToHistory(imageData) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(STORE_NAME);
        
        const record = {
          ...imageData,
          timestamp: Date.now()
        };
        
        const request = objectStore.add(record);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    
    // 獲取所有歷史記錄
    async function getAllHistory() {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    
    // 刪除記錄
    async function deleteHistory(id) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
    
    // 清空所有記錄
    async function clearAllHistory() {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
    
    // ==========================================
    // UI 函數
    // ==========================================
    
    // 顯示消息
    function showMessage(text, type = 'info') {
      const container = document.getElementById('messageContainer');
      const message = document.createElement('div');
      message.className = \`message \${type}\`;
      message.textContent = text;
      container.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 5000);
    }
    
    // 切換標籤
    function switchTab(tabName) {
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
      document.getElementById(\`\${tabName}Tab\`).classList.add('active');
      
      // 更新浮動按鈕
      if (tabName === 'history') {
        document.getElementById('floatingBtn').classList.add('show');
      } else {
        document.getElementById('floatingBtn').classList.remove('show');
      }
      
      // 如果切換到歷史，刷新顯示
      if (tabName === 'history') {
        loadHistory();
      }
    }
    
    // 更新歷史計數
    async function updateHistoryCount() {
      const history = await getAllHistory();
      document.getElementById('historyCount').textContent = history.length;
      document.getElementById('totalCount').textContent = history.length;
      
      // 計算存儲大小
      let totalSize = 0;
      history.forEach(item => {
        if (item.imageData) {
          totalSize += item.imageData.length;
        }
      });
      const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
      document.getElementById('storageUsed').textContent = sizeMB;
    }
    
    // 加載歷史記錄
    async function loadHistory() {
      const history = await getAllHistory();
      const gallery = document.getElementById('gallery');
      const emptyState = document.getElementById('emptyState');
      
      // 排序
      const sortBy = document.getElementById('sortSelect').value;
      history.sort((a, b) => {
        if (sortBy === 'newest') {
          return b.timestamp - a.timestamp;
        } else {
          return a.timestamp - b.timestamp;
        }
      });
      
      // 搜索過濾
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      const filtered = searchTerm 
        ? history.filter(item => item.prompt.toLowerCase().includes(searchTerm))
        : history;
      
      if (filtered.length === 0) {
        gallery.style.display = 'none';
        emptyState.style.display = 'block';
      } else {
        gallery.style.display = 'grid';
        emptyState.style.display = 'none';
        
        gallery.innerHTML = filtered.map(item => {
          const styleName = STYLE_NAMES[item.style] || '無風格';
          return \`
            <div class="gallery-item" data-id="\${item.id}">
              <img class="gallery-item-image" src="\${item.imageData}" alt="\${item.prompt}" loading="lazy">
              <div class="gallery-item-info">
                <div class="gallery-item-prompt">\${item.prompt}</div>
                \${item.style && item.style !== 'none' ? \`<div class="gallery-item-style">\${styleName}</div>\` : ''}
                <div class="gallery-item-meta">
                  <span>\${item.model}</span>
                  <span>\${item.ratio}</span>
                </div>
                <div class="gallery-item-actions">
                  <button class="btn-reuse" onclick="reuseParams(\${item.id})">🔄 重用</button>
                  <button class="btn-item-delete" onclick="deleteItem(\${item.id})">🗑️ 刪除</button>
                </div>
              </div>
            </div>
          \`;
        }).join('');
        
        // 添加點擊放大功能
        document.querySelectorAll('.gallery-item-image').forEach(img => {
          img.addEventListener('click', () => {
            document.getElementById('modalImage').src = img.src;
            document.getElementById('imageModal').classList.add('active');
          });
        });
      }
      
      updateHistoryCount();
    }
    
    // 重用參數
    async function reuseParams(id) {
      const history = await getAllHistory();
      const item = history.find(h => h.id === id);
      
      if (item) {
        document.getElementById('prompt').value = item.originalPrompt || item.prompt;
        document.getElementById('model').value = item.model;
        document.getElementById('seed').value = item.seed || '';
        
        // 設置比例
        const ratioBtn = document.querySelector(\`[data-ratio="\${item.ratio}"]\`);
        if (ratioBtn) {
          document.querySelectorAll('.ratio-btn').forEach(btn => btn.classList.remove('active'));
          ratioBtn.classList.add('active');
          updateSizePreview(item.width, item.height);
        }
        
        // 設置風格
        const styleBtn = document.querySelector(\`[data-style="\${item.style || 'none'}"]\`);
        if (styleBtn) {
          document.querySelectorAll('.style-btn, .style-card').forEach(btn => btn.classList.remove('active'));
          styleBtn.classList.add('active');
          // 如果是擴展風格，也激活快捷按鈕區的對應風格
          const quickStyleBtn = document.querySelector(\`.style-quick [data-style="\${item.style || 'none'}"]\`);
          if (quickStyleBtn) quickStyleBtn.classList.add('active');
        }
        
        switchTab('generate');
        showMessage('✅ 參數已填充', 'success');
      }
    }
    
    // 刪除單個項目
    async function deleteItem(id) {
      if (confirm('確定要刪除這張圖片嗎？')) {
        await deleteHistory(id);
        await loadHistory();
        showMessage('✅ 已刪除', 'success');
      }
    }
    
    // 更新尺寸預覽
    function updateSizePreview(width, height) {
      document.getElementById('currentSize').textContent = \`\${width} x \${height}\`;
    }
    
    // ==========================================
    // API 相關
    // ==========================================
    
    // 檢查 API 狀態
    async function checkAPIStatus() {
      try {
        const response = await fetch('/health');
        const data = await response.json();
        const statusEl = document.getElementById('apiStatus');
        
        if (data.status === 'ok' && data.hasApiKey) {
          statusEl.textContent = '✅ API 已就緒';
          statusEl.style.background = 'rgba(76, 175, 80, 0.3)';
        } else if (data.status === 'ok' && !data.hasApiKey) {
          statusEl.textContent = '⚠️ 缺少 API Key';
          statusEl.style.background = 'rgba(255, 152, 0, 0.3)';
        } else {
          statusEl.textContent = '❌ API 不可用';
          statusEl.style.background = 'rgba(244, 67, 54, 0.3)';
        }
      } catch (error) {
        document.getElementById('apiStatus').textContent = '❌ 連接失敗';
      }
    }
    
    // ==========================================
    // 事件監聽
    // ==========================================
    
    // 標籤切換
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });
    
    // 浮動按鈕
    document.getElementById('floatingBtn').addEventListener('click', () => {
      switchTab('generate');
    });
    
    // 模態框關閉
    document.getElementById('modalClose').addEventListener('click', () => {
      document.getElementById('imageModal').classList.remove('active');
    });
    
    document.getElementById('imageModal').addEventListener('click', (e) => {
      if (e.target.id === 'imageModal') {
        document.getElementById('imageModal').classList.remove('active');
      }
    });
    
    // 比例選擇
    document.querySelectorAll('.ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const ratio = btn.dataset.ratio;
        const width = parseInt(btn.dataset.width);
        const height = parseInt(btn.dataset.height);
        
        if (ratio === 'custom') {
          document.getElementById('customSizeGroup').style.display = 'block';
          const w = document.getElementById('width').value;
          const h = document.getElementById('height').value;
          updateSizePreview(w, h);
        } else {
          document.getElementById('customSizeGroup').style.display = 'none';
          document.getElementById('width').value = width;
          document.getElementById('height').value = height;
          updateSizePreview(width, height);
        }
      });
    });
    
    // 自定義尺寸輸入監聽
    document.getElementById('width').addEventListener('input', (e) => {
      updateSizePreview(e.target.value, document.getElementById('height').value);
    });
    
    document.getElementById('height').addEventListener('input', (e) => {
      updateSizePreview(document.getElementById('width').value, e.target.value);
    });
    
    // 風格選擇（快捷按鈕）
    document.querySelectorAll('.style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.style-btn, .style-card').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 同步更新擴展區域的對應卡片
        const style = btn.dataset.style;
        const card = document.querySelector(\`.style-card[data-style="\${style}"]\`);
        if (card) card.classList.add('active');
      });
    });
    
    // 風格選擇（擴展卡片）
    document.querySelectorAll('.style-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.style-btn, .style-card').forEach(b => b.classList.remove('active'));
        card.classList.add('active');
        
        // 同步更新快捷按鈕區的對應風格
        const style = card.dataset.style;
        const btn = document.querySelector(\`.style-quick [data-style="\${style}"]\`);
        if (btn) btn.classList.add('active');
      });
    });
    
    // 更多風格按鈕
    document.getElementById('styleMoreBtn').addEventListener('click', () => {
      const expanded = document.getElementById('styleExpanded');
      const btn = document.getElementById('styleMoreBtn');
      
      if (expanded.classList.contains('show')) {
        expanded.classList.remove('show');
        btn.textContent = '📋 更多風格...';
      } else {
        expanded.classList.add('show');
        btn.textContent = '🔼 收起';
      }
    });
    
    // 隨機種子
    document.getElementById('randomBtn').addEventListener('click', () => {
      document.getElementById('seed').value = Math.floor(Math.random() * 1000000);
    });
    
    // 排序變更
    document.getElementById('sortSelect').addEventListener('change', loadHistory);
    
    // 搜索
    document.getElementById('searchInput').addEventListener('input', loadHistory);
    
    // 清空全部
    document.getElementById('clearAllBtn').addEventListener('click', async () => {
      if (confirm('確定要清空所有歷史記錄嗎？此操作不可恢復！')) {
        await clearAllHistory();
        await loadHistory();
        showMessage('✅ 已清空所有記錄', 'success');
      }
    });
    
    // 表單提交
    document.getElementById('generateForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('generateBtn');
      const container = document.getElementById('previewContainer');
      const metaEl = document.getElementById('imageMeta');
      const actionsEl = document.getElementById('previewActions');
      
      btn.disabled = true;
      btn.textContent = '⏳ 生成中...';
      
      container.innerHTML = '<div class="loading"><div class="spinner"></div><p>正在生成圖片，請稍候...</p></div>';
      container.classList.remove('has-image');
      metaEl.style.display = 'none';
      actionsEl.style.display = 'none';
      
      // 獲取選中的風格
      const selectedStyleBtn = document.querySelector('.style-btn.active, .style-card.active');
      const selectedStyle = selectedStyleBtn ? selectedStyleBtn.dataset.style : 'none';
      const stylePrompt = STYLE_PRESETS[selectedStyle];
      
      // 獲取選中的比例
      const selectedRatioBtn = document.querySelector('.ratio-btn.active');
      const ratio = selectedRatioBtn.dataset.ratio;
      
      // 構建完整提示詞
      const originalPrompt = document.getElementById('prompt').value;
      const fullPrompt = stylePrompt 
        ? \`\${originalPrompt}, \${stylePrompt}\`
        : originalPrompt;
      
      const formData = new FormData(e.target);
      const data = {
        prompt: fullPrompt,
        model: formData.get('model'),
        width: parseInt(formData.get('width')),
        height: parseInt(formData.get('height')),
        seed: formData.get('seed') ? parseInt(formData.get('seed')) : undefined
      };
      
      try {
        const response = await fetch('/_internal/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || '生成失敗');
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // 轉換為 Base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result;
          
          // 保存當前圖片數據（用於保存按鈕）
          window.currentImage = {
            imageData: base64,
            originalPrompt: originalPrompt,
            prompt: fullPrompt,
            model: data.model,
            width: data.width,
            height: data.height,
            ratio: ratio,
            style: selectedStyle,
            seed: data.seed || Math.floor(Math.random() * 1000000)
          };
          
          container.innerHTML = \`<img src="\${url}" alt="Generated image">\`;
          container.classList.add('has-image');
          
          const styleName = STYLE_NAMES[selectedStyle] || '無風格';
          
          metaEl.innerHTML = \`
            <div class="image-meta">
              <div class="meta-item">
                <div class="meta-label">模型</div>
                <div class="meta-value">\${data.model}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">比例</div>
                <div class="meta-value">\${ratio}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">尺寸</div>
                <div class="meta-value">\${data.width} x \${data.height}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">風格</div>
                <div class="meta-value">\${styleName}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">種子</div>
                <div class="meta-value">\${window.currentImage.seed}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">大小</div>
                <div class="meta-value">\${(blob.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
          \`;
          metaEl.style.display = 'block';
          actionsEl.style.display = 'flex';
          
          showMessage('✅ 圖片生成成功！', 'success');
        };
        reader.readAsDataURL(blob);
        
      } catch (error) {
        container.innerHTML = \`<div class="preview-placeholder"><div class="icon">❌</div><p>\${error.message}</p></div>\`;
        showMessage('生成失敗: ' + error.message, 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = '🚀 開始生成';
      }
    });
    
    // 下載按鈕
    document.getElementById('downloadBtn').addEventListener('click', () => {
      if (window.currentImage) {
        const link = document.createElement('a');
        link.href = window.currentImage.imageData;
        link.download = \`pollinations_\${Date.now()}.png\`;
        link.click();
        showMessage('✅ 下載開始', 'success');
      }
    });
    
    // 保存按鈕
    document.getElementById('saveBtn').addEventListener('click', async () => {
      if (window.currentImage) {
        try {
          await saveToHistory(window.currentImage);
          await updateHistoryCount();
          showMessage('✅ 已保存到歷史記錄', 'success');
        } catch (error) {
          showMessage('保存失敗: ' + error.message, 'error');
        }
      }
    });
    
    // ==========================================
    // 初始化
    // ==========================================
    
    (async function init() {
      try {
        await initDB();
        await checkAPIStatus();
        await updateHistoryCount();
        console.log('✅ 應用初始化完成');
      } catch (error) {
        console.error('初始化失敗:', error);
        showMessage('初始化失敗: ' + error.message, 'error');
      }
    })();
  </script>
</body>
</html>`;
}
