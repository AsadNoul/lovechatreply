const express = require('express');
const router = express.Router();
const { loveStoryUpload } = require('../middleware/upload');
const loveStoryController = require('../controllers/loveStoryController');

// Upload a love story with image
router.post('/upload', loveStoryUpload.single('image'), loveStoryController.uploadLoveStory);

// Upload multiple images for a love story
router.post('/upload-multiple', loveStoryUpload.array('images', 10), loveStoryController.uploadMultipleLoveStories);

// Get all love stories
router.get('/', loveStoryController.getAllLoveStories);

// Get a specific love story
router.get('/:id', loveStoryController.getLoveStory);

// Delete a love story
router.delete('/:id', loveStoryController.deleteLoveStory);

module.exports = router;
