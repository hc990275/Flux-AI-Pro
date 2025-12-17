// ===========================
// Flux AI Pro - v9.5.3-speed-ultra
// 完整配置部分
// ===========================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.5.3-speed-ultra",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 60000,
  MAX_RETRIES: 1,
  
  SPEED_OPTIMIZATION: {
    enabled: true,
    parallel_requests: true,
    cache_translations: true,
    skip_complexity_analysis: true,
    use_faster_models: true,
    reduce_hd_processing: true
  },
  
  DEFAULT_MODEL: "turbo",
  
  POLLINATIONS_AUTH: {
    enabled: false,
    header_name: "Authorization"
  },
  
  MODELS: {
    zimage: {
      api_name: "z-image",
      display_name: "Z-Image Turbo",
      default_steps: 20,
      default_guidance: 4.5,
      supports_negative: false,
      supports_image_input: false,
      emoji: "⚡",
      speed: "超快",
      quality: "中等"
    },
    flux: {
      api_name: "flux",
      display_name: "Flux Standard",
      default_steps: 25,
      default_guidance: 6,
      supports_negative: true,
      supports_image_input: false,
      emoji: "🎨",
      speed: "中等",
      quality: "高"
    },
    turbo: {
      api_name: "turbo",
      display_name: "Flux Turbo",
      default_steps: 3,
      default_guidance: 3,
      supports_negative: true,
      supports_image_input: false,
      emoji: "⚡",
      speed: "極快",
      quality: "中等"
    },
    kontext: {
      api_name: "flux-kontext",
      display_name: "Kontext (Image-to-Image)",
      default_steps: 20,
      default_guidance: 6,
      supports_negative: true,
      supports_image_input: true,
      emoji: "🖼️",
      speed: "慢",
      quality: "極高"
    }
  },
  
  SIZES: {
    square: [
      { width: 1024, height: 1024, label: "方形 1024x1024" }
    ],
    portrait: [
      { width: 768, height: 1024, label: "豎屏 3:4" },
      { width: 1080, height: 1920, label: "豎屏 9:16" }
    ],
    landscape: [
      { width: 1024, height: 768, label: "橫屏 4:3" },
      { width: 1920, height: 1080, label: "橫屏 16:9" }
    ]
  },
  
  STYLES: {
    anime: {
      name: "動漫風格",
      prompt: "anime style, vibrant colors",
      negative: "realistic, photo"
    },
    realistic: {
      name: "寫實照片",
      prompt: "photorealistic, 8k uhd",
      negative: "anime, cartoon"
    },
    oil: {
      name: "油畫",
      prompt: "oil painting",
      negative: "photo"
    },
    watercolor: {
      name: "水彩畫",
      prompt: "watercolor",
      negative: ""
    },
    cyberpunk: {
      name: "賽博朋克",
      prompt: "cyberpunk, neon",
      negative: ""
    },
    fantasy: {
      name: "奇幻風格",
      prompt: "fantasy art",
      negative: ""
    },
    ghibli: {
      name: "吉卜力風格",
      prompt: "ghibli style",
      negative: ""
    },
    none: {
      name: "無風格",
      prompt: "",
      negative: ""
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: {
        name: "經濟模式",
        min_resolution: 768,
        steps_multiplier: 0.7,
        hd_level: "basic",
        force_upscale: false
      },
      standard: {
        name: "標準模式",
        min_resolution: 1024,
        steps_multiplier: 0.85,
        hd_level: "enhanced",
        force_upscale: false
      },
      ultra: {
        name: "超高清模式",
        min_resolution: 1280,
        steps_multiplier: 1.0,
        hd_level: "maximum",
        force_upscale: false
      }
    },
    HD_PROMPTS: {
      basic: "high quality",
      enhanced: "detailed",
      maximum: "masterpiece"
    },
    HD_NEGATIVE: "blurry, low quality",
    MODEL_QUALITY_PROFILES: {
      turbo: {
        max_resolution: 1536,
        min_resolution: 768,
        recommended_quality: "economy"
      },
      zimage: {
        max_resolution: 1536,
        min_resolution: 768,
        recommended_quality: "economy"
      },
      flux: {
        max_resolution: 1920,
        min_resolution: 1024,
        recommended_quality: "standard"
      },
      kontext: {
        max_resolution: 1920,
        min_resolution: 1024,
        recommended_quality: "standard"
      }
    }
  }
};

const translationCache = new Map();
const MAX_CACHE_SIZE = 100;
// ===========================
// 優化類
// ===========================

