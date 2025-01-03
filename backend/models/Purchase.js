// Ruta: backend/models/Purchase.js

const mongoose = require('mongoose');

// Schema for the details of purchase items
const purchaseDetailSchema = new mongoose.Schema({
  quantity: { type: Number, required: true }, // Quantity of the product
  code: { type: String, required: true }, // Product code
  description: { type: String, required: true }, // Product description
  unitPrice: { type: Number, required: true }, // Unit price of the product
});

// Main schema for purchases
const purchaseSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Types.ObjectId, required: false, ref: 'Supplier' }, // Supplier ID
  invoiceNumber: { type: String, required: true }, // Invoice number
  paymentMethod: { type: String, required: true }, // Payment method
  currencyId: { type: mongoose.Types.ObjectId, required: false, ref: 'Currency' }, // Currency ID
  issueDate: { type: Date, required: true }, // Date of issuance
  businessName: { type: String, required: true }, // Business name
  address: { type: String, required: true }, // Business address
  detail: { type: [purchaseDetailSchema], required: true }, // Details of the purchase items
  beforeTax: { type: Number, required: true }, // Total amount before tax
  IGV: { type: Number, required: true }, // Tax (IGV)
  creationDate: { type: Date, default: Date.now }, // Date of record creation
});

module.exports = mongoose.model('Purchase', purchaseSchema);
