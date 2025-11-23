const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { generateImageCard } = require('../utils/imageProcessor');

// In-memory storage (replace with a database in production)
let cards = [];

// Storage file path
const storageFile = path.join(__dirname, '../../data/cards.json');

// Load existing data
const loadData = () => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(storageFile)) {
      const data = fs.readFileSync(storageFile, 'utf8');
      cards = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading cards:', error);
  }
};

// Save data
const saveData = () => {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(cards, null, 2));
  } catch (error) {
    console.error('Error saving cards:', error);
  }
};

// Initialize data
loadData();

// Predefined color schemes
const colorSchemes = {
  romantic: { backgroundColor: '#ff69b4', textColor: '#ffffff' },
  passionate: { backgroundColor: '#dc143c', textColor: '#ffffff' },
  sweet: { backgroundColor: '#ffb6c1', textColor: '#8b0000' },
  elegant: { backgroundColor: '#800020', textColor: '#ffd700' },
  modern: { backgroundColor: '#e91e63', textColor: '#ffffff' },
  vintage: { backgroundColor: '#d4af37', textColor: '#4a0e0e' },
  cool: { backgroundColor: '#4169e1', textColor: '#ffffff' },
  warm: { backgroundColor: '#ff6347', textColor: '#ffffff' }
};

/**
 * Generate a text-only card
 */
const generateTextCard = async (req, res) => {
  try {
    const {
      text,
      colorScheme = 'romantic',
      width = 800,
      height = 600,
      fontSize = 48,
      fontFamily = 'Arial'
    } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const scheme = colorSchemes[colorScheme] || colorSchemes.romantic;

    const cardPath = await generateImageCard({
      text,
      backgroundColor: scheme.backgroundColor,
      textColor: scheme.textColor,
      width: parseInt(width),
      height: parseInt(height),
      fontSize: parseInt(fontSize),
      fontFamily
    });

    const card = {
      id: uuidv4(),
      text,
      colorScheme,
      width: parseInt(width),
      height: parseInt(height),
      fontSize: parseInt(fontSize),
      imagePath: cardPath.replace('./', '/'),
      type: 'text-only',
      createdAt: new Date().toISOString()
    };

    cards.push(card);
    saveData();

    res.status(201).json({
      message: 'Card generated successfully',
      card
    });
  } catch (error) {
    console.error('Error generating text card:', error);
    res.status(500).json({ error: 'Failed to generate card' });
  }
};

/**
 * Generate a card with background image
 */
const generateCardWithImage = async (req, res) => {
  try {
    const {
      text,
      width = 800,
      height = 600,
      fontSize = 48,
      fontFamily = 'Arial',
      textColor = '#ffffff'
    } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Background image is required' });
    }

    const cardPath = await generateImageCard({
      text,
      backgroundImage: req.file.path,
      textColor,
      width: parseInt(width),
      height: parseInt(height),
      fontSize: parseInt(fontSize),
      fontFamily
    });

    const card = {
      id: uuidv4(),
      text,
      backgroundImage: `/uploads/pickup-lines/${path.basename(req.file.path)}`,
      width: parseInt(width),
      height: parseInt(height),
      fontSize: parseInt(fontSize),
      imagePath: cardPath.replace('./', '/'),
      type: 'with-background',
      createdAt: new Date().toISOString()
    };

    cards.push(card);
    saveData();

    res.status(201).json({
      message: 'Card with background image generated successfully',
      card
    });
  } catch (error) {
    console.error('Error generating card with image:', error);
    res.status(500).json({ error: 'Failed to generate card with image' });
  }
};

/**
 * Get all generated cards
 */
const getAllCards = (req, res) => {
  try {
    const { type, limit = 50 } = req.query;
    let filtered = [...cards];

    if (type) {
      filtered = filtered.filter(card => card.type === type);
    }

    filtered = filtered.slice(0, parseInt(limit));

    res.json({
      count: filtered.length,
      cards: filtered
    });
  } catch (error) {
    console.error('Error getting cards:', error);
    res.status(500).json({ error: 'Failed to retrieve cards' });
  }
};

