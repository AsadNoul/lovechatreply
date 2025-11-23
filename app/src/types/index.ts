export type Tone = 'friendly' | 'professional' | 'romantic' | 'casual' | 'formal';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';
export type ReplyLength = 'short' | 'medium' | 'long';

export interface GenerateReplyRequest {
  message: string;
  context?: string;
  tone: Tone;
  language: Language;
  length: ReplyLength;
  includeEmoji: boolean;
}

export interface GeneratedReply {
  id: string;
  text: string;
  isFavorite: boolean;
  createdAt: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface UserPreferences {
  defaultTone: Tone;
  defaultLanguage: Language;
  defaultLength: ReplyLength;
  includeEmoji: boolean;
}

export interface User {
  id: string;
  email?: string;
  isPro: boolean;
  preferences: UserPreferences;
}
