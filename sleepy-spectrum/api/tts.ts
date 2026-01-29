import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================
// FEMALE VOICES (ONLY: EN, DA, FR, SV, NL)
// ============================================

interface VoiceConfig {
  languageCode: string;
  name: string;
  ssmlGender: 'FEMALE';
  speakingRate: number;
  pitch: number;
}

const FEMALE_VOICES: Record<string, VoiceConfig> = {
  // 🇩🇰 Danish
  da: {
    languageCode: 'da-DK',
    name: 'da-DK-Wavenet-D',
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

  // 🇫🇷 French
  fr: {
    languageCode: 'fr-FR',
    name: 'fr-FR-Neural2-A',
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },

  // 🇸🇪 Swedish
  sv: {
    languageCode: 'sv-SE',
    name: 'sv-SE-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },

  // 🇳🇱 Dutch
  nl: {
    languageCode: 'nl-NL',
    name: 'nl-NL-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
};

// ============================================
// FORCE LANGUAGE NORMALIZATION
// (accepts "en-US", "en-GB", etc.)
// ============================================

function normalizeForceLanguage(lang?: string): string | undefined {
  if (!lang) return undefined;
  const l = String(lang).trim().toLowerCase();

  // English
  if (l === 'en-us' || l === 'en_us') return 'en_us';
  if (l === 'en-gb' || l === 'en_gb' || l === 'en') return 'en';

  // Other supported languages
  if (l === 'da-dk' || l === 'da') return 'da';
  if (l === 'fr-fr' || l === 'fr') return 'fr';
  if (l === 'sv-se' || l === 'sv') return 'sv';
  if (l === 'nl-nl' || l === 'nl') return 'nl';

  return undefined;
}

// ============================================
// LANGUAGE DETECTION (EN, DA, FR, SV, NL)
// Key fix:
// - Detect FR/SV/NL/EN first
// - Detect Danish LAST and ONLY with strong signals
// ============================================

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();

  // 🇫🇷 French — strong diacritics + common words
  if (/[éèêëàâçùûüôîï]/.test(text)) return 'fr';
  if (
    /\b(je|tu|il|elle|nous|vous|ils|elles|bonjour|merci|comment|pourquoi|quoi|quand|où|avec|pour|dans|très|s’il|c’est)\b/.test(
      lower
    )
  ) {
    return 'fr';
  }

  // 🇸🇪 Swedish — ä/ö are exclusive; include distinctive words
  if (/[äö]/.test(text)) return 'sv';
  if (
    /\b(jag|du|han|hon|vi|de|och|är|kan|ska|vill|att|inte|för|tack|hej|hjälpa|vad|varför|när|hur)\b/.test(
      lower
    )
  ) {
    return 'sv';
  }

  // 🇳🇱 Dutch — require distinctive Dutch words
  if (
    /\b(ik|jij|hij|zij|wij|jullie|niet|wel|graag|alstublieft|bedankt|dankjewel|kun|helpen|wat|hoe|waar|wanneer)\b/.test(
      lower
    )
  ) {
    return 'nl';
  }

  // 🇬🇧 English — detect before Danish to avoid shared short words
  if (
    /\b(i|you|we|they|it|this|that|there|here|what|why|when|where|how|please|thanks|thank|hello|hi|yes|no|good|great|okay|ok|welcome|help|can)\b/.test(
      lower
    )
  ) {
    return 'en';
  }

  // 🇩🇰 Danish — LAST, only strong signals
  // Exclusive letters (NOT å — shared with Swedish)
  if (/[æø]/.test(text)) return 'da';
  // Distinctive Danish words (avoid shared ones like "hej", "kan", "har", "det")
  if (/\b(hvad|hvordan|ikke|gerne|hjælp|velkommen|tak|jeg|dig|jer)\b/.test(lower)) {
    return 'da';
  }

  // Fallback
  return 'en';
}

// ============================================
// GET VOICE CONFIG
// ============================================

function getVoiceConfig(text: string, forceLanguage?: string): VoiceConfig {
  const language = forceLanguage || detectLanguage(text);
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

    // Normalize/accept values like "en-US", "en-GB", etc.
    const forceLanguage = normalizeForceLanguage(language);

    // Get the right voice
    const voiceConfig = getVoiceConfig(text, forceLanguage);

    // Call Google Cloud Text-to-Speech API
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
