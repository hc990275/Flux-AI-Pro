// =================================================================================
//  Flux AI Pro v9.3.4 - 完整版
//  24種藝術風格 | 圖生圖 | 多圖融合 | 4K支持
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.3.4",
  API_MASTER_KEY: "1",
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://image.pollinations.ai",
      type: "direct",
      auth_mode: "free",
      requires_key: false,
      enabled: true,
      default: true,
      description: "完全免費的 AI 圖像生成服務",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true,
        ultra_hd_4k: true,
        reference_images: true,
        image_to_image: true,
        multi_image_fusion: true
      },
      models: [
        { id: "flux", name: "Flux", confirmed: true, category: "flux", description: "均衡速度與質量", max_size: 2048 },
        { id: "flux-realism", name: "Flux Realism", confirmed: true, category: "flux", description: "超寫實風格", max_size: 2048 },
        { id: "flux-anime", name: "Flux Anime", confirmed: true, category: "flux", description: "日系動漫風格", max_size: 2048 },
        { id: "flux-3d", name: "Flux 3D", confirmed: true, category: "flux", description: "3D 渲染風格", max_size: 2048 },
        { id: "flux-pro", name: "Flux Pro", confirmed: true, category: "flux", description: "專業版最高質量", max_size: 2048 },
        { id: "any-dark", name: "Any Dark", confirmed: true, category: "flux", description: "暗黑風格", max_size: 2048 },
        { id: "turbo", name: "Turbo", confirmed: true, category: "flux", description: "極速生成", max_size: 2048 },
        { id: "flux-kontext", name: "Flux Kontext 🎨", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", confirmed: false, fallback: ["flux-kontext", "flux-pro"], experimental: true, category: "flux-advanced", description: "圖像編輯專業版 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "nanobanana", name: "Nano Banana 🍌", confirmed: true, category: "gemini", description: "Gemini 2.5 Flash (4張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 4 },
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌💎", confirmed: true, category: "gemini", description: "Gemini 3 Pro (4K + 4張參考圖)", max_size: 4096, ultra_hd: true, supports_reference_images: true, max_reference_images: 4 }
      ],
      rate_limit: null,
      max_size: { width: 4096, height: 4096 }
    }
  },
  DEFAULT_PROVIDER: "pollinations",
  STYLE_PRESETS: {
    none: { name: "無", prompt: "", negative: "" },
    "anime": { name: "動漫 ✨", prompt: "anime style, anime art, vibrant colors", negative: "realistic, photograph, 3d" },
    "manga": { name: "日本漫畫 📖", prompt: "manga style, black and white manga, ink drawing", negative: "colored, realistic" },
    "chibi": { name: "Q版 🎀", prompt: "chibi style, cute chibi, kawaii", negative: "realistic" },
    "photorealistic": { name: "寫實 📷", prompt: "photorealistic, ultra realistic, 8k uhd", negative: "anime, cartoon" },
    "cinematic": { name: "電影 🎬", prompt: "cinematic lighting, movie still, dramatic", negative: "amateur" },
    "portrait": { name: "人像 👤", prompt: "portrait photography, studio lighting", negative: "landscape" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, brushstrokes, artistic", negative: "photograph" },
    "watercolor": { name: "水彩 💧", prompt: "watercolor painting, soft colors", negative: "photograph" },
    "sketch": { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn", negative: "colored" },
    "ink-painting": { name: "水墨 🖌️", prompt: "Chinese ink painting, brush strokes", negative: "colored" },
    "digital-art": { name: "數位 💻", prompt: "digital art, concept art", negative: "photograph" },
    "pixel-art": { name: "像素 🕹️", prompt: "pixel art, 8bit, retro game", negative: "realistic" },
    "low-poly": { name: "低多邊 🔷", prompt: "low poly, geometric", negative: "realistic" },
    "vaporwave": { name: "蒸汽波 🌴", prompt: "vaporwave, retro futuristic, neon", negative: "realistic" },
    "fantasy": { name: "奇幻 🐉", prompt: "fantasy art, magical, epic", negative: "modern" },
    "cyberpunk": { name: "賽博朋克 🌃", prompt: "cyberpunk, neon lights, futuristic", negative: "natural" },
    "steampunk": { name: "蒸汽朋克 ⚙️", prompt: "steampunk, Victorian, brass gears", negative: "modern" },
    "horror": { name: "恐怖 👻", prompt: "horror art, dark, eerie", negative: "bright" },
    "minimalist": { name: "極簡 ⚪", prompt: "minimalist, simple, clean lines", negative: "detailed" },
    "abstract": { name: "抽象 🎭", prompt: "abstract art, geometric shapes", negative: "realistic" },
    "pop-art": { name: "普普 🎪", prompt: "pop art, bold colors, comic style", negative: "realistic" },
    "studio-ghibli": { name: "吉卜力 🏯", prompt: "Studio Ghibli style, anime background", negative: "realistic" },
    "disney": { name: "迪士尼 🏰", prompt: "Disney animation, 3D animated", negative: "realistic" },
    "comic-book": { name: "美漫 💥", prompt: "comic book style, bold outlines", negative: "realistic" }
  },
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "turbo": { min: 4, optimal: 8, max: 12 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "flux-anime": { min: 15, optimal: 20, max: 30 },
      "flux-realism": { min: 20, optimal: 28, max: 40 },
      "flux-pro": { min: 25, optimal: 32, max: 45 },
      "flux-kontext": { min: 22, optimal: 30, max: 40 },
      "flux-kontext-pro": { min: 25, optimal: 35, max: 45 },
      "nanobanana": { min: 15, optimal: 22, max: 30 },
      "nanobanana-pro": { min: 25, optimal: 35, max: 50 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 },
      ultra_4k: { threshold: 4096 * 4096, multiplier: 1.5 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "cinematic": 1.1,
      "portrait": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "sketch": 0.9,
      "pixel-art": 0.85,
      "default": 1.0
    }
  },
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清", min_resolution: 1536, max_resolution: 4096, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true },
      ultra_4k: { name: "4K", min_resolution: 2048, max_resolution: 4096, steps_multiplier: 1.5, guidance_multiplier: 1.2, hd_level: "ultra_4k", force_upscale: true }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, extremely detailed, sharp focus, 8k uhd",
      maximum: "ultra high quality, extremely detailed, razor sharp, 8k uhd, masterpiece",
      ultra_4k: "ultra 4K quality, extreme detail, professional grade, masterpiece"
    },
    HD_NEGATIVE: "low quality, blurry, pixelated, jpeg artifacts, bad quality",
    MODEL_QUALITY_PROFILES: {
      "flux-realism": { min_resolution: 1536, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "flux-pro": { min_resolution: 1536, optimal_steps_boost: 1.3, guidance_boost: 1.2, recommended_quality: "ultra" },
      "nanobanana-pro": { min_resolution: 2048, optimal_steps_boost: 1.5, guidance_boost: 1.25, recommended_quality: "ultra_4k" },
      "turbo": { min_resolution: 1024, optimal_steps_boost: 0.7, guidance_boost: 0.85, recommended_quality: "economy" }
    }
  },
  FETCH_TIMEOUT: 90000,
  MAX_RETRIES: 3,
  PRESET_SIZES: {
    "square-1k": { width: 1024, height: 1024 },
    "square-2k": { width: 2048, height: 2048 },
    "square-4k": { width: 4096, height: 4096 },
    "portrait": { width: 768, height: 1344 },
    "landscape": { width: 1344, height: 768 }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(step, data) {
    this.logs.push({ time: new Date().toISOString(), step, data });
    console.log(`[${step}]`, data);
  }
  get() { return this.logs; }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const keywords = ['detailed', 'intricate', 'realistic', '4k', '8k'];
    let score = 0;
    keywords.forEach(k => { if (prompt.toLowerCase().includes(k)) score += 0.1; });
    if (prompt.length > 100) score += 0.2;
    return Math.min(score, 1.0);
  }
}

