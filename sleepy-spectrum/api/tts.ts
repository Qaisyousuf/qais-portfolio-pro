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
// (helps if frontend sends "en-US", "en-GB", etc.)
// ============================================

function normalizeForceLanguage(lang?: string): string | undefined {
  if (!lang) return undefined;
  const l = String(lang).trim().toLowerCase();

  // accept common formats
  if (l === 'en-us' || l === 'en_us') return 'en_us';
  if (l === 'en-gb' || l === 'en_gb' || l === 'en') return 'en';
  if (l === 'da-dk' || l === 'da') return 'da';
  if (l === 'fr-fr' || l === 'fr') return 'fr';
  if (l === 'sv-se' || l === 'sv') return 'sv';
  if (l === 'nl-nl' || l === 'nl') return 'nl';

  // if it's some unknown value, ignore it (fallback to detection)
  return undefined;
}

// ============================================
// LANGUAGE DETECTION (EN, DA, FR, SV, NL)
// Important: Detect EN before NL to avoid "is/in" collisions.
// ============================================

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();

  // 🇩🇰 Danish - special chars + common words
  if (/[æøå]/.test(text)) return 'da';
  if (
    /\b(hej|hvad|hvordan|jeg|kan|vil|har|er|det|en|og|til|med|på|af|ikke|som|for|men|om|eller|min|din|vi|dem|os|være|blive|meget|også|efter|før|nu|her|der|hvor|når|tak|goddag|farvel|undskyld|venligst|hjælp|velkommen)\b/.test(
      lower
    )
  ) {
    return 'da';
  }

  // 🇫🇷 French - diacritics + common words
  if (/[éèêëàâçùûüôîï]/.test(text) && !/[æøå]/.test(text)) return 'fr';
  if (
    /\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|et|est|sont|être|avoir|faire|bonjour|merci|oui|non|comment|pourquoi|quoi|quand|où|qui|avec|pour|dans|sur|très|bien|tout)\b/.test(
      lower
    )
  ) {
    return 'fr';
  }

  // 🇸🇪 Swedish (check before NL)
  if (/[äö]/.test(text) && !/[æøå]/.test(text)) return 'sv';
  if (
    /\b(jag|du|han|hon|vi|de|och|är|har|kan|ska|vill|att|det|en|ett|som|för|med|på|till|av|inte|om|men|så|bara|eller|när|hur|vad|var|tack|hej)\b/.test(
      lower
    )
  ) {
    return 'sv';
  }

  // 🇬🇧 English — MUST be before Dutch to avoid false NL matches
  if (
    /\b(i|you|he|she|we|they|it|this|that|there|here|what|why|when|where|how|please|thanks|thank|hello|hi|yes|no|good|great|okay|ok|welcome)\b/.test(
      lower
    )
  ) {
    return 'en';
  }

  // 🇳🇱 Dutch — require distinctive Dutch words (avoid catching English "is/in")
  const nlMatches = lower.match(
    /\b(ik|jij|hij|zij|wij|jullie|niet|wel|ook|maar|omdat|alstublieft|graag|bedankt|dankjewel|goedemorgen|goedenavond|tot|als)\b/g
  );
  if (nlMatches && nlMatches.length >= 1) return 'nl';

  // Default: English (British)
  return 'en';
}

// ============================================
// GET VOICE CONFIG
// ============================================

function getVoiceConfig(text: string, forceLanguage?: string): VoiceConfig {
  const language = forceLanguage || detectLanguage(text);
  const voice = FEMALE_VOICES[language] || FEMALE_VOICES['en'];

  console.log(`🎙️ Detected language: ${language.toUpperCase()}`);
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

    // Get the right voice for this text
    const voiceConfig = getVoiceConfig(text, forceLanguage);

    // Call Google Cloud Text-to-Speech API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: text,
          },
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
