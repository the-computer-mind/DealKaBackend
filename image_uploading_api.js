const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = "9856";

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// File filter function for multer
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, and PNG files are allowed.'));
  }
};

// Initialize multer upload
const upload = multer({ storage, fileFilter });

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Route to check if the server is running
app.get('/something', (req, res) => {
  console.log('Server is running on port 9856');
  res.send('Server is running');
});

// Handle POST request for file upload
app.post('/upload', upload.array('images', 10), (req, res) => {
    console.log("get file requst");
  if (!req.files || req.files.length === 0) {
    res.status(400).send('No files uploaded.');
    return;
  }

  const uploadedImages = req.files.map((file) => {
    const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + file.filename;
    console.log('Received image upload:', file.filename);
    return imageUrl;
  });

  res.send(`Images uploaded successfully. Access them at: ${uploadedImages}`);
});

// Handle POST request for deleting images
app.post('/images/delete', (req, res) => {
  const imageLinks = Array.isArray(req.body.imageLinks) ? req.body.imageLinks : [req.body.imageLinks];

  imageLinks.forEach((link) => {
    const imagePath = path.join(__dirname, 'uploads', path.basename(link));

    try {
      fs.unlinkSync(imagePath);
      console.log('Image deleted:', link);
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  });

  res.send('Images deleted successfully.');
});

// Handle POST request for updating images
app.post('/images/update', upload.single('image'), (req, res) => {
  const imageLinks = Array.isArray(req.body.imageLinks) ? req.body.imageLinks : [req.body.imageLinks];
  const updatedImageFile = req.file;

  imageLinks.forEach((link) => {
    const imagePath = path.join(__dirname, 'uploads', path.basename(link));

    try {
      fs.unlinkSync(imagePath);
      console.log('Old image deleted:', link);

      const updatedImageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + updatedImageFile.filename;
      console.log('Image updated:', link, '->', updatedImageUrl);
    } catch (err) {
      console.error('Error updating image:', err);
    }
  });

  res.send('Images updated successfully.');
});

// Start the server
app.listen(port, "192.168.46.136", () => {
  console.log(`Server running on port ${port}`);
});