// Supported languages
export const languages = {
  en: 'English',
  da: 'Dansk',
  fr: 'Français',
  sv: 'Svenska',
  nl: 'Nederlands'
};

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

// This function will be used by components to get their translations
export function getLangFromURL(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}