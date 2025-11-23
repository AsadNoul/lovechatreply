# LoveChatReply API Documentation

## Overview

LoveChatReply is an API for managing love stories, pickup lines, profile pictures, and generating romantic image cards.

## Base URL

```
http://localhost:3000
```

## Features

1. **Upload images with love stories**
2. **Share images with pickup lines**
3. **Store profile pictures**
4. **Generate image cards with text**

---

## Endpoints

### Love Stories

#### Upload a Love Story with Image

**POST** `/api/love-stories/upload`

Upload a single love story with an image.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `image` (file, required): The image file
  - `title` (string, optional): Title of the love story
  - `story` (string, required): The love story text
  - `author` (string, optional): Author name (default: "Anonymous")
  - `tags` (string, optional): Comma-separated tags

**Example:**
```bash
curl -X POST http://localhost:3000/api/love-stories/upload \
  -F "image=@/path/to/image.jpg" \
  -F "title=Our First Date" \
  -F "story=It was a beautiful evening when we first met..." \
  -F "author=John" \
  -F "tags=romance,firstdate,love"
```

#### Upload Multiple Love Stories

**POST** `/api/love-stories/upload-multiple`

Upload multiple love stories with images at once.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `images` (files, required): Multiple image files
  - `stories` (string, optional): JSON array or pipe-separated stories
  - `author` (string, optional): Author name

#### Get All Love Stories

**GET** `/api/love-stories`

Retrieve all love stories with optional filtering.

**Query Parameters:**
- `tag` (string, optional): Filter by tag
- `author` (string, optional): Filter by author
- `limit` (number, optional): Maximum number of results (default: 50)

**Example:**
```bash
curl http://localhost:3000/api/love-stories?tag=romance&limit=10
```

#### Get a Specific Love Story

**GET** `/api/love-stories/:id`

Retrieve a specific love story by ID.

#### Delete a Love Story

**DELETE** `/api/love-stories/:id`

Delete a love story and its associated images.

---

### Pickup Lines

#### Upload a Pickup Line with Image

**POST** `/api/pickup-lines/upload`

Upload a pickup line with an image.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `image` (file, required): The image file
  - `line` (string, required): The pickup line text
  - `category` (string, optional): Category (default: "general")
  - `author` (string, optional): Author name (default: "Anonymous")

**Example:**
```bash
curl -X POST http://localhost:3000/api/pickup-lines/upload \
  -F "image=@/path/to/image.jpg" \
  -F "line=Are you a magician? Because whenever I look at you, everyone else disappears." \
  -F "category=funny" \
  -F "author=Romeo"
```

#### Upload Multiple Pickup Lines

**POST** `/api/pickup-lines/upload-multiple`

Upload multiple pickup lines with images.

#### Get All Pickup Lines

**GET** `/api/pickup-lines`

Retrieve all pickup lines.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `author` (string, optional): Filter by author
- `limit` (number, optional): Maximum number of results (default: 50)
- `sortBy` (string, optional): Sort by "recent" or "popular" (default: "recent")

#### Get a Random Pickup Line

**GET** `/api/pickup-lines/random`

Get a random pickup line.

#### Share a Pickup Line

**POST** `/api/pickup-lines/:id/share`

Increment the share count for a pickup line.

**Example:**
```bash
curl -X POST http://localhost:3000/api/pickup-lines/{id}/share
```

#### Delete a Pickup Line

**DELETE** `/api/pickup-lines/:id`

---

### Profiles

#### Create a Profile with Picture

**POST** `/api/profiles/create`

Create a user profile with an optional profile picture.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `profilePicture` (file, optional): Profile picture image
  - `username` (string, required): Username
  - `bio` (string, optional): Bio/description
  - `interests` (string, optional): Comma-separated interests
  - `relationshipStatus` (string, optional): Relationship status (default: "single")

**Example:**
```bash
curl -X POST http://localhost:3000/api/profiles/create \
  -F "profilePicture=@/path/to/photo.jpg" \
  -F "username=JohnDoe" \
  -F "bio=Love enthusiast and hopeless romantic" \
  -F "interests=music,travel,romance" \
  -F "relationshipStatus=single"
```

#### Update Profile Picture

**PUT** `/api/profiles/:id/picture`

Update the profile picture for an existing profile.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `profilePicture` (file, required): New profile picture

