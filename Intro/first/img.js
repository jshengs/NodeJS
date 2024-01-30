const fs = require('fs');
const pureimage = require('pureimage');

const inputImagePath = 'selfie.jpeg';
const outputImagePath = 'output_removed_background.png';

const threshold = 160; // Adjust the threshold as needed
const backgroundColor = { r: 255, g: 255, b: 255, a: 0 }; // White with alpha 0 for transparent

// Load the image
const img = pureimage.decodeJPEGFromStream(fs.createReadStream(inputImagePath));

img.then((image) => {
  // Create a new image with a transparent background
  const newImage = pureimage.make(image.width, image.height);
  const ctx = newImage.getContext('2d');

  // Draw the original image onto the new canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Get the pixel data
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  // Iterate through each pixel
  for (let i = 0; i < data.length; i += 4) {
    const intensity = (data[i] + data[i + 1] + data[i + 2]) / 3;

    // Set pixel to transparent if below the threshold
    if (intensity > threshold) {
      data[i] = backgroundColor.r;
      data[i + 1] = backgroundColor.g;
      data[i + 2] = backgroundColor.b;
      data[i + 3] = backgroundColor.a;
    }
  }

  // Put the modified pixel data back into the image context
  ctx.putImageData(imageData, 0, 0);

  // Save the new image with the removed background
  pureimage.encodePNGToStream(newImage, fs.createWriteStream(outputImagePath)).then(() => {
    console.log('Background removed successfully.');
  }).catch((error) => {
    console.error('Error saving image:', error.message);
  });
}).catch((error) => {
  console.error('Error loading image:', error.message);
});
