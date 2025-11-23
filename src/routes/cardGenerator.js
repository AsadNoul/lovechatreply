const express = require('express');
const router = express.Router();
const { pickupLineUpload } = require('../middleware/upload');
const cardGeneratorController = require('../controllers/cardGeneratorController');

// Generate a card with text only
router.post('/generate', cardGeneratorController.generateTextCard);

// Generate a card with background image
router.post('/generate-with-image', pickupLineUpload.single('backgroundImage'), cardGeneratorController.generateCardWithImage);

// Get all generated cards
router.get('/', cardGeneratorController.getAllCards);

// Get a specific card
router.get('/:id', cardGeneratorController.getCard);

// Delete a card
router.delete('/:id', cardGeneratorController.deleteCard);

// Generate a random pickup line card
router.post('/random-pickup', cardGeneratorController.generateRandomPickupCard);

// Generate a love quote card
router.post('/love-quote', cardGeneratorController.generateLoveQuoteCard);

module.exports = router;
