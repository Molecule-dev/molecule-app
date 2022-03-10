/**
 * Generates icons and splash images based on `src/App/Logo.svg` for every platform.
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const iconGen = require('icon-gen')

const logoSVGPath = path.join(__dirname, '../src/App/Logo.svg')
const logoSVG = fs.readFileSync(logoSVGPath)

const publicPath = path.join(__dirname, `../public`)
const logosPath = path.join(publicPath, `images/logos`)

// Ensure each directory exists.
const directories = [
  logosPath
]

for (const directory of directories) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
    console.info(`Created directory: ${directory}`)
  }
}

/**
 * Converts the SVG logo to a PNG of a specific size,
 * one with the original transparent background,
 * and another with a white background.
 */
const writePNG = async (size) => {
  // Write the PNG with transparent background (assuming it is transparent).
  await sharp(logoSVG, { density: 3200 })
    .resize(size, size)
    .png()
    .toFile(path.join(logosPath, `logo${size}.png`))

  console.info(`Generated image: ${path.join(logosPath, `logo${size}.png`)}`)

  // Write the PNG with a white background (assuming it is transparent).
  await sharp(logoSVG, { density: 3200 })
    .resize(size, size)
    .png()
    .flatten({ background: `white` })
    .toFile(path.join(logosPath, `logo${size}-white.png`))

  console.info(`Generated image: ${path.join(logosPath, `logo${size}-white.png`)}`)
}

const sizes = [
  16,
  32,
  48,
  64,
  96,
  128,
  240,
  256,
  360,
  480,
  512,
  640,
  720,
  960,
  1024,
  192,
  420,
  512,
  640,
  750,
  1024,
  1125,
  1242,
  1536,
  1668,
  2048
]

const generateImages = async () => {
  try {
    // Write all sizes.
    for (const size of sizes) {
      await writePNG(size)
    }

    // Write the `favicon.ico` to `public` for various sizes up to 256.
    iconGen(logoSVGPath, publicPath)
    console.info(`Generated favicon.ico`)
  } catch (error) {
    console.error(error)
  }
}

generateImages()
