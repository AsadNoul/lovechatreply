# LoveChatReply

An app for pickup lines, love stories, and romantic image sharing. Share your love story, find the perfect pickup line, and create beautiful image cards with text!

## Features

✨ **Upload Images with Love Stories**
- Share your love story with beautiful images
- Tag and categorize your stories
- Browse stories by author or tags

💘 **Share Images with Pickup Lines**
- Upload creative pickup lines with images
- Track share counts for popular lines
- Get random pickup lines for inspiration
- Filter by category

👤 **Store Profile Pictures**
- Create user profiles with profile pictures
- Automatic image optimization and resizing
- Thumbnail generation
- Update profile information

🎨 **Generate Image Cards with Text**
- Create beautiful cards with custom text
- Multiple color schemes (romantic, passionate, elegant, etc.)
- Add background images to your cards
- Generate random pickup line cards
- Create love quote cards

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AsadNoul/lovechatreply.git
cd lovechatreply
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Love Stories
- `POST /api/love-stories/upload` - Upload a love story with image
- `POST /api/love-stories/upload-multiple` - Upload multiple love stories
- `GET /api/love-stories` - Get all love stories
- `GET /api/love-stories/:id` - Get a specific love story
- `DELETE /api/love-stories/:id` - Delete a love story

### Pickup Lines
- `POST /api/pickup-lines/upload` - Upload a pickup line with image
- `POST /api/pickup-lines/upload-multiple` - Upload multiple pickup lines
- `GET /api/pickup-lines` - Get all pickup lines
- `GET /api/pickup-lines/random` - Get a random pickup line
- `POST /api/pickup-lines/:id/share` - Share a pickup line
- `DELETE /api/pickup-lines/:id` - Delete a pickup line

### Profiles
- `POST /api/profiles/create` - Create a profile with picture
- `PUT /api/profiles/:id/picture` - Update profile picture
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get a specific profile
- `PUT /api/profiles/:id` - Update profile information
- `DELETE /api/profiles/:id` - Delete a profile

### Image Card Generator
- `POST /api/cards/generate` - Generate a text-only card
- `POST /api/cards/generate-with-image` - Generate a card with background image
- `POST /api/cards/random-pickup` - Generate a random pickup line card
- `POST /api/cards/love-quote` - Generate a love quote card
- `GET /api/cards` - Get all generated cards
- `DELETE /api/cards/:id` - Delete a card

## Quick Examples

### Upload a Love Story
```bash
curl -X POST http://localhost:3000/api/love-stories/upload \
  -F "image=@photo.jpg" \
  -F "story=Our beautiful love story..." \
  -F "author=John"
```

### Upload a Pickup Line
```bash
curl -X POST http://localhost:3000/api/pickup-lines/upload \
  -F "image=@pickup.jpg" \
  -F "line=Are you a magician? Because whenever I look at you, everyone else disappears."
```

### Create a Profile
```bash
curl -X POST http://localhost:3000/api/profiles/create \
  -F "profilePicture=@profile.jpg" \
  -F "username=JohnDoe" \
  -F "bio=Love enthusiast"
```

### Generate an Image Card
```bash
curl -X POST http://localhost:3000/api/cards/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "You are my sunshine", "colorScheme": "romantic"}'
```

## Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Multer** - File upload handling
- **Sharp** - Image processing and optimization
- **Canvas** - Image card generation
- **UUID** - Unique ID generation

## Directory Structure

```
lovechatreply/
├── src/
│   ├── controllers/        # Request handlers
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── uploads/               # Uploaded files
│   ├── love-stories/
│   ├── pickup-lines/
│   ├── profiles/
│   └── generated-cards/
├── data/                  # JSON data storage
├── package.json
└── README.md
```

## Configuration

Environment variables (`.env`):
```
PORT=3000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for love and romance
