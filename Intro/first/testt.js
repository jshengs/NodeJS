const express = require('express');
const app = express();
const PORT = 3000; // Choose a port

app.get('/', (req, res) => {
    console.log('Server is running'); // Add this line
    res.send('Done');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

