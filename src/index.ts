import express from 'express';
import mongoose from 'mongoose';
import { Offer } from './models/Offer';

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

// POST Route
app.post('/upload', async (req, res) => {
    
        const { title, description, price } = req.body;
        console.log("data reviced", req.body);
        const offer = new Offer({ title, description, price });
        await offer.save();
        res.status(201).send('Offer created successfully!');
});



// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