class PromptAnalyzer {
    static analyzeComplexity(prompt) {
        if (CONFIG.SPEED_OPTIMIZATION?.skip_complexity_analysis) {
            return 0.4;
        }
        
        const complexKeywords = ['detailed', 'realistic', '4k', '8k'];
        let score = 0;
        const lowerPrompt = prompt.toLowerCase();
        
        complexKeywords.forEach(keyword => { 
            if (lowerPrompt.includes(keyword)) score += 0.15; 
        });
        
        if (prompt.length > 150) score += 0.2;
        
        return Math.min(score, 1.0);
    }
    
    static recommendQualityMode(prompt, model) {
        if (CONFIG.SPEED_OPTIMIZATION?.use_faster_models) {
            if (model === 'turbo' || model === 'zimage') return 'economy';
            return 'standard';
        }
        
        const complexity = this.analyzeComplexity(prompt);
        if (complexity > 0.7) return 'ultra';
        if (complexity > 0.4) return 'standard';
        return 'economy';
    }
}

class HDOptimizer {
    static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'economy', autoHD = true) {
        if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled || CONFIG.SPEED_OPTIMIZATION?.reduce_hd_processing) {
            return { 
                prompt: prompt, 
                negativePrompt: negativePrompt, 
                width: width, 
                height: height, 
                optimized: false 
            };
        }
        
        const hdConfig = CONFIG.HD_OPTIMIZATION;
        const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.economy;
        
        let enhancedPrompt = prompt;
        
        if (qualityMode === 'ultra') {
            const hdLevel = modeConfig.hd_level;
            const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
            enhancedPrompt = prompt + ", " + hdBoost;
        }
        
        let enhancedNegative = negativePrompt || "";
        if (qualityMode === 'ultra' && !negativePrompt) {
            enhancedNegative = hdConfig.HD_NEGATIVE;
        }
        
        return { 
            prompt: enhancedPrompt, 
            negativePrompt: enhancedNegative, 
            width: width, 
            height: height, 
            optimized: true, 
            quality_mode: qualityMode 
        };
    }
}

class ParameterOptimizer {
    static optimizeSteps(model, width, height, style, qualityMode = 'economy') {
        const modelConfig = CONFIG.MODELS[model];
        if (!modelConfig) return 20;
        
        let baseSteps = modelConfig.default_steps;
        
        if (CONFIG.SPEED_OPTIMIZATION?.use_faster_models) {
            return Math.max(Math.round(baseSteps * 0.7), modelConfig.default_steps * 0.5);
        }
        
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const multiplier = modeConfig?.steps_multiplier || 0.85;
        
        return Math.max(Math.round(baseSteps * multiplier), modelConfig.default_steps * 0.7);
    }
    
    static optimizeGuidance(model, style, qualityMode = 'economy') {
        const modelConfig = CONFIG.MODELS[model];
        if (!modelConfig) return 5;
        
        return modelConfig.default_guidance;
    }
}

class StyleProcessor {
    static applyStyle(prompt, negativePrompt, styleName) {
        if (!styleName || styleName === 'none' || !CONFIG.STYLES[styleName]) {
            return { prompt: prompt, negativePrompt: negativePrompt || "" };
        }
        
        const style = CONFIG.STYLES[styleName];
        const enhancedPrompt = style.prompt ? prompt + ", " + style.prompt : prompt;
        const enhancedNegative = negativePrompt || "";
        const finalNegative = style.negative ? 
            (enhancedNegative ? enhancedNegative + ", " + style.negative : style.negative) : 
            enhancedNegative;
        
        return { prompt: enhancedPrompt, negativePrompt: finalNegative };
    }
}

// ===========================
// 翻譯函數
// ===========================

async function translateToEnglish(text, env) {
    try {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
        
        if (CONFIG.SPEED_OPTIMIZATION?.cache_translations && translationCache.has(text)) {
            const cached = translationCache.get(text);
            console.log("✅ Translation from cache");
            return { ...cached, cached: true };
        }
        
        if (!env || !env.AI) {
            console.warn("⚠️ Workers AI not configured");
            return { text: text, translated: false, reason: "AI not configured" };
        }
        
        try {
            const response = await env.AI.run("@cf/meta/m2m100", { 
                text: text, 
                source_lang: "chinese", 
                target_lang: "english" 
            });
            
            if (response && response.translated_text) {
                const result = { 
                    text: response.translated_text, 
                    translated: true, 
                    original: text 
                };
                
                if (CONFIG.SPEED_OPTIMIZATION?.cache_translations) {
                    if (translationCache.size >= MAX_CACHE_SIZE) {
                        const firstKey = translationCache.keys().next().value;
                        translationCache.delete(firstKey);
                    }
                    translationCache.set(text, result);
                }
                
                return result;
            }
        } catch (primaryError) {
            console.warn("⚠️ Translation failed, using original");
            return { text: text, translated: false, reason: "Translation failed" };
        }
        
        return { text: text, translated: false };
    } catch (error) {
        console.error("❌ translateToEnglish error:", error);
        return { text: text, translated: false, error: error.message };
    }
}

