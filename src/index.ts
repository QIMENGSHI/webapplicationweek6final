import express from 'express';
import mongoose from 'mongoose';
import { Offer } from './models/Offer';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Image } from './models/Image';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
const dbUri = 'mongodb://127.0.0.1:27017/testdb';

mongoose.connect(dbUri)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images'); // Save images in the "public/images" directory
    },
    filename: (req, file, cb) => {
      const originalName = path.parse(file.originalname).name.replace(/\s+/g, '_'); // Remove spaces
      const extension = path.extname(file.originalname); // Get file extension
      const uniqueId = uuidv4(); // Generate unique ID
      cb(null, `${originalName}_${uniqueId}${extension}`);
    },
  });
  const upload = multer({ storage });
  
// POST Route
app.post('/upload', upload.single('image'), async (req, res) => {
    try {

        console.log('Request Body:', req.body); // Log the form data
        console.log('Uploaded File:', req.file); // Log the uploaded file data
        const { title, description, price } = req.body;

        let imageId;

        if (req.file) {
            const image = new Image({
              filename: req.file.filename,
              path: `/images/${req.file.filename}`,
            });
            const savedImage = await image.save();
            imageId = savedImage._id; // Get the image ID
          }
      
          // Save the offer
          const offer = new Offer({ title, description, price, imageId });
          await offer.save();
      
          res.status(201).send('Offer and image saved successfully!');
        } catch (error) {
          console.error('Error saving offer or image:', error);
          res.status(500).send('Failed to save offer and image');
        }
        
        
        
});



// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
