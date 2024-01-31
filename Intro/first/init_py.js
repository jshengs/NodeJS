const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');
const fs = require('fs').promises;
const app = express();

// Set up static file serving from the 'first' directory
app.use(express.static('first'));

app.get('/removebg', async (req, res) => {
  try {
    const imageURL = req.query.image; // Get the image link from the query parameters

    // Download the image from the provided link
    const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
    const inputBuffer = Buffer.from(response.data);

    // Save the downloaded image temporarily
    const tempInputPath = path.join(__dirname, 'tempInput.png');
    await fs.writeFile(tempInputPath, inputBuffer);

    // Define the output path
    const outputPath = path.join(__dirname, `output4_${Date.now()}.png`);

    // Absolute path to the Python script
    const pythonScriptPath = path.join(__dirname, 'init_py.py');

    // Spawn the Python process
    const pythonProcess = spawn('python', [pythonScriptPath, tempInputPath, outputPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);

      // Remove the temporary input file
      try {
        await fs.unlink(tempInputPath);
        console.log(`Deleted temporary input file: ${tempInputPath}`);
      } catch (unlinkError) {
        console.error(`Error deleting temporary input file: ${unlinkError.message}`);
      }

      if (code === 0) {
        // Send a response to the client
        res.send('Background removed successfully!');
      } else {
        res.status(500).send('Error processing image.');
      }
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
