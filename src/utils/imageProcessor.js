const sharp = require('sharp');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * Resize and optimize an image
 */
const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw new Error(`Image resize failed: ${error.message}`);
  }
};

/**
 * Create a thumbnail from an image
 */
const createThumbnail = async (inputPath, outputPath, size = 200) => {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 70 })
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw new Error(`Thumbnail creation failed: ${error.message}`);
  }
};

/**
 * Generate an image card with text overlay
 */
const generateImageCard = async (options) => {
  const {
    text,
    backgroundColor = '#ff69b4',
    textColor = '#ffffff',
    width = 800,
    height = 600,
    backgroundImage = null,
    fontSize = 48,
    fontFamily = 'Arial'
  } = options;

  try {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw background
    if (backgroundImage && fs.existsSync(backgroundImage)) {
      const img = await loadImage(backgroundImage);
      ctx.drawImage(img, 0, 0, width, height);
      // Add semi-transparent overlay for better text readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, width, height);
    } else {
      // Solid color background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Word wrap functionality
    const maxWidth = width - 100;
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw lines centered
    const lineHeight = fontSize * 1.2;
    const startY = (height - (lines.length * lineHeight)) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + (index * lineHeight) + fontSize / 2);
    });

    // Save the image
    const outputPath = path.join('./uploads/generated-cards', `${uuidv4()}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  } catch (error) {
    throw new Error(`Card generation failed: ${error.message}`);
  }
};

/**
 * Add watermark to an image
 */
const addWatermark = async (inputPath, watermarkText, outputPath) => {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const watermarkSvg = Buffer.from(`
      <svg width="${metadata.width}" height="${metadata.height}">
        <text
          x="50%"
          y="95%"
          text-anchor="middle"
          font-size="20"
          fill="white"
          fill-opacity="0.5"
          font-family="Arial"
        >
          ${watermarkText}
        </text>
      </svg>
    `);

    await image
      .composite([{
        input: watermarkSvg,
        gravity: 'southeast'
      }])
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    throw new Error(`Watermark addition failed: ${error.message}`);
  }
};

module.exports = {
  resizeImage,
  createThumbnail,
  generateImageCard,
  addWatermark
};
