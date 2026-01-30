import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================
// FEMALE VOICES - YOUR 4 LANGUAGES
// Warm, friendly, natural pace
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
    name: 'da-DK-Wavenet-D',
    ssmlGender: 'FEMALE',
    speakingRate: 0.92,
    pitch: 0.5,
  },
  
  // 🇬🇧 English - Sophisticated British woman
  en: {
    languageCode: 'en-GB',
    name: 'en-GB-Neural2-C',
    ssmlGender: 'FEMALE',
    speakingRate: 0.95,
    pitch: 0.5,
  },
  
  // 🇸🇪 Swedish - Friendly Swedish woman
  sv: {
    languageCode: 'sv-SE',
    name: 'sv-SE-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 0.92,
    pitch: 0.5,
  },
  
  // 🇳🇱 Dutch - Warm Dutch woman
  nl: {
    languageCode: 'nl-NL',
    name: 'nl-NL-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 0.92,
    pitch: 0.5,
  },
};

// ============================================
// LANGUAGE DETECTION - OPTIMIZED FOR YOUR 4 LANGUAGES
// Priority: Danish → Swedish → Dutch → English (default)
// ============================================

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();
  
  // =====================
  // 🇩🇰 DANISH DETECTION
  // =====================
  
  // Danish-only characters (not in Swedish)
  if (/[æø]/.test(text)) {
    return 'da';
  }
  
  // Danish-specific words (not used in Swedish/Dutch/English)
  const danishOnlyWords = [
    'jeg', 'dig', 'mig', 'sig', 'og', 'er', 'det', 'en', 'et', 'af', 'til', 'på', 'med', 
    'ikke', 'som', 'har', 'kan', 'vil', 'skal', 'være', 'blive', 'efter', 'eller', 
    'når', 'hvor', 'hvad', 'hvem', 'hvordan', 'hvorfor', 'hej', 'tak', 'goddag', 
    'farvel', 'ja', 'nej', 'meget', 'også', 'bare', 'nu', 'her', 'der', 'denne', 
    'disse', 'nogle', 'alle', 'hver', 'anden', 'andet', 'andre', 'min', 'din', 'sin',
    'vores', 'jeres', 'deres', 'ham', 'hende', 'os', 'dem', 'selv', 'igen', 'altid',
    'aldrig', 'måske', 'fordi', 'hvis', 'så', 'men', 'fra', 'ved', 'om', 'under',
    'over', 'mellem', 'gennem', 'uden', 'inden', 'siden', 'før', 'bag', 'foran',
    'hjælpe', 'hjælp', 'velkommen', 'undskyld', 'venligst', 'gerne', 'godt', 'dårligt',
    'stor', 'lille', 'ny', 'gammel', 'god', 'ond', 'smuk', 'grim', 'let', 'svær',
    'virksomhed', 'firma', 'arbejde', 'kunde', 'pris', 'priser', 'tilbud', 'løsning',
    'spørgsmål', 'svar', 'oplysninger', 'information', 'kontakt', 'email', 'telefon',
    'dag', 'uge', 'måned', 'tid', 'time', 'minut', 'morgen', 'aften', 'nat',
  ];
  
  const danishWordCount = danishOnlyWords.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lower);
  }).length;
  
  if (danishWordCount >= 2) {
    return 'da';
  }
  
  // =====================
  // 🇸🇪 SWEDISH DETECTION
  // =====================
  
  // Swedish-only characters (ä and ö but NOT æ and ø)
  if (/[äö]/.test(text) && !/[æø]/.test(text)) {
    return 'sv';
  }
  
  // Swedish-specific words (not used in Danish/Dutch/English)
  const swedishOnlyWords = [
    'jag', 'du', 'han', 'hon', 'vi', 'de', 'den', 'det', 'och', 'att', 'är', 'var',
    'har', 'hade', 'kan', 'kunde', 'ska', 'skulle', 'vill', 'ville', 'måste', 'får',
    'fick', 'blir', 'blev', 'gör', 'gjorde', 'säger', 'sade', 'kommer', 'kom', 'går',
    'gick', 'ser', 'såg', 'vet', 'visste', 'tror', 'tycker', 'känner', 'hör', 'tar',
    'tog', 'ger', 'gav', 'står', 'stod', 'sitter', 'satt', 'ligger', 'låg',
    'inte', 'om', 'men', 'för', 'på', 'med', 'av', 'till', 'från', 'vid', 'efter',
    'mellan', 'under', 'över', 'genom', 'utan', 'inom', 'mot', 'hos', 'ur', 'åt',
    'hej', 'tack', 'ja', 'nej', 'kanske', 'också', 'bara', 'redan', 'ännu', 'igen',
    'aldrig', 'alltid', 'ofta', 'ibland', 'här', 'där', 'när', 'hur', 'vad', 'vem',
    'var', 'varför', 'vilket', 'vilken', 'vilka', 'denna', 'detta', 'dessa',
    'någon', 'något', 'några', 'ingen', 'inget', 'inga', 'alla', 'allt', 'varje',
    'annan', 'annat', 'andra', 'själv', 'egen', 'eget', 'egna', 'samma', 'sådan',
    'min', 'mitt', 'mina', 'din', 'ditt', 'dina', 'sin', 'sitt', 'sina', 'vår',
    'vårt', 'våra', 'er', 'ert', 'era', 'deras', 'hennes', 'hans',
    'företag', 'arbete', 'kund', 'pris', 'erbjudande', 'lösning', 'hjälp', 'hjälpa',
    'välkommen', 'ursäkta', 'snälla', 'trevlig', 'bra', 'dålig', 'stor', 'liten',
    'ny', 'gammal', 'god', 'ond', 'vacker', 'ful', 'lätt', 'svår',
    'fråga', 'frågor', 'svar', 'information', 'kontakt', 'mejl', 'telefon',
    'dag', 'vecka', 'månad', 'tid', 'timme', 'minut', 'morgon', 'kväll', 'natt',
  ];
  
  const swedishWordCount = swedishOnlyWords.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lower);
  }).length;
  
  if (swedishWordCount >= 2) {
    return 'sv';
  }
  
  // =====================
  // 🇳🇱 DUTCH DETECTION
  // =====================
  
  // Dutch-specific combinations
  if (/ij|oe(?!s\b)|ui(?!t\b)|eu|aa|ee|oo|uu/.test(lower)) {
    // Check for Dutch context
    const hasDutchPattern = /\b(ij|het|een|van|voor)\b/.test(lower);
    if (hasDutchPattern) {
      return 'nl';
    }
  }
  
  // Dutch-specific words (not used in Danish/Swedish/English)
  const dutchOnlyWords = [
    'ik', 'jij', 'hij', 'zij', 'wij', 'jullie', 'het', 'een', 'de', 'en', 'van',
    'voor', 'met', 'op', 'aan', 'in', 'dat', 'die', 'dit', 'deze', 'er', 'maar',
    'als', 'ook', 'nog', 'wel', 'niet', 'naar', 'uit', 'bij', 'tot', 'om', 'dan',
    'wat', 'wie', 'waar', 'wanneer', 'waarom', 'hoe', 'welk', 'welke',
    'hebben', 'heeft', 'had', 'hadden', 'zijn', 'ben', 'bent', 'was', 'waren',
    'worden', 'wordt', 'werd', 'werden', 'kunnen', 'kan', 'kon', 'konden',
    'zullen', 'zal', 'zou', 'zouden', 'willen', 'wil', 'wilde', 'wilden',
    'moeten', 'moet', 'moest', 'moesten', 'mogen', 'mag', 'mocht', 'mochten',
    'gaan', 'gaat', 'ging', 'gingen', 'komen', 'komt', 'kwam', 'kwamen',
    'zien', 'ziet', 'zag', 'zagen', 'doen', 'doet', 'deed', 'deden',
    'maken', 'maakt', 'maakte', 'maakten', 'geven', 'geeft', 'gaf', 'gaven',
    'nemen', 'neemt', 'nam', 'namen', 'zeggen', 'zegt', 'zei', 'zeiden',
    'denken', 'denkt', 'dacht', 'dachten', 'weten', 'weet', 'wist', 'wisten',
    'hallo', 'bedankt', 'dank', 'ja', 'nee', 'alstublieft', 'graag', 'goed',
    'slecht', 'groot', 'klein', 'nieuw', 'oud', 'mooi', 'lelijk', 'makkelijk',
    'moeilijk', 'veel', 'weinig', 'meer', 'minder', 'meest', 'minst',
    'mijn', 'jouw', 'zijn', 'haar', 'ons', 'onze', 'hun', 'uw',
    'iemand', 'niemand', 'iets', 'niets', 'alles', 'allemaal', 'elk', 'elke',
    'ander', 'andere', 'zelf', 'eigen', 'dezelfde', 'hetzelfde', 'zo', 'zulk',
    'bedrijf', 'werk', 'klant', 'prijs', 'prijzen', 'aanbod', 'oplossing',
    'vraag', 'vragen', 'antwoord', 'informatie', 'contact', 'email', 'telefoon',
    'dag', 'week', 'maand', 'tijd', 'uur', 'minuut', 'ochtend', 'avond', 'nacht',
    'welkom', 'sorry', 'excuseer', 'help', 'helpen',
  ];
  
  const dutchWordCount = dutchOnlyWords.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lower);
  }).length;
  
  if (dutchWordCount >= 2) {
    return 'nl';
  }
  
  // =====================
  // 🇬🇧 ENGLISH (DEFAULT)
  // =====================
  
  // If no other language detected, default to English
  return 'en';
}

// ============================================
// GET VOICE CONFIG
// ============================================

function getVoiceConfig(text: string, forceLanguage?: string): VoiceConfig {
  // If language is forced, use it directly
  if (forceLanguage && FEMALE_VOICES[forceLanguage]) {
    console.log(`🎙️ Forced language: ${forceLanguage.toUpperCase()}`);
    return FEMALE_VOICES[forceLanguage];
  }
  
  // Otherwise, detect language
  const language = detectLanguage(text);
  const voice = FEMALE_VOICES[language];
  
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