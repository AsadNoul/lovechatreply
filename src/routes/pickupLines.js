const express = require('express');
const router = express.Router();
const { pickupLineUpload } = require('../middleware/upload');
const pickupLineController = require('../controllers/pickupLineController');

// Upload a pickup line with image
router.post('/upload', pickupLineUpload.single('image'), pickupLineController.uploadPickupLine);

// Upload multiple pickup lines with images
router.post('/upload-multiple', pickupLineUpload.array('images', 10), pickupLineController.uploadMultiplePickupLines);

// Get all pickup lines
router.get('/', pickupLineController.getAllPickupLines);

// Get a random pickup line
router.get('/random', pickupLineController.getRandomPickupLine);

// Get a specific pickup line
router.get('/:id', pickupLineController.getPickupLine);

// Share a pickup line (increment share count)
router.post('/:id/share', pickupLineController.sharePickupLine);

// Delete a pickup line
router.delete('/:id', pickupLineController.deletePickupLine);

module.exports = router;
