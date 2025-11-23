const express = require('express');
const router = express.Router();
const { profileUpload } = require('../middleware/upload');
const profileController = require('../controllers/profileController');

// Create a profile with picture
router.post('/create', profileUpload.single('profilePicture'), profileController.createProfile);

// Update profile picture
router.put('/:id/picture', profileUpload.single('profilePicture'), profileController.updateProfilePicture);

// Get all profiles
router.get('/', profileController.getAllProfiles);

// Get a specific profile
router.get('/:id', profileController.getProfile);

// Update profile information
router.put('/:id', profileController.updateProfile);

// Delete a profile
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
