// Ruta: backend/routes/purchases.js

const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new purchase
router.post('/', async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
