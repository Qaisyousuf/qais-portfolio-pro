// middleware.ts
// Place this file in your project ROOT (same level as package.json)
// This runs BEFORE the page loads - no flash of wrong language!

import { next } from '@vercel/edge';

// Your supported languages
const SUPPORTED_LANGUAGES = ['en', 'da', 'fr', 'sv', 'nl'];
const DEFAULT_LANGUAGE = 'en';

// Language URL paths
const LANGUAGE_PATHS: Record<string, string> = {
  'en': '/',      // English is root (no prefix)
  'da': '/da/',   // Danish
  'fr': '/fr/',   // French
  'sv': '/sv/',   // Swedish
  'nl': '/nl/',   // Dutch
};

export const config = {
  // Only run middleware on the homepage
  matcher: '/',
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  
  // Skip if already on a language path
  const pathname = url.pathname;
  if (pathname.startsWith('/da') || 
      pathname.startsWith('/fr') || 
      pathname.startsWith('/sv') || 
      pathname.startsWith('/nl')) {
    return next();
  }
  
  // Skip if it's an API call or asset
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_') ||
      pathname.includes('.')) {
    return next();
  }
  
  // Check if user has a language preference cookie
  const cookieLang = request.headers.get('cookie')?.match(/getrok-lang=([a-z]{2})/)?.[1];
  if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)) {
    if (cookieLang === 'en') {
      return next(); // English stays on root
    }
    return Response.redirect(new URL(LANGUAGE_PATHS[cookieLang], url.origin), 307);
  }
  
  // Get browser language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const browserLang = detectBrowserLanguage(acceptLanguage);
  
  // If browser language is English or not supported, stay on root
  if (browserLang === 'en') {
    return next();
  }
  
  // Redirect to the detected language
  const redirectPath = LANGUAGE_PATHS[browserLang] || '/';
  return Response.redirect(new URL(redirectPath, url.origin), 307);
}

function detectBrowserLanguage(acceptLanguage: string): string {
  // Parse Accept-Language header
  // Example: "da-DK,da;q=0.9,en-US;q=0.8,en;q=0.7"
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(), // Get primary language code
        quality: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (highest first)
  
  // Find the first supported language
  for (const lang of languages) {
    if (SUPPORTED_LANGUAGES.includes(lang.code)) {
      return lang.code;
    }
  }
  
  return DEFAULT_LANGUAGE;
}