// Language support for the app
// This can be expanded with full i18n support using libraries like i18next

export const SUPPORTED_LANGUAGES = [
  { id: 'english', label: 'English', code: 'en' },
  { id: 'arabic', label: 'العربية', code: 'ar' },
  { id: 'urdu', label: 'اردو', code: 'ur' },
  { id: 'hindi', label: 'हिन्दी', code: 'hi' },
  { id: 'spanish', label: 'Español', code: 'es' },
  { id: 'french', label: 'Français', code: 'fr' },
  { id: 'german', label: 'Deutsch', code: 'de' },
  { id: 'italian', label: 'Italiano', code: 'it' },
  { id: 'portuguese', label: 'Português', code: 'pt' },
  { id: 'turkish', label: 'Türkçe', code: 'tr' },
];

export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
};

export const getLanguageById = (id) => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id === id);
};

// Placeholder for translation service
// In production, integrate with translation APIs like:
// - Google Cloud Translation API
// - DeepL API
// - Azure Translator
// - AWS Translate
export const translateText = async (text, targetLanguage) => {
  // TODO: Implement actual translation service
  console.log(`Translating "${text}" to ${targetLanguage}`);
  return text;
};
