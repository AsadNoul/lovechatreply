const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { createThumbnail, resizeImage } = require('../utils/imageProcessor');

// In-memory storage (replace with a database in production)
let profiles = [];

// Storage file path
const storageFile = path.join(__dirname, '../../data/profiles.json');

// Load existing data
const loadData = () => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(storageFile)) {
      const data = fs.readFileSync(storageFile, 'utf8');
      profiles = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading profiles:', error);
  }
};

// Save data
const saveData = () => {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(profiles, null, 2));
  } catch (error) {
    console.error('Error saving profiles:', error);
  }
};

// Initialize data
loadData();

/**
 * Create a profile with picture
 */
const createProfile = async (req, res) => {
  try {
    const { username, bio, interests, relationshipStatus } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let profilePicture = null;
    let thumbnail = null;

    if (req.file) {
      // Resize profile picture to standard size
      const resizedPath = path.join(
        './uploads/profiles',
        `resized_${path.basename(req.file.path)}`
      );
      await resizeImage(req.file.path, resizedPath, 400, 400);

      // Create thumbnail
      const thumbnailPath = path.join(
        './uploads/profiles',
        `thumb_${path.basename(req.file.path)}`
      );
      await createThumbnail(req.file.path, thumbnailPath, 100);

      profilePicture = `/uploads/profiles/${path.basename(resizedPath)}`;
      thumbnail = `/uploads/profiles/${path.basename(thumbnailPath)}`;

      // Delete original file
      fs.unlinkSync(req.file.path);
    }

    const profile = {
      id: uuidv4(),
      username,
      bio: bio || '',
      interests: interests ? interests.split(',').map(i => i.trim()) : [],
      relationshipStatus: relationshipStatus || 'single',
      profilePicture,
      thumbnail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    profiles.push(profile);
    saveData();

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

/**
 * Update profile picture
 */
const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = profiles.find(p => p.id === id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Delete old profile pictures
    if (profile.profilePicture) {
      const oldImagePath = path.join('.', profile.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    if (profile.thumbnail) {
      const oldThumbnailPath = path.join('.', profile.thumbnail);
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }

    // Resize profile picture to standard size
    const resizedPath = path.join(
      './uploads/profiles',
      `resized_${path.basename(req.file.path)}`
    );
    await resizeImage(req.file.path, resizedPath, 400, 400);

    // Create thumbnail
    const thumbnailPath = path.join(
      './uploads/profiles',
      `thumb_${path.basename(req.file.path)}`
    );
    await createThumbnail(req.file.path, thumbnailPath, 100);

    profile.profilePicture = `/uploads/profiles/${path.basename(resizedPath)}`;
    profile.thumbnail = `/uploads/profiles/${path.basename(thumbnailPath)}`;
    profile.updatedAt = new Date().toISOString();

    // Delete original file
    fs.unlinkSync(req.file.path);

    saveData();

    res.json({
      message: 'Profile picture updated successfully',
      profile
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
};

/**
 * Get all profiles
 */
const getAllProfiles = (req, res) => {
  try {
    const { relationshipStatus, limit = 50 } = req.query;
    let filtered = [...profiles];

    if (relationshipStatus) {
      filtered = filtered.filter(p => p.relationshipStatus === relationshipStatus);
    }

    filtered = filtered.slice(0, parseInt(limit));

    res.json({
      count: filtered.length,
      profiles: filtered
    });
  } catch (error) {
    console.error('Error getting profiles:', error);
    res.status(500).json({ error: 'Failed to retrieve profiles' });
  }
};

/**
 * Get a specific profile
 */
const getProfile = (req, res) => {
  try {
    const { id } = req.params;
    const profile = profiles.find(p => p.id === id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

/**
 * Update profile information
 */
const updateProfile = (req, res) => {
  try {
    const { id } = req.params;
    const profile = profiles.find(p => p.id === id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const { username, bio, interests, relationshipStatus } = req.body;

    if (username) profile.username = username;
    if (bio !== undefined) profile.bio = bio;
    if (interests) profile.interests = interests.split(',').map(i => i.trim());
    if (relationshipStatus) profile.relationshipStatus = relationshipStatus;

    profile.updatedAt = new Date().toISOString();

    saveData();

    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

/**
 * Delete a profile
 */
const deleteProfile = (req, res) => {
  try {
    const { id } = req.params;
    const index = profiles.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profile = profiles[index];

    // Delete profile picture files
    if (profile.profilePicture) {
      const imagePath = path.join('.', profile.profilePicture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    if (profile.thumbnail) {
      const thumbnailPath = path.join('.', profile.thumbnail);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    profiles.splice(index, 1);
    saveData();

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};

module.exports = {
  createProfile,
  updateProfilePicture,
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile
};
