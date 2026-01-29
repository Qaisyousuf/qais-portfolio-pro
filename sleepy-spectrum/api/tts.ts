import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================
// FEMALE VOICES (ONLY: DA, FR, EN)
// ============================================

interface VoiceConfig {
  languageCode: string;
  name: string;
  ssmlGender: 'FEMALE';
  speakingRate: number;
  pitch: number;
}

const FEMALE_VOICES: Record<'da' | 'fr' | 'en' | 'en_us', VoiceConfig> = {
  // 🇩🇰 Danish
  da: {
    languageCode: 'da-DK',
    name: 'da-DK-Wavenet-D',
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },

  // 🇫🇷 French
  fr: {
    languageCode: 'fr-FR',
    name: 'fr-FR-Neural2-A',
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },

  // 🇬🇧 English (default)
  en: {
    languageCode: 'en-GB',
    name: 'en-GB-Neural2-C',
    ssmlGender: 'FEMALE',
    speakingRate: 1.05,
    pitch: 1.5,
  },

  // 🇺🇸 English US (optional override)
  en_us: {
    languageCode: 'en-US',
    name: 'en-US-Neural2-F',
    ssmlGender: 'FEMALE',
    speakingRate: 1.05,
    pitch: 1.0,
  },
};

// ============================================
// FORCE LANGUAGE NORMALIZATION
// Accepts: "auto", "en", "en-GB", "en-US", "da", "da-DK", "fr", "fr-FR"
// ============================================

type LangKey = 'da' | 'fr' | 'en' | 'en_us';

function normalizeForceLanguage(lang?: string): LangKey | undefined {
  if (!lang) return undefined;
  const l = String(lang).trim().toLowerCase();

  if (l === 'auto') return undefined;

  if (l === 'en-us' || l === 'en_us') return 'en_us';
  if (l === 'en-gb' || l === 'en_gb' || l === 'en') return 'en';

  if (l === 'da-dk' || l === 'da') return 'da';
  if (l === 'fr-fr' || l === 'fr') return 'fr';

  return undefined;
}

// ============================================
// LANGUAGE DETECTION (DA, FR, EN)
// Notes:
// - Danish: detect by æ/ø (NOT å, shared with other Nordic languages)
// - French: detect by French diacritics + common words
// - Fallback: English
// ============================================

function detectLanguage(text: string): LangKey {
  const lower = text.toLowerCase();

  // 🇩🇰 Danish — exclusive letters first
  if (/[æø]/.test(text)) return 'da';
  // Distinctive Danish words (avoid super-shared ones)
  if (/\b(hvad|hvordan|ikke|gerne|hjælp|velkommen|tak|jeg|dig|jer)\b/.test(lower)) {
    return 'da';
  }

  // 🇫🇷 French — strong diacritics + common words
  if (/[éèêëàâçùûüôîï]/.test(text)) return 'fr';
  if (
    /\b(je|tu|il|elle|nous|vous|ils|elles|bonjour|merci|comment|pourquoi|quoi|quand|où|avec|pour|dans|très|s’il|c’est)\b/.test(
      lower
    )
  ) {
    return 'fr';
  }

  // Default: 🇬🇧 English
  return 'en';
}

// ============================================
// GET VOICE CONFIG
// - If language is provided and recognized, it overrides detection
// - Otherwise detection is used
// ============================================

function getVoiceConfig(text: string, forceLanguage?: LangKey): VoiceConfig {
  const language: LangKey = forceLanguage || detectLanguage(text);
  const voice = FEMALE_VOICES[language] || FEMALE_VOICES['en'];

  console.log(`🎙️ Language key: ${language}`);
  console.log(`🎙️ Using voice: ${voice.name}`);

  return voice;
}

// ============================================
// MAIN HANDLER
// ============================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, language } = req.body as { text?: string; language?: string };

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_TTS_API_KEY not found in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Only override if language is recognized; otherwise auto-detect
    const forceLanguage = normalizeForceLanguage(language);

    const voiceConfig = getVoiceConfig(text, forceLanguage);

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: voiceConfig.languageCode,
            name: voiceConfig.name,
            ssmlGender: voiceConfig.ssmlGender,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: voiceConfig.speakingRate,
            pitch: voiceConfig.pitch,
            effectsProfileId: ['small-bluetooth-speaker-class-device'],
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Google TTS API error:', error);
      return res.status(response.status).json({
        error: 'Failed to generate speech',
        details: error,
      });
    }

    const data = await response.json();

    return res.status(200).json({
      audioContent: data.audioContent,
      detectedLanguage: voiceConfig.languageCode,
      voiceUsed: voiceConfig.name,
    });
  } catch (error: any) {
    console.error('Text-to-Speech error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error?.message ?? String(error),
    });
  }
}