class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode, autoHD) {
    if (!autoHD) return { prompt, negativePrompt, width, height, optimized: false };
    const cfg = CONFIG.HD_OPTIMIZATION;
    const mode = cfg.QUALITY_MODES[qualityMode] || cfg.QUALITY_MODES.standard;
    let enhanced = prompt + ", " + cfg.HD_PROMPTS[mode.hd_level];
    let negEnhanced = negativePrompt ? negativePrompt + ", " + cfg.HD_NEGATIVE : cfg.HD_NEGATIVE;
    return { prompt: enhanced, negativePrompt: negEnhanced, width, height, optimized: true };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style, qualityMode) {
    const rule = CONFIG.OPTIMIZATION_RULES.MODEL_STEPS[model] || CONFIG.OPTIMIZATION_RULES.MODEL_STEPS.flux;
    const mode = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    let steps = Math.round(rule.optimal * (mode?.steps_multiplier || 1.0));
    return { steps: Math.max(rule.min, Math.min(steps, rule.max)), optimized: true };
  }
  static optimizeGuidance(model, style, qualityMode) {
    const mode = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    let base = 7.5;
    if (model.includes('turbo')) base = 2.5;
    return base * (mode?.guidance_multiplier || 1.0);
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    const cfg = CONFIG.STYLE_PRESETS[style];
    if (!cfg || style === 'none') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
    let enhanced = cfg.prompt ? prompt + ", " + cfg.prompt : prompt;
    let negEnhanced = cfg.negative ? (negativePrompt ? negativePrompt + ", " + cfg.negative : cfg.negative) : negativePrompt;
    return { enhancedPrompt: enhanced, enhancedNegative: negEnhanced };
  }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}
