import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  RECENT_CHATS: '@recent_chats',
  ONBOARDING_COMPLETE: '@onboarding_complete',
  USER_PREFERENCES: '@user_preferences',
};

export class StorageService {
  // Onboarding
  static async isOnboardingComplete() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
      return value === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  static async setOnboardingComplete() {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    } catch (error) {
      console.error('Error setting onboarding complete:', error);
    }
  }

  // Chat History
  static async getRecentChats() {
    try {
      const chatsJson = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_CHATS);
      return chatsJson ? JSON.parse(chatsJson) : [];
    } catch (error) {
      console.error('Error getting recent chats:', error);
      return [];
    }
  }

  static async saveChat(chatData) {
    try {
      const chats = await this.getRecentChats();
      const newChat = {
        id: Date.now().toString(),
        name: chatData.name || 'Unknown',
        lastMessage: chatData.lastMessage,
        timestamp: new Date().toISOString(),
        context: chatData.context,
      };

      // Add to beginning of array and limit to 20 most recent
      const updatedChats = [newChat, ...chats].slice(0, 20);
      await AsyncStorage.setItem(
        STORAGE_KEYS.RECENT_CHATS,
        JSON.stringify(updatedChats)
      );

      return newChat;
    } catch (error) {
      console.error('Error saving chat:', error);
      throw error;
    }
  }

  static async deleteChat(chatId) {
    try {
      const chats = await this.getRecentChats();
      const updatedChats = chats.filter((chat) => chat.id !== chatId);
      await AsyncStorage.setItem(
        STORAGE_KEYS.RECENT_CHATS,
        JSON.stringify(updatedChats)
      );
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw error;
    }
  }

  static async clearAllChats() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.RECENT_CHATS);
    } catch (error) {
      console.error('Error clearing chats:', error);
      throw error;
    }
  }

  // User Preferences
  static async getUserPreferences() {
    try {
      const prefsJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return prefsJson
        ? JSON.parse(prefsJson)
        : {
            defaultLanguage: 'english',
            defaultLength: 'short',
            includeEmojis: true,
          };
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return {
        defaultLanguage: 'english',
        defaultLength: 'short',
        includeEmojis: true,
      };
    }
  }

  static async saveUserPreferences(preferences) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_PREFERENCES,
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  }

  // Clear all data
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.RECENT_CHATS,
        STORAGE_KEYS.USER_PREFERENCES,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}
