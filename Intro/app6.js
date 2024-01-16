var express = require('express');
var app = express();

const multer = require('multer');
const path = require('path');

// Include gm library



app.set('view engine', 'ejs');

app.listen(3000);


app.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'Ninja', hobbies:['eating', 'fighting', 'fishing']};
    res.render('screen1', {person: req.params.name, data: data});
});


// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/'); // Specify the directory for storing uploaded files
    },
    filename: (req, file, callback) => {
      // Set the filename to be unique by appending a timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });


  // Serve HTML form for uploading files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  // Handle file upload
  app.post('/upload', upload.single('image'), (req, res) => {
    // req.file contains information about the uploaded file
    // You can save the file path to a database or perform other operations here
    res.send('File uploaded successfully!');
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });