const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

const upload = multer({ storage: storage });

// Route for uploading files
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  // Send a response indicating success
  res.send('File uploaded successfully.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});






