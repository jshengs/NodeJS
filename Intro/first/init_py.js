// http://localhost:7000/removebg?image=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpzMBv4i3ODy7leCs0-jtpHrOBCXJqmB8cQ&usqp=CAU

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');
const fs = require('fs').promises;
const app = express();

app.use(express.static('first'));

app.get('/removebg', async (req, res) => {
  try {
    const imageURL = req.query.image; 

    const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
    const inputBuffer = Buffer.from(response.data);

    const tempInputPath = path.join(__dirname, 'tempInput.png');
    await fs.writeFile(tempInputPath, inputBuffer);

    const outputPath = path.join(__dirname, `output4_${Date.now()}.png`);

    const pythonScriptPath = path.join(__dirname, 'init_py.py');

    const pythonProcess = spawn('python', [pythonScriptPath, tempInputPath, outputPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);

      try {
        await fs.unlink(tempInputPath);
        console.log(`Deleted temporary input file: ${tempInputPath}`);
      } catch (unlinkError) {
        console.error(`Error deleting temporary input file: ${unlinkError.message}`);
      }

      if (code === 0) {
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
