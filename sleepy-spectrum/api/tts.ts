import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================
// FEMALE VOICES - YOUR 5 LANGUAGES
// EN, DA, SV, NL, FR
// ============================================

interface VoiceConfig {
  languageCode: string;
  name: string;
  ssmlGender: 'FEMALE';
  speakingRate: number;
  pitch: number;
}

const FEMALE_VOICES: Record<string, VoiceConfig> = {
  // 🇩🇰 Danish - Warm Danish woman (SLOWER)
  da: {
    languageCode: 'da-DK',
    name: 'da-DK-Wavenet-D',
    ssmlGender: 'FEMALE',
    speakingRate: 0.85,  // Even slower
    pitch: 0.0,
  },
  
  // 🇬🇧 English - Sophisticated British woman
  en: {
    languageCode: 'en-GB',
    name: 'en-GB-Neural2-C',
    ssmlGender: 'FEMALE',
    speakingRate: 0.95,
    pitch: 0.0,
  },
  
  // 🇸🇪 Swedish - Friendly Swedish woman
  sv: {
    languageCode: 'sv-SE',
    name: 'sv-SE-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 0.85,
    pitch: 0.0,
  },
  
  // 🇳🇱 Dutch - Warm Dutch woman
  nl: {
    languageCode: 'nl-NL',
    name: 'nl-NL-Wavenet-A',
    ssmlGender: 'FEMALE',
    speakingRate: 0.85,
    pitch: 0.0,
  },
  
  // 🇫🇷 French - Elegant French woman
  fr: {
    languageCode: 'fr-FR',
    name: 'fr-FR-Neural2-A',
    ssmlGender: 'FEMALE',
    speakingRate: 0.85,
    pitch: 0.0,
  },
};