// ===========================
// 工具函數
// ===========================

class GenerationLogger {
    constructor() {
        this.logs = [];
        this.startTime = Date.now();
    }
    
    add(step, details = {}) {
        this.logs.push({
            step: step,
            details: details,
            timestamp: Date.now() - this.startTime
        });
    }
    
    getAll() {
        return this.logs;
    }
    
    getSummary() {
        return {
            total_time: Date.now() - this.startTime,
            steps: this.logs.length,
            logs: this.logs
        };
    }
}

function fetchWithTimeout(url, options = {}, timeout = 120000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timeout'));
        }, timeout);
        
        fetch(url, options)
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(err => {
                clearTimeout(timer);
                reject(err);
            });
    });
}
// ===========================
// Provider 類
// ===========================

class PollinationsProvider {
    constructor(apiKey = null) {
        this.baseUrl = "https://image.pollinations.ai/prompt";
        this.apiKey = apiKey;
    }
    
    buildUrl(prompt, options) {
        const {
            model = 'flux',
            width = 1024,
            height = 1024,
            seed = -1,
            negative_prompt = '',
            nologo = true,
            enhance = false,
            steps = null,
            guidance = null,
            image_urls = []
        } = options;
        
        const modelConfig = CONFIG.MODELS[model];
        if (!modelConfig) {
            throw new Error(`Unknown model: ${model}`);
        }
        
        const apiModel = modelConfig.api_name;
        const finalSteps = steps || modelConfig.default_steps;
        const finalGuidance = guidance || modelConfig.default_guidance;
        
        let url = `${this.baseUrl}/${encodeURIComponent(prompt)}`;
        url += `?model=${apiModel}`;
        url += `&width=${width}&height=${height}`;
        url += `&seed=${seed}`;
        url += `&nologo=${nologo}`;
        url += `&enhance=${enhance}`;
        url += `&steps=${finalSteps}`;
        url += `&guidance=${finalGuidance}`;
        
        if (modelConfig.supports_negative && negative_prompt) {
            url += `&negative=${encodeURIComponent(negative_prompt)}`;
        }
        
        if (modelConfig.supports_image_input && image_urls && image_urls.length > 0) {
            image_urls.forEach((imgUrl, index) => {
                url += `&image${index > 0 ? index + 1 : ''}=${encodeURIComponent(imgUrl)}`;
            });
        }
        
        return url;
    }
    
    async generate(prompt, options, logger) {
        const model = options.model || CONFIG.DEFAULT_MODEL;
        const url = this.buildUrl(prompt, options);
        
        logger.add("🔗 API URL Built", { model: model, url: url.substring(0, 100) + "..." });
        
        const headers = {};
        if (this.apiKey && CONFIG.POLLINATIONS_AUTH.enabled) {
            headers[CONFIG.POLLINATIONS_AUTH.header_name] = this.apiKey;
            logger.add("🔐 API Key Added", { key_length: this.apiKey.length });
        }
        
        const metadata = {
            model: model,
            width: options.width,
            height: options.height,
            seed: options.seed,
            steps: options.steps,
            guidance: options.guidance
        };
        
        for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
            try {
                const response = await fetchWithTimeout(url, { 
                    method: 'GET', 
                    headers: headers
                }, CONFIG.FETCH_TIMEOUT);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const blob = await response.blob();
                const arrayBuffer = await blob.arrayBuffer();
                
                logger.add("✅ Image Generated", { 
                    model: model, 
                    size: arrayBuffer.byteLength + " bytes",
                    retry: retry 
                });
                
                return { 
                    success: true, 
                    imageData: arrayBuffer, 
                    metadata: metadata 
                };
                
            } catch (e) {
                logger.add("❌ Request Failed", { 
                    error: e.message, 
                    model: model, 
                    retry: retry + 1 
                });
                
                if (retry < CONFIG.MAX_RETRIES - 1) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }
        }
        
        throw new Error(`Failed after ${CONFIG.MAX_RETRIES} retries`);
    }
}

class MultiProviderRouter {
    constructor(apiKey = null) {
        this.providers = {
            pollinations: new PollinationsProvider(apiKey)
        };
        this.defaultProvider = 'pollinations';
    }
    
    getProvider(name = null) {
        const providerName = name || this.defaultProvider;
        const provider = this.providers[providerName];
        if (!provider) {
            throw new Error(`Unknown provider: ${providerName}`);
        }
        return { name: providerName, instance: provider };
    }
    