#### Get All Profiles

**GET** `/api/profiles`

Retrieve all profiles.

**Query Parameters:**
- `relationshipStatus` (string, optional): Filter by relationship status
- `limit` (number, optional): Maximum number of results (default: 50)

#### Get a Specific Profile

**GET** `/api/profiles/:id`

#### Update Profile Information

**PUT** `/api/profiles/:id`

Update profile information (excluding picture).

**Request:**
- Content-Type: `application/json`
- Body:
  - `username` (string, optional)
  - `bio` (string, optional)
  - `interests` (string, optional)
  - `relationshipStatus` (string, optional)

#### Delete a Profile

**DELETE** `/api/profiles/:id`

---

### Image Card Generator

#### Generate a Text-Only Card

**POST** `/api/cards/generate`

Generate an image card with text overlay.

**Request:**
- Content-Type: `application/json`
- Body:
  - `text` (string, required): The text to display on the card
  - `colorScheme` (string, optional): Color scheme - options: romantic, passionate, sweet, elegant, modern, vintage, cool, warm (default: "romantic")
  - `width` (number, optional): Card width in pixels (default: 800)
  - `height` (number, optional): Card height in pixels (default: 600)
  - `fontSize` (number, optional): Font size (default: 48)
  - `fontFamily` (string, optional): Font family (default: "Arial")

**Example:**
```bash
curl -X POST http://localhost:3000/api/cards/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "You are my sunshine",
    "colorScheme": "romantic",
    "width": 800,
    "height": 600,
    "fontSize": 52
  }'
```

#### Generate a Card with Background Image

**POST** `/api/cards/generate-with-image`

Generate a card with a custom background image and text overlay.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `backgroundImage` (file, required): Background image
  - `text` (string, required): Text to overlay
  - `width` (number, optional): Card width (default: 800)
  - `height` (number, optional): Card height (default: 600)
  - `fontSize` (number, optional): Font size (default: 48)
  - `textColor` (string, optional): Text color hex code (default: "#ffffff")

**Example:**
```bash
curl -X POST http://localhost:3000/api/cards/generate-with-image \
  -F "backgroundImage=@/path/to/background.jpg" \
  -F "text=Forever and Always" \
  -F "fontSize=56" \
  -F "textColor=#ffd700"
```

#### Generate a Random Pickup Line Card

**POST** `/api/cards/random-pickup`

Automatically generate a card with a random pickup line.

**Example:**
```bash
curl -X POST http://localhost:3000/api/cards/random-pickup
```

#### Generate a Love Quote Card

**POST** `/api/cards/love-quote`

Generate a card with a love quote.

**Request:**
- Content-Type: `application/json`
- Body:
  - `quote` (string, optional): Custom quote (if not provided, a random quote is used)

**Example:**
```bash
curl -X POST http://localhost:3000/api/cards/love-quote \
  -H "Content-Type: application/json" \
  -d '{"quote": "You are my today and all of my tomorrows"}'
```

#### Get All Generated Cards

**GET** `/api/cards`

**Query Parameters:**
- `type` (string, optional): Filter by card type (text-only, with-background, random-pickup, love-quote)
- `limit` (number, optional): Maximum number of results (default: 50)

#### Get a Specific Card

**GET** `/api/cards/:id`

#### Delete a Card

**DELETE** `/api/cards/:id`

---

## Color Schemes

Available color schemes for card generation:

- **romantic**: Pink background (#ff69b4) with white text
- **passionate**: Crimson background (#dc143c) with white text
- **sweet**: Light pink background (#ffb6c1) with dark red text
- **elegant**: Burgundy background (#800020) with gold text
- **modern**: Pink background (#e91e63) with white text
- **vintage**: Gold background (#d4af37) with dark brown text
- **cool**: Royal blue background (#4169e1) with white text
- **warm**: Tomato background (#ff6347) with white text

---

## Response Format

### Success Response

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## File Upload Limits

- Maximum file size: 5MB
- Supported image formats: JPEG, JPG, PNG, GIF, WebP

---

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

---

## Notes

- All uploaded images are automatically resized and optimized
- Thumbnails are generated for all uploaded images
- Profile pictures are standardized to 400x400 pixels
- Generated cards are saved in PNG format
- Data is stored in JSON files in the `data/` directory
- For production use, replace JSON storage with a proper database
