import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================
// BEST FEMALE VOICES FOR EACH LANGUAGE
// Selected for warm, friendly, attractive tone
// ============================================

interface VoiceConfig {
  languageCode: string;
  name: string;
  ssmlGender: 'FEMALE';
  speakingRate: number;
  pitch: number;
}

const FEMALE_VOICES: Record<string, VoiceConfig> = {
  // 🇩🇰 Danish - Warm, professional Danish woman
  da: {
    languageCode: 'da-DK',
    name: 'da-DK-Wavenet-D',  // Female, most natural Danish voice
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,  // Slightly higher for warmth
  },
  
  // 🇬🇧 English - Sophisticated British woman
  en: {
    languageCode: 'en-GB',
    name: 'en-GB-Neural2-C',  // British female, warm and professional
    ssmlGender: 'FEMALE',
    speakingRate: 1.05,
    pitch: 1.5,
  },
  
  // 🇺🇸 English US - Alternative warm American voice
  en_us: {
    languageCode: 'en-US',
    name: 'en-US-Neural2-F',  // American female, friendly and warm
    ssmlGender: 'FEMALE',
    speakingRate: 1.05,
    pitch: 1.0,
  },
  
  // 🇫🇷 French - Elegant Parisian woman
  fr: {
    languageCode: 'fr-FR',
    name: 'fr-FR-Neural2-A',  // French female, sophisticated
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇸🇪 Swedish - Friendly Swedish woman
  sv: {
    languageCode: 'sv-SE',
    name: 'sv-SE-Wavenet-A',  // Swedish female, clear and friendly
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇳🇱 Dutch - Warm Dutch woman
  nl: {
    languageCode: 'nl-NL',
    name: 'nl-NL-Wavenet-A',  // Dutch female, friendly
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇩🇪 German - Professional German woman
  de: {
    languageCode: 'de-DE',
    name: 'de-DE-Neural2-C',  // German female, warm and professional
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇪🇸 Spanish - Warm Spanish woman
  es: {
    languageCode: 'es-ES',
    name: 'es-ES-Neural2-A',  // Spanish female, friendly
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇮🇹 Italian - Elegant Italian woman
  it: {
    languageCode: 'it-IT',
    name: 'it-IT-Neural2-A',  // Italian female, warm
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇵🇱 Polish - Friendly Polish woman
  pl: {
    languageCode: 'pl-PL',
    name: 'pl-PL-Wavenet-A',  // Polish female
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇵🇹 Portuguese - Warm Portuguese woman
  pt: {
    languageCode: 'pt-PT',
    name: 'pt-PT-Wavenet-A',  // Portuguese female
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇳🇴 Norwegian - Friendly Norwegian woman
  no: {
    languageCode: 'nb-NO',
    name: 'nb-NO-Wavenet-A',  // Norwegian female
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
  
  // 🇫🇮 Finnish - Clear Finnish woman
  fi: {
    languageCode: 'fi-FI',
    name: 'fi-FI-Wavenet-A',  // Finnish female
    ssmlGender: 'FEMALE',
    speakingRate: 1.0,
    pitch: 1.0,
  },
};

// ============================================
// LANGUAGE DETECTION
// ============================================

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();
  
  // 🇩🇰 Danish - Check first (your primary market!)
  if (/[æøå]/.test(text)) return 'da';
  if (/\b(hej|hvad|hvordan|jeg|kan|vil|har|er|det|en|og|til|med|på|af|ikke|som|for|men|om|eller|min|din|vi|dem|os|være|blive|meget|også|efter|før|nu|her|der|hvor|når|tak|goddag|farvel|undskyld|venligst|hjælp|virksomhed|arbejde|kunde|pris|tilbud|velkommen)\b/.test(lower)) {
    return 'da';
  }
  
  // 🇫🇷 French
  if (/[éèêëàâçùûüôîï]/.test(text) && !/[æøå]/.test(text)) return 'fr';
  if (/\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|et|est|sont|être|avoir|faire|bonjour|merci|oui|non|comment|pourquoi|quoi|quand|où|qui|avec|pour|dans|sur|très|bien|tout)\b/.test(lower)) {
    return 'fr';
  }
  
  // 🇸🇪 Swedish (check before Norwegian - similar)
  if (/[äö]/.test(text) && !/[æø]/.test(text)) return 'sv';
  if (/\b(jag|du|han|hon|vi|de|och|är|har|kan|ska|vill|att|det|en|ett|som|för|med|på|till|av|inte|om|men|så|bara|eller|när|hur|vad|var|tack|hej)\b/.test(lower)) {
    return 'sv';
  }
  
  // 🇳🇴 Norwegian
  if (/\b(jeg|du|han|hun|vi|dere|og|er|har|kan|skal|vil|at|det|en|ei|som|for|med|på|til|av|ikke|om|men|så|bare|eller|når|hvordan|hva|hvor|takk|hei)\b/.test(lower)) {
    // Check if more Norwegian than Swedish
    const noWords = lower.match(/\b(hun|dere|ei|hva|takk)\b/g);
    if (noWords && noWords.length > 0) return 'no';
  }
  
  // 🇳🇱 Dutch
  if (/\b(ik|jij|hij|zij|wij|jullie|en|is|zijn|hebben|kunnen|zullen|willen|het|een|de|van|voor|met|op|aan|in|dat|die|wat|hoe|waar|wanneer|hallo|bedankt|ja|nee|goed|graag|alstublieft)\b/.test(lower)) {
    return 'nl';
  }
  
  // 🇩🇪 German
  if (/ß/.test(text)) return 'de';
  if (/\b(ich|du|er|sie|wir|ihr|und|ist|sind|haben|können|werden|wollen|das|ein|eine|der|die|von|für|mit|auf|an|in|nicht|auch|aber|oder|wenn|wie|was|wo|wann|hallo|danke|ja|nein|bitte|guten)\b/.test(lower)) {
    return 'de';
  }
  
  // 🇪🇸 Spanish
  if (/[ñ¿¡]/.test(text)) return 'es';
  if (/\b(yo|tú|él|ella|nosotros|ellos|y|es|son|estar|tener|hacer|hola|gracias|sí|no|cómo|qué|dónde|cuándo|con|para|por|muy|bien|todo)\b/.test(lower)) {
    return 'es';
  }
  
  // 🇮🇹 Italian
  if (/\b(io|tu|lui|lei|noi|loro|e|è|sono|essere|avere|fare|ciao|grazie|sì|no|come|cosa|dove|quando|con|per|molto|bene|tutto)\b/.test(lower)) {
    return 'it';
  }
  
  // 🇵🇱 Polish
  if (/[ąćęłńóśźż]/.test(text)) return 'pl';
  if (/\b(ja|ty|on|ona|my|oni|i|jest|są|być|mieć|cześć|dziękuję|tak|nie|jak|co|gdzie|kiedy|bardzo|dobrze)\b/.test(lower)) {
    return 'pl';
  }
  
  // 🇵🇹 Portuguese
  if (/[ãõ]/.test(text)) return 'pt';
  if (/\b(eu|tu|ele|ela|nós|eles|e|é|são|estar|ter|fazer|olá|obrigado|sim|não|como|que|onde|quando|com|para|muito|bem|tudo)\b/.test(lower)) {
    return 'pt';
  }
  
  // 🇫🇮 Finnish
  if (/\b(minä|sinä|hän|me|he|ja|on|olla|tehdä|hei|kiitos|kyllä|ei|miten|mitä|missä|milloin|kanssa|hyvin)\b/.test(lower)) {
    return 'fi';
  }
  
  // Default: English (British for European audience)
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
    const { text, language: forceLanguage } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!apiKey) {
      console.error('GOOGLE_TTS_API_KEY not found in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

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
            // Add effects for richer sound
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
        details: error 
      });
    }

    const data = await response.json();

    // Return the audio content with language info
    return res.status(200).json({
      audioContent: data.audioContent,
      detectedLanguage: voiceConfig.languageCode,
      voiceUsed: voiceConfig.name,
    });

  } catch (error: any) {
    console.error('Text-to-Speech error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}