    async generate(prompt, options, logger) {
        const { provider: requestedProvider = null, numOutputs = 1 } = options;
        const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
        
        logger.add("🎯 Using Provider", { provider: providerName, outputs: numOutputs });
        
        if (numOutputs > 1 && CONFIG.SPEED_OPTIMIZATION?.parallel_requests) {
            logger.add("⚡ Parallel Generation", { count: numOutputs });
            
            const promises = [];
            for (let i = 0; i < numOutputs; i++) {
                const currentOptions = { 
                    ...options, 
                    seed: options.seed === -1 ? -1 : options.seed + i 
                };
                promises.push(provider.generate(prompt, currentOptions, logger));
            }
            
            const results = await Promise.all(promises);
            return results;
        }
        
        const results = [];
        for (let i = 0; i < numOutputs; i++) {
            const currentOptions = { 
                ...options, 
                seed: options.seed === -1 ? -1 : options.seed + i 
            };
            const result = await provider.generate(prompt, currentOptions, logger);
            results.push(result);
        }
        return results;
    }
}
// ===========================
// 主處理函數
// ===========================

async function handleGenerate(request, env) {
    const logger = new GenerationLogger();
    
    try {
        let body;
        try {
            body = await request.json();
        } catch (jsonError) {
            return new Response(JSON.stringify({ 
                error: 'Invalid JSON in request body',
                detail: jsonError.message
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        logger.add("📥 Request Received", { body: JSON.stringify(body).substring(0, 200) });
        
        let { 
            prompt, 
            model, 
            width, 
            height, 
            seed, 
            negative_prompt, 
            style, 
            quality_mode, 
            auto_hd,
            num_outputs,
            image_urls
        } = body;
        
        if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
            return new Response(JSON.stringify({ 
                error: 'Invalid or missing prompt',
                received: prompt,
                logs: logger.getAll() 
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        model = model || CONFIG.DEFAULT_MODEL;
        if (!CONFIG.MODELS[model]) {
            return new Response(JSON.stringify({ 
                error: 'Invalid model',
                received: model,
                available: Object.keys(CONFIG.MODELS)
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        width = parseInt(width);
        height = parseInt(height);
        if (isNaN(width) || isNaN(height) || width < 256 || height < 256 || width > 2048 || height > 2048) {
            return new Response(JSON.stringify({ 
                error: 'Invalid dimensions',
                width: width,
                height: height,
                allowed: '256-2048'
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
        seed = parseInt(seed);
        if (isNaN(seed)) seed = -1;
        
        quality_mode = quality_mode || 'economy';
        if (!CONFIG.HD_OPTIMIZATION.QUALITY_MODES[quality_mode]) {
            quality_mode = 'economy';
        }
        
        auto_hd = auto_hd !== undefined ? Boolean(auto_hd) : true;
        
        num_outputs = parseInt(num_outputs);
        if (isNaN(num_outputs) || num_outputs < 1 || num_outputs > 4) {
            num_outputs = 1;
        }
        
        logger.add("✅ Parameters Validated", { 
            model: model, 
            size: `${width}x${height}`, 
            quality: quality_mode,
            outputs: num_outputs
        });
        
        const translationResult = await translateToEnglish(prompt, env);
        const finalPrompt = translationResult.text;
        logger.add("🌐 Translation", { 
            translated: translationResult.translated,
            cached: translationResult.cached || false,
            original: translationResult.original?.substring(0, 50),
            result: finalPrompt.substring(0, 50)
        });
        
        const styleResult = StyleProcessor.applyStyle(finalPrompt, negative_prompt, style);
        logger.add("🎨 Style Applied", { style: style || 'none' });
        
        const hdResult = HDOptimizer.optimize(
            styleResult.prompt, 
            styleResult.negativePrompt, 
            model, 
            width, 
            height, 
            quality_mode, 
            auto_hd
        );
        logger.add("🔧 HD Optimization", { 
            optimized: hdResult.optimized,
            quality_mode: quality_mode,
            final_size: `${hdResult.width}x${hdResult.height}`
        });
        
        const optimizedSteps = ParameterOptimizer.optimizeSteps(model, hdResult.width, hdResult.height, style, quality_mode);
        const optimizedGuidance = ParameterOptimizer.optimizeGuidance(model, style, quality_mode);
        logger.add("⚙️ Parameters Optimized", { 
            steps: optimizedSteps, 
            guidance: optimizedGuidance 
        });
        
        const apiKey = env.POLLINATIONS_API_KEY || null;
        const router = new MultiProviderRouter(apiKey);
        
        const generateOptions = {
            model: model,
            width: hdResult.width,
            height: hdResult.height,
            seed: seed,
            negative_prompt: hdResult.negativePrompt,
            steps: optimizedSteps,
            guidance: optimizedGuidance,
            image_urls: image_urls,
            numOutputs: num_outputs
        };
        
        const results = await router.generate(hdResult.prompt, generateOptions, logger);
        
        if (num_outputs === 1) {
            const result = results[0];
            
            return new Response(result.imageData, {
                headers: {
                    'Content-Type': 'image/png',
                    'Content-Disposition': 'inline; filename="generated-image.png"',
                    'X-Model': result.metadata.model,
                    'X-Seed': String(result.metadata.seed),
                    'X-Width': String(result.metadata.width),
                    'X-Height': String(result.metadata.height),
                    'X-Generation-Time': String(Date.now() - logger.startTime) + 'ms',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } else {
            const imageDataArray = results.map((result, index) => ({
                image: arrayBufferToBase64(result.imageData),
                metadata: result.metadata
            }));
            
            return new Response(JSON.stringify({
                success: true,
                count: results.length,
                data: imageDataArray,
                logs: logger.getSummary()
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        
    } catch (error) {
        console.error('Generation error:', error);
        logger.add("❌ Fatal Error", { error: error.message, stack: error.stack });
        
        return new Response(JSON.stringify({ 
            error: error.message,
            type: error.name,
            logs: logger.getAll() 
        }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// ===========================
// Worker 主入口
// ===========================

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept',
                    'Access-Control-Max-Age': '86400'
                }
            });
        }
        
        if (url.pathname === '/generate' && request.method === 'POST') {
            return handleGenerate(request, env);
        }
        
        if (url.pathname === '/' || url.pathname === '' || url.pathname === '/index.html') {
            return new Response(getHTML(), {
                headers: { 
                    'Content-Type': 'text/html;charset=UTF-8',
                    'Cache-Control': 'no-cache'
                }
            });
        }
        
        return new Response(JSON.stringify({ 
            error: 'Not Found',
            path: url.pathname,
            method: request.method
        }), { 
            status: 404,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};
function getHTML() {
    return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flux AI Pro - v9.5.3 極速版</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .header .subtitle {
            font-size: 1.1em;
            opacity: 0.95;
        }
        .version-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-top: 10px;
            backdrop-filter: blur(10px);
        }
        .main-content {
            display: grid;
            grid-template-columns: 320px 1fr 320px;
            gap: 20px;
            padding: 30px;
        }
        .panel {
            background: #f9fafb;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }
        .panel h2 {
            font-size: 1.3em;
            margin-bottom: 20px;
            color: #1f2937;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #374151;
            font-weight: 600;
            font-size: 0.95em;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 0.95em;
            transition: all 0.3s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .form-group textarea {
            resize: vertical;
            min-height: 100px;
            font-family: inherit;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
        }
        .checkbox-group input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        .btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .results-container {
            min-height: 400px;
        }
        #results {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }
        .image-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        .image-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        .image-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            cursor: pointer;
        }
        .image-card .info {
            padding: 12px;
            font-size: 0.85em;
            color: #6b7280;
        }
        .image-card .actions {
            padding: 0 12px 12px;
            display: flex;
            gap: 8px;
        }
        .image-card .actions button {
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.2s;
        }
        .btn-download {
            background: #10b981;
            color: white;
        }
        .btn-download:hover {
            background: #059669;
        }
        .loading {
            text-align: center;
            padding: 60px 40px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 12px;
            border: 2px dashed #3b82f6;
        }
        .loading .spinner {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            border-width: 4px;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        .loading #countdown {
            animation: pulse 1.5s ease-in-out infinite;
            display: inline-block;
        }
        #progressBar {
            transition: width 1s linear;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        .input-hint {
            font-size: 0.85em;
            color: #6b7280;
            margin-top: 5px;
        }
        .success-banner {
            animation: slideDown 0.5s ease-out;
        }
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        }
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification.success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        .notification.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        @media (max-width: 1200px) {
            .main-content { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Flux AI Pro</h1>
            <div class="subtitle">專業 AI 圖像生成服務</div>
            <div class="version-badge">⚡ v9.5.3-speed-ultra | 極速模式</div>
        </div>
        
        <div class="main-content">
            <div class="panel">
                <h2>⚙️ 生成參數</h2>
                <form id="generateForm">
                    <div class="form-group">
                        <label for="model">🤖 AI 模型</label>
                        <select id="model" required>
                            <optgroup label="⚡ 極速模式（推薦）">
                                <option value="turbo" selected>Flux Turbo ⚡ (3-5秒)</option>
                                <option value="zimage">Z-Image Turbo ⚡ (2-4秒)</option>
                            </optgroup>
                            <optgroup label="🎨 標準模式">
                                <option value="flux">Flux 標準版 (6-10秒)</option>
                            </optgroup>
                            <optgroup label="🖼️ 專業模式">
                                <option value="kontext">Kontext 🎨 (12-18秒)</option>
                            </optgroup>
                        </select>
                        <div class="input-hint">⚡ 極速配置已啟用</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="sizePreset">📐 圖片尺寸</label>
                        <select id="sizePreset">
                            <option value="1024x1024" selected>方形 1024x1024</option>
                            <option value="768x1024">豎屏 3:4</option>
                            <option value="1080x1920">豎屏 9:16</option>
                            <option value="1024x768">橫屏 4:3</option>
                            <option value="1920x1080">橫屏 16:9</option>
                        </select>
                        <input type="hidden" id="width" value="1024">
                        <input type="hidden" id="height" value="1024">
                    </div>
                    
                    <div class="form-group">
                        <label for="style">🎨 藝術風格</label>
                        <select id="style">
                            <option value="none" selected>無風格</option>
                            <option value="anime">動漫風格 ✨</option>
                            <option value="realistic">寫實照片 📷</option>
                            <option value="oil">油畫 🎨</option>
                            <option value="watercolor">水彩畫 💧</option>
                            <option value="cyberpunk">賽博朋克 🌃</option>
                            <option value="fantasy">奇幻風格 🐉</option>
                            <option value="ghibli">吉卜力風格 🍃</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="qualityMode">💎 質量模式</label>
                        <select id="qualityMode">
                            <option value="economy" selected>經濟模式（最快）</option>
                            <option value="standard">標準模式</option>
                            <option value="ultra">超高清模式</option>
                        </select>
                        <div class="input-hint">💡 推薦經濟模式獲得最快速度</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="seed">🎲 隨機種子</label>
                        <input type="number" id="seed" value="-1" min="-1">
                        <div class="input-hint">-1 = 隨機生成</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="numOutputs">🖼️ 生成數量</label>
                        <select id="numOutputs">
                            <option value="1" selected>1 張</option>
                            <option value="2">2 張</option>
                            <option value="3">3 張</option>
                            <option value="4">4 張</option>
                        </select>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="autoHD" checked>
                        <label for="autoHD">✨ 自動 HD 優化</label>
                    </div>
                    
                    <button type="submit" class="btn" id="generateBtn">
                        <span style="font-size: 20px;">✨</span> 開始生成
                    </button>
                </form>
            </div>
            
            <div class="panel results-container">
                <h2>🖼️ 生成結果</h2>
                <div id="results">
                    <div style="text-align: center; padding: 60px 20px; color: #9ca3af;">
                        <p style="font-size: 3em; margin-bottom: 15px;">🎨</p>
                        <p style="font-size: 1.1em; font-weight: 600; margin-bottom: 8px;">準備開始創作</p>
                        <p style="font-size: 0.9em;">輸入提示詞，點擊生成按鈕開始</p>
                    </div>
                </div>
            </div>
            
            <div class="panel">
                <h2>💭 提示詞</h2>
                <div class="form-group">
                    <label for="prompt">✨ 正面提示詞（必填）</label>
                    <textarea id="prompt" placeholder="描述你想要生成的圖像..." required></textarea>
                    <div class="input-hint">💡 支持中文，會自動翻譯</div>
                </div>
                
                <div class="form-group">
                    <label for="negativePrompt">🚫 負面提示詞（可選）</label>
                    <textarea id="negativePrompt" placeholder="描述你不想要的元素..." rows="3"></textarea>
                    <div class="input-hint">排除不需要的元素</div>
                </div>
                
                <div class="form-group">
                    <label for="imageUrls">🖼️ 參考圖像 URL（Kontext 專用）</label>
                    <textarea id="imageUrls" placeholder="每行一個圖片URL..." rows="3"></textarea>
                    <div class="input-hint">僅 Kontext 模型支持</div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const form = document.getElementById('generateForm');
        const generateBtn = document.getElementById('generateBtn');
        const resultsDiv = document.getElementById('results');
        const sizePreset = document.getElementById('sizePreset');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        
        // 尺寸預設監聽
        sizePreset.addEventListener('change', function() {
            const [w, h] = this.value.split('x');
            widthInput.value = w;
            heightInput.value = h;
        });
        
        // 工具函數
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification ' + type;
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }
        
        function showSuccess(message) {
            showNotification(message, 'success');
        }
        
        function showError(message) {
            showNotification(message, 'error');
        }
        
        function base64ToBlob(base64, mimeType) {
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        }
        
        function createImageCard(imageUrl, metadata, index) {
            const card = document.createElement('div');
            card.className = 'image-card';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Generated Image ' + (index + 1);
            img.onclick = function() {
                window.open(imageUrl, '_blank');
            };
            
            const info = document.createElement('div');
            info.className = 'info';
            info.innerHTML = '📊 Model: ' + metadata.model + '<br>🎲 Seed: ' + metadata.seed + '<br>📐 Size: ' + metadata.width + 'x' + metadata.height;
            
            const actions = document.createElement('div');
            actions.className = 'actions';
            
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'btn-download';
            downloadBtn.textContent = '💾 下載';
            downloadBtn.onclick = function() {
                const a = document.createElement('a');
                a.href = imageUrl;
                a.download = 'flux-ai-' + Date.now() + '.png';
                a.click();
            };
            
            actions.appendChild(downloadBtn);
            card.appendChild(img);
            card.appendChild(info);
            card.appendChild(actions);
            
            return card;
        }
        
        function saveToHistory(data) {
            try {
                let history = JSON.parse(localStorage.getItem('flux_history') || '[]');
                history.unshift(data);
                if (history.length > 100) history = history.slice(0, 100);
                localStorage.setItem('flux_history', JSON.stringify(history));
            } catch (e) {
                console.error('Failed to save history:', e);
            }
        }
        
        // 表單提交處理
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const prompt = document.getElementById('prompt').value;
            if (!prompt.trim()) {
                alert('請輸入提示詞');
                return;
            }
            
            const model = document.getElementById('model').value;
            const numOutputs = parseInt(document.getElementById('numOutputs').value);
            const width = parseInt(document.getElementById('width').value);
            const height = parseInt(document.getElementById('height').value);
            const seed = parseInt(document.getElementById('seed').value);
            const negativePrompt = document.getElementById('negativePrompt').value;
            const style = document.getElementById('style').value;
            const qualityMode = document.getElementById('qualityMode').value;
            const autoHD = document.getElementById('autoHD').checked;
            const imageUrls = document.getElementById('imageUrls').value;
            
            // 計算預估時間
            let estimatedTimePerImage = 5;
            if (model === 'turbo') estimatedTimePerImage = 4;
            if (model === 'zimage') estimatedTimePerImage = 3;
            if (model === 'flux') estimatedTimePerImage = 8;
            if (model === 'kontext') estimatedTimePerImage = 16;
            
            if (qualityMode === 'ultra') estimatedTimePerImage = Math.round(estimatedTimePerImage * 1.3);
            if (qualityMode === 'economy') estimatedTimePerImage = Math.round(estimatedTimePerImage * 0.8);
            
            const totalEstimatedTime = estimatedTimePerImage * numOutputs;
            
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<div class="spinner"></div>生成中...';
            
            // 創建倒計時界面
            let remainingTime = totalEstimatedTime;
            let countdown;
            
            resultsDiv.innerHTML = \`
                <div class="loading">
                    <div class="spinner"></div>
                    <p style="font-size: 18px; font-weight: 600; margin: 20px 0 10px 0;">
                        正在生成圖像，請稍候...
                    </p>
                    <p style="font-size: 24px; font-weight: 700; color: #3b82f6; margin: 10px 0;">
                        <span id="countdown">\${remainingTime}</span> 秒
                    </p>
                    <div style="width: 100%; max-width: 400px; height: 8px; background: #e5e7eb; border-radius: 4px; margin: 20px auto; overflow: hidden;">
                        <div id="progressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 1s linear;"></div>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 15px;">
                        📊 模型: \${model.toUpperCase()} | 數量: \${numOutputs} 張 | 質量: \${qualityMode}
                    </p>
                    <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                        💡 預計時間: \${totalEstimatedTime} 秒（單張約 \${estimatedTimePerImage} 秒）
                    </p>
                </div>
            \`;
            
            const countdownElement = document.getElementById('countdown');
            const progressBar = document.getElementById('progressBar');
            const startTime = Date.now();
            
            countdown = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                remainingTime = Math.max(0, totalEstimatedTime - elapsed);
                const progress = Math.min(100, (elapsed / totalEstimatedTime) * 100);
                
                if (countdownElement) {
                    countdownElement.textContent = remainingTime;
                }
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
                
                if (remainingTime <= 0) {
                    clearInterval(countdown);
                    if (countdownElement) {
                        countdownElement.textContent = '即將完成';
                        countdownElement.style.color = '#10b981';
                    }
                }
            }, 1000);
            
            try {
                const requestBody = {
                    prompt: prompt,
                    model: model,
                    width: width,
                    height: height,
                    seed: seed,
                    negative_prompt: negativePrompt || undefined,
                    style: style !== 'none' ? style : undefined,
                    quality_mode: qualityMode,
                    auto_hd: autoHD,
                    num_outputs: numOutputs,
                    image_urls: imageUrls ? imageUrls.split('\\n').map(url => url.trim()).filter(url => url) : undefined
                };
                
                console.log('===== 請求詳情 =====');
                console.log('URL:', window.location.origin + '/generate');
                console.log('Body:', JSON.stringify(requestBody, null, 2));
                console.log('==================');
                
                const response = await fetch('/generate', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json, image/png'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                clearInterval(countdown);
                
                console.log('===== 響應詳情 =====');
                console.log('Status:', response.status);
                console.log('StatusText:', response.statusText);
                console.log('==================');
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('❌ Error Response:', errorText);
                    throw new Error(\`HTTP \${response.status}: \${errorText}\`);
                }
                
                const contentType = response.headers.get('Content-Type');
                
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    
                    if (result.success && result.data && result.data.length > 0) {
                        resultsDiv.innerHTML = '';
                        
                        const successBanner = document.createElement('div');
                        successBanner.className = 'success-banner';
                        successBanner.style.cssText = 'background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600;';
                        const actualTime = Math.floor((Date.now() - startTime) / 1000);
                        successBanner.innerHTML = \`
                            ✅ 生成完成！共 \${result.data.length} 張圖片
                            <span style="font-size: 12px; opacity: 0.9; display: block; margin-top: 5px;">
                                ⏱️ 實際用時: \${actualTime} 秒 | 預計: \${totalEstimatedTime} 秒
                            </span>
                        \`;
                        resultsDiv.appendChild(successBanner);
                        
                        result.data.forEach((item, index) => {
                            const blob = base64ToBlob(item.image, 'image/png');
                            const imageUrl = URL.createObjectURL(blob);
                            
                            const imgCard = createImageCard(imageUrl, item.metadata, index);
                            resultsDiv.appendChild(imgCard);
                            
                            saveToHistory({
                                imageUrl: imageUrl,
                                prompt: prompt,
                                metadata: item.metadata,
                                timestamp: Date.now()
                            });
                        });
                        
                        showSuccess('🎉 圖像生成成功！');
                    } else {
                        throw new Error('Invalid response data');
                    }
                } else {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    
                    const metadata = {
                        model: response.headers.get('X-Model') || model,
                        seed: response.headers.get('X-Seed') || seed,
                        width: response.headers.get('X-Width') || width,
                        height: response.headers.get('X-Height') || height
                    };
                    
                    resultsDiv.innerHTML = '';
                    
                    const successBanner = document.createElement('div');
                    successBanner.className = 'success-banner';
                    successBanner.style.cssText = 'background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: 600;';
                    const actualTime = Math.floor((Date.now() - startTime) / 1000);
                    successBanner.innerHTML = \`
                        ✅ 生成完成！
                        <span style="font-size: 12px; opacity: 0.9; display: block; margin-top: 5px;">
                            ⏱️ 實際用時: \${actualTime} 秒 | 預計: \${totalEstimatedTime} 秒
                        </span>
                    \`;
                    resultsDiv.appendChild(successBanner);
                    
                    const imgCard = createImageCard(imageUrl, metadata, 0);
                    resultsDiv.appendChild(imgCard);
                    
                    saveToHistory({
                        imageUrl: imageUrl,
                        prompt: prompt,
                        metadata: metadata,
                        timestamp: Date.now()
                    });
                    
                    showSuccess('🎉 圖像生成成功！');
                }
                
            } catch (error) {
                console.error('Generation error:', error);
                clearInterval(countdown);
                resultsDiv.innerHTML = \`
                    <div style="background: #fee; border: 1px solid #fcc; padding: 20px; border-radius: 8px; color: #c33;">
                        <p style="font-weight: 600; margin-bottom: 10px;">❌ 生成失敗</p>
                        <p style="font-size: 14px; margin-bottom: 10px;">\${error.message}</p>
                        <p style="font-size: 12px; color: #999;">請打開開發者工具查看詳細日誌</p>
                    </div>
                \`;
                showError('生成失敗: ' + error.message);
            } finally {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span style="font-size: 20px;">✨</span> 開始生成';
            }
        });
    </script>
</body>
</html>
`;
}
// ===========================
// 第 6 段：結束標記
// ===========================

// 文件結束
// worker.js 完整代碼到此結束
// 
// 部署命令:
// wrangler deploy
//
// 本地測試:
// wrangler dev
//
// 查看日誌:
// wrangler tail
