const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { createThumbnail } = require('../utils/imageProcessor');

// In-memory storage (replace with a database in production)
let pickupLines = [];

// Storage file path
const storageFile = path.join(__dirname, '../../data/pickup-lines.json');

// Load existing data
const loadData = () => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(storageFile)) {
      const data = fs.readFileSync(storageFile, 'utf8');
      pickupLines = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading pickup lines:', error);
  }
};

// Save data
const saveData = () => {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(pickupLines, null, 2));
  } catch (error) {
    console.error('Error saving pickup lines:', error);
  }
};

// Initialize data
loadData();

/**
 * Upload a pickup line with an image
 */
const uploadPickupLine = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { line, category, author } = req.body;

    if (!line) {
      return res.status(400).json({ error: 'Pickup line text is required' });
    }

    // Create thumbnail
    const thumbnailPath = path.join(
      './uploads/pickup-lines',
      `thumb_${path.basename(req.file.path)}`
    );
    await createThumbnail(req.file.path, thumbnailPath);

    const pickupLine = {
      id: uuidv4(),
      line,
      category: category || 'general',
      author: author || 'Anonymous',
      image: `/uploads/pickup-lines/${path.basename(req.file.path)}`,
      thumbnail: `/uploads/pickup-lines/${path.basename(thumbnailPath)}`,
      shareCount: 0,
      createdAt: new Date().toISOString()
    };

    pickupLines.push(pickupLine);
    saveData();

    res.status(201).json({
      message: 'Pickup line uploaded successfully',
      pickupLine
    });
  } catch (error) {
    console.error('Error uploading pickup line:', error);
    res.status(500).json({ error: 'Failed to upload pickup line' });
  }
};

/**
 * Upload multiple pickup lines with images
 */
const uploadMultiplePickupLines = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const { lines, category, author } = req.body;
    let lineTexts = [];

    if (lines) {
      try {
        lineTexts = JSON.parse(lines);
      } catch (e) {
        lineTexts = lines.split('|').map(l => l.trim());
      }
    }

    const uploadedLines = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const lineText = lineTexts[i] || `Pickup line ${i + 1}`;

      // Create thumbnail
      const thumbnailPath = path.join(
        './uploads/pickup-lines',
        `thumb_${path.basename(file.path)}`
      );
      await createThumbnail(file.path, thumbnailPath);

      const pickupLine = {
        id: uuidv4(),
        line: lineText,
        category: category || 'general',
        author: author || 'Anonymous',
        image: `/uploads/pickup-lines/${path.basename(file.path)}`,
        thumbnail: `/uploads/pickup-lines/${path.basename(thumbnailPath)}`,
        shareCount: 0,
        createdAt: new Date().toISOString()
      };

      pickupLines.push(pickupLine);
      uploadedLines.push(pickupLine);
    }

    saveData();

    res.status(201).json({
      message: `${uploadedLines.length} pickup lines uploaded successfully`,
      pickupLines: uploadedLines
    });
  } catch (error) {
    console.error('Error uploading multiple pickup lines:', error);
    res.status(500).json({ error: 'Failed to upload pickup lines' });
  }
};

/**
 * Get all pickup lines
 */
const getAllPickupLines = (req, res) => {
  try {
    const { category, author, limit = 50, sortBy = 'recent' } = req.query;
    let filtered = [...pickupLines];

    if (category) {
      filtered = filtered.filter(line => line.category === category);
    }

    if (author) {
      filtered = filtered.filter(line => line.author === author);
    }

    // Sort
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.shareCount - a.shareCount);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    filtered = filtered.slice(0, parseInt(limit));

    res.json({
      count: filtered.length,
      pickupLines: filtered
    });
  } catch (error) {
    console.error('Error getting pickup lines:', error);
    res.status(500).json({ error: 'Failed to retrieve pickup lines' });
  }
};

/**
 * Get a random pickup line
 */
const getRandomPickupLine = (req, res) => {
  try {
    if (pickupLines.length === 0) {
      return res.status(404).json({ error: 'No pickup lines available' });
    }

    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    const randomLine = pickupLines[randomIndex];

    res.json(randomLine);
  } catch (error) {
    console.error('Error getting random pickup line:', error);
    res.status(500).json({ error: 'Failed to retrieve random pickup line' });
  }
};

/**
 * Get a specific pickup line
 */
const getPickupLine = (req, res) => {
  try {
    const { id } = req.params;
    const pickupLine = pickupLines.find(line => line.id === id);

    if (!pickupLine) {
      return res.status(404).json({ error: 'Pickup line not found' });
    }

    res.json(pickupLine);
  } catch (error) {
    console.error('Error getting pickup line:', error);
    res.status(500).json({ error: 'Failed to retrieve pickup line' });
  }
};

/**
 * Share a pickup line (increment share count)
 */
const sharePickupLine = (req, res) => {
  try {
    const { id } = req.params;
    const pickupLine = pickupLines.find(line => line.id === id);

    if (!pickupLine) {
      return res.status(404).json({ error: 'Pickup line not found' });
    }

    pickupLine.shareCount++;
    saveData();

    res.json({
      message: 'Pickup line shared successfully',
      pickupLine
    });
  } catch (error) {
    console.error('Error sharing pickup line:', error);
    res.status(500).json({ error: 'Failed to share pickup line' });
  }
};

/**
 * Delete a pickup line
 */
const deletePickupLine = (req, res) => {
  try {
    const { id } = req.params;
    const index = pickupLines.findIndex(line => line.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Pickup line not found' });
    }

    const line = pickupLines[index];

    // Delete image files
    const imagePath = path.join('.', line.image);
    const thumbnailPath = path.join('.', line.thumbnail);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }

    pickupLines.splice(index, 1);
    saveData();

    res.json({ message: 'Pickup line deleted successfully' });
  } catch (error) {
    console.error('Error deleting pickup line:', error);
    res.status(500).json({ error: 'Failed to delete pickup line' });
  }
};

module.exports = {
  uploadPickupLine,
  uploadMultiplePickupLines,
  getAllPickupLines,
  getRandomPickupLine,
  getPickupLine,
  sharePickupLine,
  deletePickupLine
};
