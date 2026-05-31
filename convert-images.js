import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processImage(inputPath, outputPath, options = {}) {
  try {
    let pipeline = sharp(inputPath);
    if (options.resize) {
      pipeline = pipeline.resize(options.resize.width, options.resize.height, { fit: 'cover' });
    }
    
    let tempPath = outputPath;
    if (inputPath === outputPath) {
      tempPath = outputPath + '.tmp';
    }

    await pipeline.webp({ quality: options.quality || 80 }).toFile(tempPath);
    
    if (inputPath !== outputPath) {
      fs.unlinkSync(inputPath); // Delete old file (e.g., .png or .jpg)
    } else {
      // Overwriting existing webp
      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, outputPath);
    }
    console.log(`Processed: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function processDirectory(dir, options = {}) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const inputPath = path.join(dir, file);
      const name = path.basename(file, ext);
      const outputPath = path.join(dir, `${name}.webp`);
      
      if (ext === '.webp' && !options.forceRecompress) {
         const stat = fs.statSync(inputPath);
         if (stat.size < 100 * 1024) continue; // Skip optimized webps
      }
      
      await processImage(inputPath, outputPath, options);
    }
  }
}

async function main() {
  console.log("Starting image conversion...");

  console.log("Processing public/team...");
  await processDirectory(path.join(__dirname, 'public', 'team'), { resize: { width: 400, height: 400 }, forceRecompress: true });

  console.log("Processing public/image.png...");
  const publicImg = path.join(__dirname, 'public', 'image.png');
  if (fs.existsSync(publicImg)) {
    await processImage(publicImg, path.join(__dirname, 'public', 'image.webp'));
  }

  console.log("Processing src/assets...");
  await processDirectory(path.join(__dirname, 'src', 'assets'));

  console.log("Processing src/Pages/about...");
  const aboutDir = path.join(__dirname, 'src', 'Pages', 'about');
  if (fs.existsSync(path.join(aboutDir, 'd1.jpg'))) {
    // High quality for about image
    await processImage(path.join(aboutDir, 'd1.jpg'), path.join(aboutDir, 'd1.webp'), { quality: 95 });
  } else if (fs.existsSync(path.join(aboutDir, 'd1.png'))) {
    await processImage(path.join(aboutDir, 'd1.png'), path.join(aboutDir, 'd1.webp'), { quality: 95 });
  }

  console.log("Image conversion complete.");
}

main();