class PollinationsProvider {
  constructor(config, env) {
    this.config = config;
    this.name = config.name;
    this.env = env;
  }
  
  async generate(prompt, options, logger) {
    const { 
      model = "flux", 
      width = 1024, 
      height = 1024, 
      seed = -1, 
      negativePrompt = "", 
      guidance = null, 
      steps = null, 
      enhance = false, 
      nologo = true, 
      privateMode = true, 
      style = "none", 
      autoOptimize = true, 
      autoHD = true, 
      qualityMode = 'standard',
      referenceImages = []
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRef = modelConfig?.supports_reference_images || false;
    const maxRef = modelConfig?.max_reference_images || 0;
    
    let validRef = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRef) {
        logger.add("⚠️ Ref Images", { warning: model + " 不支持參考圖" });
      } else {
        validRef = referenceImages.slice(0, maxRef);
        logger.add("🖼️ Ref Images", { count: validRef.length, mode: validRef.length === 1 ? "Image-to-Image" : "Multi-Fusion" });
      }
    }
    
    let finalPrompt = prompt;
    let finalNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      const hd = HDOptimizer.optimize(prompt, negativePrompt, model, width, height, qualityMode, autoHD);
      finalPrompt = hd.prompt;
      finalNegative = hd.negativePrompt;
    }
    
    let finalSteps = steps;
    let finalGuidance = guidance;
    
    if (autoOptimize) {
      const stepsOpt = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode);
      finalSteps = stepsOpt.steps;
      if (!guidance) finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegative);
    
    const modelsToTry = [model];
    if (modelConfig?.experimental && modelConfig?.fallback) {
      modelsToTry.push(...modelConfig.fallback);
    }
    
    logger.add("🎨 Config", { 
      model, 
      style,
      size: finalWidth + "x" + finalHeight,
      quality: qualityMode, 
      ref_images: validRef.length,
      steps: finalSteps, 
      guidance: finalGuidance 
    });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = enhancedPrompt;
    if (enhancedNegative && enhancedNegative.trim()) {
      fullPrompt = enhancedPrompt + " [negative: " + enhancedNegative + "]";
    }
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    
    for (const tryModel of modelsToTry) {
      for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
        try {
          let url = this.config.endpoint + "/prompt/" + encodedPrompt;
          const params = new URLSearchParams();
          params.append('model', tryModel);
          params.append('width', finalWidth.toString());
          params.append('height', finalHeight.toString());
          params.append('seed', currentSeed.toString());
          params.append('nologo', nologo.toString());
          params.append('enhance', enhance.toString());
          params.append('private', privateMode.toString());
          
          if (validRef.length > 0) {
            params.append('image', validRef.join(','));
          }
          
          if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
          if (finalSteps !== 20) params.append('steps', finalSteps.toString());
          url += '?' + params.toString();
          
          const response = await fetchWithTimeout(url, { 
            method: 'GET', 
            headers: { 
              'User-Agent': 'Mozilla/5.0', 
              'Accept': 'image/*,*/*'
            } 
          }, 90000);
          
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('image/')) {
              logger.add("✅ Success", { url: response.url, model: tryModel, seed: currentSeed });
              
              return { 
                url: response.url, 
                provider: this.name, 
                model: tryModel, 
                seed: currentSeed, 
                style: style, 
                steps: finalSteps, 
                guidance: finalGuidance, 
                width: finalWidth, 
                height: finalHeight,
                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                quality_mode: qualityMode, 
                reference_images: validRef,
                reference_images_count: validRef.length,
                generation_mode: validRef.length > 0 ? (validRef.length === 1 ? "Image-to-Image" : "Multi-Image Fusion") : "Text-to-Image",
                cost: "FREE"
              };
            }
          }
          throw new Error("HTTP " + response.status);
        } catch (e) {
          console.error(`Retry ${retry + 1}/${CONFIG.MAX_RETRIES}:`, e.message);
          if (retry < CONFIG.MAX_RETRIES - 1) {
            await new Promise(r => setTimeout(r, 1000 * (retry + 1)));
          }
        }
      }
    }
    throw new Error("All models failed");
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled && key === 'pollinations') {
        this.providers[key] = new PollinationsProvider(config, env);
      }
    }
  }
  
  getProvider(name = null) {
    if (name && this.providers[name]) {
      return { name, instance: this.providers[name] };
    }
    const def = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[def]) {
      return { name: def, instance: this.providers[def] };
    }
    const first = Object.keys(this.providers)[0];
    if (first) return { name: first, instance: this.providers[first] };
    throw new Error('No provider');
  }
  
  async generate(prompt, options, logger) {
    const { provider: reqProvider = null, numOutputs = 1 } = options;
    const { instance: provider } = this.getProvider(reqProvider);
    const results = [];
    for (let i = 0; i < numOutputs; i++) {
      const opts = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, opts, logger);
      results.push(result);
    }
    return results;
  }
}

