import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography, Divider } from '@mui/material';

function PurchaseForm() {
  const initialFormData = {
    invoiceNumber: '',
    paymentMethod: '',
    issueDate: '',
    businessName: '',
    address: '',
    beforeTax: 0,
    IGV: 0,
    detail: [
      {
        quantity: 0,
        code: '',
        description: '',
        unitPrice: 0,
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newDetail = [...formData.detail];
    newDetail[index][name] = value;
    setFormData({ ...formData, detail: newDetail });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      detail: [
        ...formData.detail,
        { quantity: 0, code: '', description: '', unitPrice: 0 },
      ],
    });
  };

  const removeProduct = (index) => {
    const newDetail = formData.detail.filter((_, i) => i !== index);
    setFormData({ ...formData, detail: newDetail });
  };

  const calculateBeforeTax = () => {
    const total = formData.detail.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    setFormData({ ...formData, beforeTax: total, IGV: total * 0.18 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/purchases', formData);
      console.log('Purchase created:', response.data);
      window.alert('Compra ha sido guardada');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating purchase:', error);
      window.alert('Error al guardar la compra');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Purchase Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Divider sx={{ mb: 2 }}>Información de la compra</Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Issue Date"
              InputLabelProps={{ shrink: true }}
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }}>Detalles del producto</Divider>
        {formData.detail.map((item, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Code"
                name="code"
                value={item.code}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={item.description}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeProduct(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addProduct}
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>

        <Divider sx={{ my: 2 }}>Totales</Divider>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Before Tax"
              value={formData.beforeTax}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="IGV (18%)"
              value={formData.IGV}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={calculateBeforeTax}
          sx={{ mt: 2 }}
        >
          Calculate Total
        </Button>
        <Button type="submit" variant="contained" color="success" sx={{ mt: 2, ml: 2 }}>
          Create Purchase
        </Button>
      </form>
    </Paper>
  );
}

export default PurchaseForm;
