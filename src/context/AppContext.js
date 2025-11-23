import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Jessica',
    email: 'jessica.doe@email.com',
    avatar: null,
    isPro: false,
  });

  const [history, setHistory] = useState([
    {
      id: '1',
      scenario: 'Good morning message',
      tone: 'Sincere',
      date: new Date().toISOString(),
      preview: 'Good morning, beautiful! Hope you have an amazing day ahead...',
      messages: [
        'Good morning, beautiful! Hope you have an amazing day ahead filled with joy and success.',
        'Rise and shine, gorgeous! Just wanted to say good morning and remind you how special you are.',
        'Morning! Waking up thinking about you always makes my day better. Have a wonderful day!',
      ],
      selectedMessage: 0,
      language: 'English',
      length: 'Short',
    },
  ]);

  const [favorites, setFavorites] = useState([]);
  const [dailyRepliesUsed, setDailyRepliesUsed] = useState(0);
  const [totalMessagesGenerated, setTotalMessagesGenerated] = useState(12);

  const addToHistory = (historyItem) => {
    const newItem = {
      ...historyItem,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setHistory([newItem, ...history]);
    setTotalMessagesGenerated(totalMessagesGenerated + 1);
    if (!user.isPro) {
      setDailyRepliesUsed(dailyRepliesUsed + 1);
    }
    return newItem;
  };

  const addToFavorites = (message) => {
    const favorite = {
      id: Date.now().toString(),
      ...message,
      dateAdded: new Date().toISOString(),
    };
    setFavorites([favorite, ...favorites]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (messageText) => {
    return favorites.some((fav) => fav.text === messageText);
  };

  const updateUser = (updates) => {
    setUser({ ...user, ...updates });
  };

  const upgradeToPro = () => {
    setUser({ ...user, isPro: true });
  };

  const getRemainingReplies = () => {
    if (user.isPro) return Infinity;
    return Math.max(0, 5 - dailyRepliesUsed);
  };

  const canGenerateMessage = () => {
    return user.isPro || dailyRepliesUsed < 5;
  };

  const value = {
    user,
    updateUser,
    upgradeToPro,
    history,
    addToHistory,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    dailyRepliesUsed,
    totalMessagesGenerated,
    getRemainingReplies,
    canGenerateMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