function corsHeaders(extra = {}) {
  return { 
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
    'Access-Control-Allow-Headers': 'Content-Type', 
    ...extra 
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    try {
      if (url.pathname === '/') return handleUI();
      if (url.pathname === '/v1/images/generations') return handleImageGenerations(request, env);
      if (url.pathname === '/v1/models') return handleModels();
      if (url.pathname === '/v1/styles') return handleStyles();
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          version: CONFIG.PROJECT_VERSION,
          features: ['本地上傳', '圖生圖', '多圖融合', '4K', '24種藝術風格']
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      return new Response(JSON.stringify({ 
        project: CONFIG.PROJECT_NAME, 
        version: CONFIG.PROJECT_VERSION 
      }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch (error) {
      return new Response(JSON.stringify({ error: { message: error.message } }), { 
        status: 500, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      });
    }
  }
};

async function handleImageGenerations(request, env) {
  const logger = new Logger();
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt required");
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    let refImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      refImages = body.reference_images.filter(url => {
        try { new URL(url); return true; } catch { return false; }
      });
    }
    
    const options = { 
      provider: body.provider || null, 
      model: body.model || "flux", 
      width: Math.min(Math.max(width, 256), 4096), 
      height: Math.min(Math.max(height, 256), 4096), 
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
      seed: body.seed !== undefined ? body.seed : -1, 
      negativePrompt: body.negative_prompt || "", 
      guidance: body.guidance_scale || null, 
      steps: body.steps || null, 
      enhance: body.enhance === true, 
      nologo: body.nologo !== false, 
      privateMode: body.private !== false, 
      style: body.style || "none", 
      autoOptimize: body.auto_optimize !== false, 
      autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard',
      referenceImages: refImages
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    
    return new Response(JSON.stringify({ 
      created: Math.floor(Date.now() / 1000), 
      data: results.map(r => ({ 
        url: r.url, 
        provider: r.provider, 
        model: r.model, 
        seed: r.seed, 
        style: r.style,
        width: r.width, 
        height: r.height,
        is_4k: r.is_4k,
        reference_images: r.reference_images || [],
        reference_images_count: r.reference_images_count || 0,
        generation_mode: r.generation_mode || "Text-to-Image",
        quality_mode: r.quality_mode, 
        steps: r.steps, 
        guidance: r.guidance, 
        cost: r.cost 
      })) 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ 
      error: { message: e.message, debug_logs: logger.get() } 
    }), { 
      status: 500, 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
  }
}

function handleModels() {
  const models = [];
  for (const [pk, pc] of Object.entries(CONFIG.PROVIDERS)) {
    if (pc.enabled && pc.models) {
      for (const m of pc.models) {
        models.push({ 
          id: m.id, 
          name: m.name, 
          provider: pk, 
          category: m.category, 
          description: m.description,
          max_size: m.max_size || 2048,
          supports_reference_images: m.supports_reference_images || false,
          max_reference_images: m.max_reference_images || 0
        });
      }
    }
  }
  return new Response(JSON.stringify({ data: models, total: models.length }), { 
    headers: corsHeaders({ 'Content-Type': 'application/json' }) 
  });
}

function handleStyles() {
  const styles = Object.entries(CONFIG.STYLE_PRESETS).map(([k, v]) => ({ 
    id: k, 
    name: v.name, 
    prompt_addition: v.prompt, 
    negative_addition: v.negative
  }));
  return new Response(JSON.stringify({ data: styles, total: styles.length }), { 
    headers: corsHeaders({ 'Content-Type': 'application/json' }) 
  });
}
function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;padding:20px;min-height:100vh}
.container{max-width:1400px;margin:0 auto}
h1{color:#f59e0b;font-size:36px;font-weight:800;text-shadow:0 0 30px rgba(245,158,11,0.6);margin-bottom:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:6px 14px;border-radius:20px;font-size:14px;margin-left:10px}
.subtitle{color:#9ca3af;margin-bottom:20px;font-size:15px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}
@media (max-width:768px){.grid{grid-template-columns:1fr}}
.box{background:rgba(26,26,26,0.95);padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,0.1)}
h3{color:#f59e0b;margin-bottom:18px;font-size:18px;font-weight:700}
label{display:block;margin:16px 0 8px 0;color:#e5e7eb;font-weight:600;font-size:13px}
select,textarea,input{width:100%;padding:12px;margin:0;background:#2a2a2a;border:1px solid #444;color:#fff;border-radius:10px;font-size:14px;font-family:inherit;transition:all 0.3s}
select:focus,textarea:focus,input:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.15)}
textarea{resize:vertical;min-height:90px}
button{width:100%;padding:16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,158,11,0.4)}
button:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.6)}
button:disabled{background:#555;cursor:not-allowed;transform:none;box-shadow:none}
.ref-img-section{background:rgba(236,72,153,0.1);border:2px dashed #ec4899;padding:15px;border-radius:10px;margin-top:15px}
.upload-area{background:rgba(236,72,153,0.05);border:2px dashed #ec4899;border-radius:8px;padding:20px;text-align:center;cursor:pointer;transition:all 0.3s;margin-bottom:10px}
.upload-area:hover{background:rgba(236,72,153,0.15);border-color:#f472b6}
.upload-area.dragover{background:rgba(236,72,153,0.25);transform:scale(1.02)}
.ref-img-list{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.ref-img-item{position:relative;width:80px;height:80px}
.ref-img-item img{width:100%;height:100%;object-fit:cover;border-radius:8px;border:2px solid #ec4899}
.ref-img-remove{position:absolute;top:-8px;right:-8px;background:#ef4444;color:#fff;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;font-weight:700}
.spinner{border:3px solid rgba(255,255,255,0.3);border-top:3px solid #ec4899;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.tag-mode{display:inline-block;background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);color:#fff;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;margin-left:6px}
.tag-4k{display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;margin-left:6px}
.timer{color:#10b981;font-weight:700;margin-left:8px}
.example-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.example-btns button{padding:6px 12px;font-size:12px;margin:0;width:auto;background:rgba(16,185,129,0.2);border:1px solid #10b981}
</style>
</head>
<body>
<div class="container">
<h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span></h1>
<p class="subtitle">本地上傳 · 圖生圖 · 多圖融合 · 多張生成 · 4K · 24種藝術風格</p>

<div class="grid">
<div class="box">
<h3>📝 生成設置</h3>
<label>提示詞 * <span style="color:#ef4444;font-size:11px">⚠️ 僅支持英文</span></label>
<textarea id="prompt" placeholder="Describe your image in English..."></textarea>
<div class="example-btns">
<button type="button" onclick="setPrompt('a cat floating in space, extremely detailed, 8k uhd')">🐱 Space Cat</button>
<button type="button" onclick="setPrompt('cyberpunk city at night, neon lights, futuristic')">🌃 Cyberpunk</button>
<button type="button" onclick="setPrompt('beautiful cherry blossom tree, spring, photorealistic')">🌸 Cherry</button>
<button type="button" onclick="setPrompt('dragon flying through clouds, Chinese ink painting')">🐉 Dragon</button>
</div>

<label>負面提示詞</label>
<textarea id="negativePrompt" placeholder="low quality, blurry, bad anatomy"></textarea>

<div class="ref-img-section">
<label>🖼️ 參考圖 (圖生圖/多圖融合)</label>
<div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
<div style="font-size:40px;margin-bottom:10px">📤</div>
<div style="color:#ec4899;font-weight:600;margin-bottom:5px">點擊或拖拽上傳圖片</div>
<div style="color:#9ca3af;font-size:12px">支持 JPG, PNG, WebP (最大 10MB)</div>
</div>
<input type="file" id="fileInput" accept="image/*" multiple style="display:none">
<input type="text" id="refImageUrl" placeholder="或輸入圖片 URL 後按 Enter" style="margin-top:10px">
<div class="ref-img-list" id="refImageList"></div>
<small id="refImageLimit" style="color:#9ca3af;font-size:11px"></small>
</div>

<label>AI 模型</label>
<select id="model" onchange="updateRefImageLimit()">
<optgroup label="⚡ Flux 系列">
<option value="flux">Flux (均衡)</option>
<option value="flux-realism">Flux Realism (超寫實)</option>
<option value="flux-anime">Flux Anime (動漫)</option>
<option value="flux-pro">Flux Pro (專業版)</option>
<option value="turbo">Turbo (極速)</option>
</optgroup>
<optgroup label="🎨 圖像編輯">
<option value="flux-kontext">Kontext 🎨 (1張)</option>
<option value="flux-kontext-pro">Kontext Pro 💎 (1張)</option>
</optgroup>
<optgroup label="🍌 Nano Banana">
<option value="nanobanana">Nano Banana 🍌 (4張)</option>
<option value="nanobanana-pro">Nano Banana Pro 🍌💎 (4K+4張)</option>
</optgroup>
</select>

<label>藝術風格</label>
<select id="style">
<option value="none">無</option>
<optgroup label="✨ 動漫">
<option value="anime">動漫 ✨</option>
<option value="manga">漫畫 📖</option>
<option value="chibi">Q版 🎀</option>
</optgroup>
<optgroup label="📷 寫實">
<option value="photorealistic">寫實 📷</option>
<option value="cinematic">電影 🎬</option>
<option value="portrait">人像 👤</option>
</optgroup>
<optgroup label="🎨 繪畫">
<option value="oil-painting">油畫 🎨</option>
<option value="watercolor">水彩 💧</option>
<option value="sketch">素描 ✏️</option>
<option value="ink-painting">水墨 🖌️</option>
</optgroup>
<optgroup label="💻 數位">
<option value="digital-art">數位 💻</option>
<option value="pixel-art">像素 🕹️</option>
<option value="vaporwave">蒸汽波 🌴</option>
</optgroup>
<optgroup label="🐉 幻想">
<option value="fantasy">奇幻 🐉</option>
<option value="cyberpunk">賽博朋克 🌃</option>
<option value="steampunk">蒸汽朋克 ⚙️</option>
</optgroup>
<optgroup label="🎭 特殊">
<option value="horror">恐怖 👻</option>
<option value="minimalist">極簡 ⚪</option>
<option value="abstract">抽象 🎭</option>
<option value="pop-art">普普 🎪</option>
<option value="studio-ghibli">吉卜力 🏯</option>
<option value="disney">迪士尼 🏰</option>
<option value="comic-book">美漫 💥</option>
</optgroup>
</select>
</div>

<div class="box">
<h3>🎨 圖像參數</h3>
<label>尺寸預設</label>
<select id="sizePreset" onchange="applySizePreset()">
<option value="square-1k">方形 1K (1024x1024)</option>
<option value="square-2k">方形 2K (2048x2048)</option>
<option value="square-4k">方形 4K 🍌 (4096x4096)</option>
<option value="portrait">豎屏 9:16 (768x1344)</option>
<option value="landscape">橫屏 16:9 (1344x768)</option>
</select>

<label>寬度: <span id="widthValue">1024</span>px</label>
<input type="range" id="width" min="256" max="4096" step="64" value="1024">

<label>高度: <span id="heightValue">1024</span>px</label>
<input type="range" id="height" min="256" max="4096" step="64" value="1024">

<label>質量模式</label>
<select id="qualityMode">
<option value="economy">⚡ 經濟</option>
<option value="standard" selected>⭐ 標準</option>
<option value="ultra">💎 超高清</option>
<option value="ultra_4k">🍌 4K超高清</option>
</select>

<label>生成數量 🎲</label>
<select id="numOutputs">
<option value="1" selected>1 張</option>
<option value="2">2 張</option>
<option value="3">3 張</option>
<option value="4">4 張</option>
</select>

<button onclick="generate()">🚀 開始生成</button>
</div>
</div>

<div id="result"></div>
</div>

<script>
const PRESETS=${JSON.stringify(CONFIG.PRESET_SIZES)};
let referenceImages=[];
const MAX_FILE_SIZE=10*1024*1024;

function setPrompt(text){
document.getElementById('prompt').value=text;
}

document.getElementById('refImageUrl').addEventListener('keypress',function(e){
if(e.key==='Enter'){
const url=this.value.trim();
if(url){
try{
new URL(url);
const model=document.getElementById('model').value;
const maxRef=getMaxReferenceImages(model);
if(referenceImages.length>=maxRef){
alert('此模型最多支持 '+maxRef+' 張參考圖');
return;
}
referenceImages.push(url);
this.value='';
renderReferenceImages();
}catch{
alert('請輸入有效的圖片 URL');
}
}
}
});

document.getElementById('fileInput').addEventListener('change',async function(e){
await handleFiles(e.target.files);
this.value='';
});

const uploadArea=document.getElementById('uploadArea');
uploadArea.addEventListener('dragover',function(e){
e.preventDefault();
this.classList.add('dragover');
});
uploadArea.addEventListener('dragleave',function(e){
e.preventDefault();
this.classList.remove('dragover');
});
uploadArea.addEventListener('drop',async function(e){
e.preventDefault();
this.classList.remove('dragover');
await handleFiles(e.dataTransfer.files);
});

async function handleFiles(files){
const model=document.getElementById('model').value;
const maxRef=getMaxReferenceImages(model);
const remaining=maxRef-referenceImages.length;
if(remaining<=0){
alert('此模型最多支持 '+maxRef+' 張參考圖');
return;
}
const filesToProcess=Array.from(files).slice(0,remaining);
for(const file of filesToProcess){
if(!file.type.startsWith('image/')){
alert(file.name+' 不是圖片');
continue;
}
if(file.size>MAX_FILE_SIZE){
alert(file.name+' 超過 10MB');
continue;
}
await uploadImage(file);
}
}

async function uploadImage(file){
const tempId='temp-'+Date.now();
referenceImages.push({id:tempId,uploading:true});
renderReferenceImages();
try{
const base64=await fileToBase64(file);
const url=await uploadToImageHost(base64,file.name);
const index=referenceImages.findIndex(img=>img.id===tempId);
if(index!==-1){
referenceImages[index]=url;
renderReferenceImages();
}
}catch(error){
console.error('Upload error:',error);
const index=referenceImages.findIndex(img=>img.id===tempId);
if(index!==-1){
referenceImages.splice(index,1);
renderReferenceImages();
}
alert('上傳失敗: '+error.message);
}
}

function fileToBase64(file){
return new Promise((resolve,reject)=>{
const reader=new FileReader();
reader.onload=()=>resolve(reader.result);
reader.onerror=reject;
reader.readAsDataURL(file);
});
}

async function uploadToImageHost(base64,filename){
try{
const response=await fetch('https://api.imgur.com/3/image',{
method:'POST',
headers:{'Authorization':'Client-ID 2afc620eb108124','Content-Type':'application/json'},
body:JSON.stringify({image:base64.split(',')[1],type:'base64',name:filename})
});
const data=await response.json();
if(data.success)return data.data.link;
throw new Error('Imgur failed');
}catch(e){
console.error('Imgur failed:',e);
try{
const formData=new FormData();
formData.append('image',base64.split(',')[1]);
const response=await fetch('https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22',{method:'POST',body:formData});
const data=await response.json();
if(data.success)return data.data.url;
throw new Error('ImgBB failed');
}catch(e2){
console.error('ImgBB failed:',e2);
return base64;
}
}
}

function getMaxReferenceImages(model){
const config=${JSON.stringify(CONFIG.PROVIDERS.pollinations.models)};
const m=config.find(x=>x.id===model);
return m?.max_reference_images||0;
}

function updateRefImageLimit(){
const model=document.getElementById('model').value;
const maxRef=getMaxReferenceImages(model);
const section=document.getElementById('refImageLimit');
if(maxRef>0){
section.textContent='最多 '+maxRef+' 張 (已添加 '+referenceImages.length+')';
section.style.color='#10b981';
}else{
section.textContent='此模型不支持參考圖';
section.style.color='#ef4444';
}
}

function renderReferenceImages(){
const list=document.getElementById('refImageList');
list.innerHTML='';
referenceImages.forEach((item,index)=>{
const div=document.createElement('div');
div.className='ref-img-item';
if(typeof item==='object'&&item.uploading){
div.innerHTML='<div style="width:80px;height:80px;background:#2a2a2a;border-radius:8px;border:2px dashed #ec4899;display:flex;align-items:center;justify-content:center"><div class="spinner"></div></div>';
}else{
const url=typeof item==='object'?item.url:item;
div.innerHTML='<img src="'+url+'"><button class="ref-img-remove" onclick="removeRefImage('+index+')">×</button>';
}
list.appendChild(div);
});
updateRefImageLimit();
}

function removeRefImage(index){
referenceImages.splice(index,1);
renderReferenceImages();
}

function applySizePreset(){
const preset=PRESETS[document.getElementById('sizePreset').value];
if(preset){
document.getElementById('width').value=preset.width;
document.getElementById('height').value=preset.height;
document.getElementById('widthValue').textContent=preset.width;
document.getElementById('heightValue').textContent=preset.height;
}
}

document.getElementById('width').oninput=function(){document.getElementById('widthValue').textContent=this.value;};
document.getElementById('height').oninput=function(){document.getElementById('heightValue').textContent=this.value;};

async function generate(){
const prompt=document.getElementById('prompt').value.trim();
if(!prompt){alert('請輸入提示詞');return;}

const validRef=referenceImages.filter(img=>typeof img==='string'||!img.uploading);
if(validRef.length<referenceImages.length){
alert('請等待圖片上傳完成');
return;
}

const params={
prompt:prompt,
negative_prompt:document.getElementById('negativePrompt').value,
model:document.getElementById('model').value,
style:document.getElementById('style').value,
width:parseInt(document.getElementById('width').value),
height:parseInt(document.getElementById('height').value),
quality_mode:document.getElementById('qualityMode').value,
n:parseInt(document.getElementById('numOutputs').value),
auto_optimize:true,
auto_hd:true,
reference_images:validRef
};

const resultDiv=document.getElementById('result');
const button=document.querySelector('button[onclick="generate()"]');
button.disabled=true;

const startTime=Date.now();
let timerInterval=setInterval(()=>{
const elapsed=((Date.now()-startTime)/1000).toFixed(1);
button.textContent='生成中 ⏱️ '+elapsed+'s';
},100);

try{
const response=await fetch('/v1/images/generations',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(params)
});
const data=await response.json();
if(!response.ok)throw new Error(data.error?.message||'生成失敗');

const duration=((Date.now()-startTime)/1000).toFixed(1)+'s';
clearInterval(timerInterval);

resultDiv.innerHTML='<div style="background:rgba(16,185,129,0.15);border:1px solid #10b981;padding:16px;border-radius:12px;color:#10b981;margin-top:20px"><strong>✅ 成功!</strong> 共 '+data.data.length+' 張<span class="timer">⏱️ '+duration+'</span></div>';

data.data.forEach((item,index)=>{
const is4K=item.is_4k?'<span class="tag-4k">4K</span>':'';
const mode=item.generation_mode?'<span class="tag-mode">'+item.generation_mode+'</span>':'';
const imgDiv=document.createElement('div');
imgDiv.style.marginTop='20px';
imgDiv.innerHTML='<div style="background:rgba(255,255,255,0.05);padding:15px;border-radius:12px"><h4 style="color:#f59e0b;margin-bottom:10px">圖片 '+(index+1)+' <span style="color:#9ca3af;font-size:14px;font-weight:400">Seed: '+item.seed+'</span></h4><img src="'+item.url+'" style="width:100%;border-radius:12px;cursor:pointer" onclick="window.open(\\''+item.url+'\\')"><div style="background:rgba(16,185,129,0.1);padding:8px;border-radius:8px;margin-top:8px;font-size:12px;color:#10b981">'+item.model+' | '+item.width+'x'+item.height+is4K+mode+'</div></div>';
resultDiv.appendChild(imgDiv);
});
}catch(error){
clearInterval(timerInterval);
resultDiv.innerHTML='<div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444;margin-top:20px"><strong>❌ 錯誤:</strong> '+error.message+'</div>';
}finally{
button.disabled=false;
button.textContent='🚀 開始生成';
}
}

updateRefImageLimit();
</script>
</body>
</html>`;
  
  return new Response(html, { headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' }) });
}
