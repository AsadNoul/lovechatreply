const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { createThumbnail } = require('../utils/imageProcessor');

// In-memory storage (replace with a database in production)
let loveStories = [];

// Storage file path
const storageFile = path.join(__dirname, '../../data/love-stories.json');

// Load existing data
const loadData = () => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(storageFile)) {
      const data = fs.readFileSync(storageFile, 'utf8');
      loveStories = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading love stories:', error);
  }
};

// Save data
const saveData = () => {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(loveStories, null, 2));
  } catch (error) {
    console.error('Error saving love stories:', error);
  }
};

// Initialize data
loadData();

/**
 * Upload a love story with an image
 */
const uploadLoveStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { title, story, author, tags } = req.body;

    if (!story) {
      return res.status(400).json({ error: 'Story text is required' });
    }

    // Create thumbnail
    const thumbnailPath = path.join(
      './uploads/love-stories',
      `thumb_${path.basename(req.file.path)}`
    );
    await createThumbnail(req.file.path, thumbnailPath);

    const loveStory = {
      id: uuidv4(),
      title: title || 'Untitled Love Story',
      story,
      author: author || 'Anonymous',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      image: `/uploads/love-stories/${path.basename(req.file.path)}`,
      thumbnail: `/uploads/love-stories/${path.basename(thumbnailPath)}`,
      createdAt: new Date().toISOString()
    };

    loveStories.push(loveStory);
    saveData();

    res.status(201).json({
      message: 'Love story uploaded successfully',
      loveStory
    });
  } catch (error) {
    console.error('Error uploading love story:', error);
    res.status(500).json({ error: 'Failed to upload love story' });
  }
};

/**
 * Upload multiple love stories with images
 */
const uploadMultipleLoveStories = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const { stories, author } = req.body;
    let storyTexts = [];

    if (stories) {
      try {
        storyTexts = JSON.parse(stories);
      } catch (e) {
        storyTexts = stories.split('|').map(s => s.trim());
      }
    }

    const uploadedStories = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const storyText = storyTexts[i] || `Love story ${i + 1}`;

      // Create thumbnail
      const thumbnailPath = path.join(
        './uploads/love-stories',
        `thumb_${path.basename(file.path)}`
      );
      await createThumbnail(file.path, thumbnailPath);

      const loveStory = {
        id: uuidv4(),
        title: `Love Story ${i + 1}`,
        story: storyText,
        author: author || 'Anonymous',
        tags: [],
        image: `/uploads/love-stories/${path.basename(file.path)}`,
        thumbnail: `/uploads/love-stories/${path.basename(thumbnailPath)}`,
        createdAt: new Date().toISOString()
      };

      loveStories.push(loveStory);
      uploadedStories.push(loveStory);
    }

    saveData();

    res.status(201).json({
      message: `${uploadedStories.length} love stories uploaded successfully`,
      loveStories: uploadedStories
    });
  } catch (error) {
    console.error('Error uploading multiple love stories:', error);
    res.status(500).json({ error: 'Failed to upload love stories' });
  }
};

/**
 * Get all love stories
 */
const getAllLoveStories = (req, res) => {
  try {
    const { tag, author, limit = 50 } = req.query;
    let filtered = [...loveStories];

    if (tag) {
      filtered = filtered.filter(story => story.tags.includes(tag));
    }

    if (author) {
      filtered = filtered.filter(story => story.author === author);
    }

    filtered = filtered.slice(0, parseInt(limit));

    res.json({
      count: filtered.length,
      loveStories: filtered
    });
  } catch (error) {
    console.error('Error getting love stories:', error);
    res.status(500).json({ error: 'Failed to retrieve love stories' });
  }
};

/**
 * Get a specific love story
 */
const getLoveStory = (req, res) => {
  try {
    const { id } = req.params;
    const loveStory = loveStories.find(story => story.id === id);

    if (!loveStory) {
      return res.status(404).json({ error: 'Love story not found' });
    }

    res.json(loveStory);
  } catch (error) {
    console.error('Error getting love story:', error);
    res.status(500).json({ error: 'Failed to retrieve love story' });
  }
};

/**
 * Delete a love story
 */
const deleteLoveStory = (req, res) => {
  try {
    const { id } = req.params;
    const index = loveStories.findIndex(story => story.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Love story not found' });
    }

    const story = loveStories[index];

    // Delete image files
    const imagePath = path.join('.', story.image);
    const thumbnailPath = path.join('.', story.thumbnail);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }

    loveStories.splice(index, 1);
    saveData();

    res.json({ message: 'Love story deleted successfully' });
  } catch (error) {
    console.error('Error deleting love story:', error);
    res.status(500).json({ error: 'Failed to delete love story' });
  }
};

module.exports = {
  uploadLoveStory,
  uploadMultipleLoveStories,
  getAllLoveStories,
  getLoveStory,
  deleteLoveStory
};
