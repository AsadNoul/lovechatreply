import { create } from 'zustand';
import { Tone, Language, ReplyLength, GeneratedReply, User } from '../types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Reply generation state
  inputMessage: string;
  setInputMessage: (message: string) => void;

  selectedTone: Tone;
  setSelectedTone: (tone: Tone) => void;

  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;

  replyLength: ReplyLength;
  setReplyLength: (length: ReplyLength) => void;

  includeEmoji: boolean;
  setIncludeEmoji: (include: boolean) => void;

  // Generated replies
  generatedReplies: GeneratedReply[];
  setGeneratedReplies: (replies: GeneratedReply[]) => void;
  addFavorite: (replyId: string) => void;
  removeFavorite: (replyId: string) => void;

  // Loading state
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),

  // Reply generation state
  inputMessage: '',
  setInputMessage: (message) => set({ inputMessage: message }),

  selectedTone: 'friendly',
  setSelectedTone: (tone) => set({ selectedTone: tone }),

  selectedLanguage: 'en',
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),

  replyLength: 'medium',
  setReplyLength: (length) => set({ replyLength: length }),

  includeEmoji: true,
  setIncludeEmoji: (include) => set({ includeEmoji: include }),

  // Generated replies
  generatedReplies: [],
  setGeneratedReplies: (replies) => set({ generatedReplies: replies }),
  addFavorite: (replyId) =>
    set((state) => ({
      generatedReplies: state.generatedReplies.map((reply) =>
        reply.id === replyId ? { ...reply, isFavorite: true } : reply
      ),
    })),
  removeFavorite: (replyId) =>
    set((state) => ({
      generatedReplies: state.generatedReplies.map((reply) =>
        reply.id === replyId ? { ...reply, isFavorite: false } : reply
      ),
    })),

  // Loading state
  isGenerating: false,
  setIsGenerating: (loading) => set({ isGenerating: loading }),

  // Error state
  error: null,
  setError: (error) => set({ error }),
}));
