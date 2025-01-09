const express = require('express');
const Supplier = require('../models/supplier');
const router = express.Router();

// Ruta para crear un nuevo proveedor
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.status(400).json({ message: 'Error al crear el proveedor', error });
  }
});

module.exports = router;