/**
 * Get a specific card
 */
const getCard = (req, res) => {
  try {
    const { id } = req.params;
    const card = cards.find(c => c.id === id);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    console.error('Error getting card:', error);
    res.status(500).json({ error: 'Failed to retrieve card' });
  }
};

/**
 * Delete a card
 */
const deleteCard = (req, res) => {
  try {
    const { id } = req.params;
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const card = cards[index];

    // Delete image file
    const imagePath = path.join('.', card.imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    cards.splice(index, 1);
    saveData();

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
};

/**
 * Generate a random pickup line card
 */
const generateRandomPickupCard = async (req, res) => {
  try {
    const pickupLines = [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "Do you have a map? I keep getting lost in your eyes.",
      "Is your name Google? Because you have everything I've been searching for.",
      "Are you a parking ticket? Because you've got FINE written all over you.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Are you a time traveler? Because I see you in my future.",
      "If you were a vegetable, you'd be a cute-cumber!",
      "Are you made of copper and tellurium? Because you're Cu-Te!",
      "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
      "Is your dad a boxer? Because you're a knockout!"
    ];

    const randomLine = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    const schemes = Object.keys(colorSchemes);
    const randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
    const scheme = colorSchemes[randomScheme];

    const cardPath = await generateImageCard({
      text: randomLine,
      backgroundColor: scheme.backgroundColor,
      textColor: scheme.textColor,
      width: 800,
      height: 600,
      fontSize: 42
    });

    const card = {
      id: uuidv4(),
      text: randomLine,
      colorScheme: randomScheme,
      width: 800,
      height: 600,
      fontSize: 42,
      imagePath: cardPath.replace('./', '/'),
      type: 'random-pickup',
      createdAt: new Date().toISOString()
    };

    cards.push(card);
    saveData();

    res.status(201).json({
      message: 'Random pickup line card generated successfully',
      card
    });
  } catch (error) {
    console.error('Error generating random pickup card:', error);
    res.status(500).json({ error: 'Failed to generate random pickup card' });
  }
};

/**
 * Generate a love quote card
 */
const generateLoveQuoteCard = async (req, res) => {
  try {
    const loveQuotes = [
      "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every day.",
      "You are my today and all of my tomorrows.",
      "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      "I love you not only for what you are, but for what I am when I am with you.",
      "You are my sun, my moon, and all my stars.",
      "Every love story is beautiful, but ours is my favorite.",
      "I choose you. And I'll choose you over and over. Without pause, without doubt, in a heartbeat. I'll keep choosing you.",
      "You are the finest, loveliest, tenderest person I have ever known.",
      "Love is composed of a single soul inhabiting two bodies.",
      "To love and be loved is to feel the sun from both sides."
    ];

    const { quote } = req.body;
    const selectedQuote = quote || loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

    const cardPath = await generateImageCard({
      text: selectedQuote,
      backgroundColor: '#800020',
      textColor: '#ffd700',
      width: 1000,
      height: 700,
      fontSize: 44,
      fontFamily: 'Arial'
    });

    const card = {
      id: uuidv4(),
      text: selectedQuote,
      colorScheme: 'elegant',
      width: 1000,
      height: 700,
      fontSize: 44,
      imagePath: cardPath.replace('./', '/'),
      type: 'love-quote',
      createdAt: new Date().toISOString()
    };

    cards.push(card);
    saveData();

    res.status(201).json({
      message: 'Love quote card generated successfully',
      card
    });
  } catch (error) {
    console.error('Error generating love quote card:', error);
    res.status(500).json({ error: 'Failed to generate love quote card' });
  }
};

module.exports = {
  generateTextCard,
  generateCardWithImage,
  getAllCards,
  getCard,
  deleteCard,
  generateRandomPickupCard,
  generateLoveQuoteCard
};
