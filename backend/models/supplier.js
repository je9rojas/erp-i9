//Archivo: backend/models/supplier.js

const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  contactPerson: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
