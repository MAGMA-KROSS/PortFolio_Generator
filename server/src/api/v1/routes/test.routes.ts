import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Example schema to test MongoDB connection
const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Test = mongoose.model('Test', testSchema);

// POST route to add a test document
router.post('/', async (req, res) => {
  try {
    const newItem = new Test(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Data aa gya hein guys!', data: newItem });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET route to fetch all test documents
router.get('/', async (_req, res) => {
  try {
    const items = await Test.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;

