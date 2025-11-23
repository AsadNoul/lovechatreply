const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create upload directories if they don't exist
const uploadDirs = [
  './uploads/love-stories',
  './uploads/pickup-lines',
  './uploads/profiles',
  './uploads/generated-cards'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Import routes
const loveStoryRoutes = require('./routes/loveStories');
const pickupLineRoutes = require('./routes/pickupLines');
const profileRoutes = require('./routes/profiles');
const cardGeneratorRoutes = require('./routes/cardGenerator');

// Use routes
app.use('/api/love-stories', loveStoryRoutes);
app.use('/api/pickup-lines', pickupLineRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/cards', cardGeneratorRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'LoveChatReply API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LoveChatReply API',
    endpoints: {
      loveStories: '/api/love-stories',
      pickupLines: '/api/pickup-lines',
      profiles: '/api/profiles',
      cardGenerator: '/api/cards'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Upload directories created successfully`);
});

module.exports = app;