// ============================================
// LANGUAGE DETECTION - IMPROVED
// Now checks Swedish and Dutch BEFORE Danish
// ============================================

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();
  
  console.log(`🔍 Analyzing text: "${text.substring(0, 50)}..."`);
  
  // =====================
  // 🇸🇪 SWEDISH - CHECK FIRST!
  // Swedish has ä ö but NOT æ ø
  // =====================
  
  // Swedish unique characters
  const hasSwedishChars = /[äö]/.test(text) && !/[æø]/.test(text);
  
  // Swedish-specific words that are NOT in Danish
  const swedishUniqueWords = [
    'jag', 'och', 'att', 'är', 'var', 'hur', 'vad', 'för', 'med', 'kan', 
    'ska', 'har', 'inte', 'som', 'det', 'den', 'ett', 'till', 'av', 'på',
    'om', 'men', 'så', 'eller', 'när', 'alla', 'vara', 'från', 'vid', 
    'bli', 'blir', 'blev', 'varit', 'skulle', 'kunde', 'ville', 'måste',
    'också', 'bara', 'här', 'där', 'vem', 'vilket', 'vilka', 'denna',
    'dessa', 'något', 'några', 'ingen', 'inget', 'annat', 'andra',
    'själv', 'egen', 'samma', 'varje', 'mellan', 'under', 'efter',
    'utan', 'inom', 'sedan', 'redan', 'ännu', 'fortfarande', 'kanske',
    'väldigt', 'mycket', 'lite', 'mer', 'mest', 'bra', 'bättre', 'bäst',
    'tack', 'hej', 'välkommen', 'hjälpa', 'hjälp', 'behöver', 'vill',
    'företag', 'tjänst', 'tjänster', 'pris', 'priser', 'kostnad', 'kostnader',
    'fungerar', 'använder', 'arbetar', 'skapar', 'gör', 'göra',
    'idag', 'imorgon', 'igår', 'vecka', 'månad', 'året',
    'oss', 'vårt', 'vår', 'våra', 'er', 'ert', 'era', 'dig', 'mig', 'sig',
  ];
  
  let swedishScore = 0;
  swedishUniqueWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) swedishScore += matches.length;
  });
  
  if (hasSwedishChars) swedishScore += 5;
  
  console.log(`🇸🇪 Swedish score: ${swedishScore}`);
  
  // =====================
  // 🇳🇱 DUTCH - CHECK SECOND
  // Dutch has unique patterns: ij, oe, ui, aa, ee, oo, uu
  // =====================
  
  // Dutch unique patterns
  const hasDutchPatterns = /\bij\b|ij[kntsgm]|[aeou]ij|ijk|oe[kntpmr]|oei|ui[ts]|aai|ooi|eeu|ieu|uw|ouw/.test(lower);
  
  // Dutch-specific words that are NOT in Danish/Swedish/English
  const dutchUniqueWords = [
    'ik', 'jij', 'hij', 'zij', 'wij', 'jullie', 'het', 'een', 'de', 'en',
    'van', 'voor', 'met', 'aan', 'dat', 'die', 'dit', 'deze', 'maar',
    'als', 'ook', 'nog', 'wel', 'niet', 'naar', 'uit', 'bij', 'tot',
    'wat', 'wie', 'waar', 'wanneer', 'waarom', 'hoe', 'welk', 'welke',
    'hebben', 'heeft', 'had', 'zijn', 'ben', 'bent', 'was', 'waren',
    'worden', 'wordt', 'werd', 'kunnen', 'kan', 'kon', 'konden',
    'zullen', 'zal', 'zou', 'zouden', 'willen', 'wil', 'wilde',
    'moeten', 'moet', 'moest', 'mogen', 'mag', 'mocht',
    'gaan', 'gaat', 'ging', 'komen', 'komt', 'kwam',
    'zien', 'ziet', 'zag', 'doen', 'doet', 'deed',
    'maken', 'maakt', 'maakte', 'geven', 'geeft', 'gaf',
    'nemen', 'neemt', 'nam', 'zeggen', 'zegt', 'zei',
    'denken', 'denkt', 'dacht', 'weten', 'weet', 'wist',
    'hallo', 'bedankt', 'dank', 'alstublieft', 'graag',
    'goed', 'slecht', 'groot', 'klein', 'nieuw', 'oud',
    'mooi', 'makkelijk', 'moeilijk', 'veel', 'weinig',
    'meer', 'minder', 'meest', 'minst',
    'mijn', 'jouw', 'uw', 'ons', 'onze', 'hun',
    'iemand', 'niemand', 'iets', 'niets', 'alles', 'allemaal',
    'ander', 'andere', 'zelf', 'eigen', 'dezelfde',
    'bedrijf', 'werk', 'klant', 'prijs', 'prijzen', 'aanbod',
    'vraag', 'vragen', 'antwoord', 'informatie',
    'welkom', 'sorry', 'helpen', 'hulp',
    'vandaag', 'morgen', 'gisteren', 'week', 'maand', 'jaar',
    'snart', 'spoedig', 'mogelijk', 'contact', 'nemen',
  ];
  
  let dutchScore = 0;
  dutchUniqueWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) dutchScore += matches.length;
  });
  
  if (hasDutchPatterns) dutchScore += 3;
  
  console.log(`🇳🇱 Dutch score: ${dutchScore}`);
  
  // =====================
  // 🇫🇷 FRENCH - CHECK THIRD
  // French has unique accents: é è ê ë à â ç ù û ü ô î ï
  // =====================
  
  const hasFrenchChars = /[éèêëàâçùûüôîï]/.test(text);
  
  // French-specific words
  const frenchUniqueWords = [
    'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles',
    'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et',
    'est', 'sont', 'être', 'avoir', 'fait', 'faire', 'dit', 'dire',
    'peut', 'pouvoir', 'veut', 'vouloir', 'doit', 'devoir',
    'qui', 'que', 'quoi', 'dont', 'où', 'comment', 'pourquoi', 'quand',
    'ce', 'cette', 'ces', 'cet', 'quel', 'quelle', 'quels', 'quelles',
    'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses',
    'notre', 'votre', 'leur', 'nos', 'vos', 'leurs',
    'dans', 'sur', 'sous', 'avec', 'pour', 'par', 'sans', 'chez',
    'mais', 'ou', 'donc', 'car', 'ni', 'puis', 'ensuite',
    'ne', 'pas', 'plus', 'jamais', 'rien', 'personne', 'aucun',
    'très', 'bien', 'mal', 'mieux', 'pire', 'moins', 'aussi',
    'tout', 'toute', 'tous', 'toutes', 'autre', 'autres', 'même',
    'bonjour', 'bonsoir', 'salut', 'merci', 'oui', 'non',
    'comment', 'pourquoi', 'combien', 'quand', 'où',
    'entreprise', 'service', 'services', 'prix', 'coût', 'aide', 'aider',
    'bienvenue', 'pardon', 'excusez', "s'il", 'plaît',
    "aujourd'hui", 'demain', 'hier', 'semaine', 'mois', 'année',
    'intégration', 'fonctionne', 'utilise', 'travaille',
    'pouvez', 'voulez', 'avez', 'êtes', 'sommes',
  ];
  
  let frenchScore = 0;
  frenchUniqueWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) frenchScore += matches.length;
  });
  
  if (hasFrenchChars) frenchScore += 5;
  
  console.log(`🇫🇷 French score: ${frenchScore}`);
  
  // =====================
  // 🇩🇰 DANISH - CHECK FOURTH
  // Danish has æ ø å
  // =====================
  
  const hasDanishChars = /[æøå]/.test(text);
  
  // Danish-specific words
  const danishUniqueWords = [
    'jeg', 'og', 'er', 'det', 'en', 'et', 'af', 'til', 'på', 'med',
    'ikke', 'som', 'har', 'kan', 'vil', 'skal', 'være', 'blive',
    'efter', 'eller', 'når', 'hvor', 'hvad', 'hvem', 'hvordan', 'hvorfor',
    'hej', 'tak', 'goddag', 'farvel', 'ja', 'nej', 'meget', 'også',
    'bare', 'nu', 'her', 'der', 'denne', 'disse', 'nogle', 'alle',
    'hver', 'anden', 'andet', 'andre', 'min', 'din', 'sin', 'vores',
    'jeres', 'deres', 'ham', 'hende', 'os', 'dem', 'selv', 'igen',
    'altid', 'aldrig', 'måske', 'fordi', 'hvis', 'så', 'men', 'fra',
    'ved', 'om', 'under', 'over', 'mellem', 'gennem', 'uden', 'inden',
    'hjælpe', 'hjælp', 'velkommen', 'undskyld', 'venligst', 'gerne',
    'godt', 'dårligt', 'stor', 'lille', 'ny', 'gammel', 'god',
    'virksomhed', 'firma', 'arbejde', 'kunde', 'pris', 'priser', 'tilbud',
    'spørgsmål', 'svar', 'oplysninger', 'information', 'kontakt',
    'dag', 'uge', 'måned', 'tid', 'time', 'morgen', 'aften',
    'idag', 'imorgen', 'igår',
    'dig', 'mig', 'sig', 'vise', 'fungerer', 'bruger',
  ];
  
  let danishScore = 0;
  danishUniqueWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) danishScore += matches.length;
  });
  
  if (hasDanishChars) danishScore += 10;  // Danish chars are very reliable
  
  console.log(`🇩🇰 Danish score: ${danishScore}`);
  
  // =====================
  // DETERMINE WINNER
  // =====================
  
  const scores = {
    sv: swedishScore,
    nl: dutchScore,
    fr: frenchScore,
    da: danishScore,
  };
  
  // Find highest score
  let maxScore = 0;
  let detectedLang = 'en';  // Default to English
  
  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore && score >= 2) {  // Minimum threshold of 2
      maxScore = score;
      detectedLang = lang;
    }
  }
  
  console.log(`✅ Winner: ${detectedLang.toUpperCase()} (score: ${maxScore})`);
  
  return detectedLang;
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