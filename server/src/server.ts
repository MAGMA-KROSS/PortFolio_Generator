import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;  // Backend will run on 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    
    // Start the server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });
