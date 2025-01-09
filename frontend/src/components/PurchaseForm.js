// Ruta: frontend/src/components/PurchaseForm.js

// Componente React para el formulario de registro de compras
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography, Divider, MenuItem } from '@mui/material';

function PurchaseForm() {
  // Datos iniciales del formulario
  const initialFormData = {
    supplierId: '',
    currency: '', // Almacena 'soles' o 'dolares'
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

  const [formData, setFormData] = useState(initialFormData); // Estado para los datos del formulario
  const [suppliers, setSuppliers] = useState([]); // Estado para la lista de proveedores

  // Cargar proveedores al montar el componente
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/suppliers'); // Endpoint para proveedores
        setSuppliers(response.data); // Actualiza proveedores
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en los detalles de productos
  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newDetail = [...formData.detail];
    newDetail[index][name] = value;
    setFormData({ ...formData, detail: newDetail });
  };

  // Agregar un nuevo producto a la lista de detalles
  const addProduct = () => {
    setFormData({
      ...formData,
      detail: [
        ...formData.detail,
        { quantity: 0, code: '', description: '', unitPrice: 0 },
      ],
    });
  };

  // Eliminar un producto de la lista de detalles
  const removeProduct = (index) => {
    const newDetail = formData.detail.filter((_, i) => i !== index);
    setFormData({ ...formData, detail: newDetail });
  };

  // Calcular totales antes de impuestos y el IGV
  const calculateBeforeTax = () => {
    const total = formData.detail.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    setFormData({ ...formData, beforeTax: total, IGV: total * 0.18 });
  };

  // Manejar el envío del formulario
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
      {/* Título del formulario */}
      <Typography variant="h4" gutterBottom>
        Formulario de Compras
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Campos principales */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Moneda"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <MenuItem value="soles">Soles</MenuItem>
              <MenuItem value="dolares">Dólares</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Emisión"
              InputLabelProps={{ shrink: true }}
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Información de la compra */}
        <Divider sx={{ mt: 2, mb: 2 }}>Información de la compra</Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Proveedor"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              required
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Factura"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Razón Social"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Detalles del producto */}
        <Divider sx={{ my: 2 }}>Detalles del producto</Divider>
        {formData.detail.map((item, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Cantidad"
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
                label="Código"
                name="code"
                value={item.code}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={item.description}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Precio Unitario"
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
                Eliminar
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button variant="contained" color="primary" onClick={addProduct} sx={{ mt: 2 }}>
          Agregar Producto
        </Button>

        {/* Totales */}
        <Divider sx={{ my: 2 }}>Totales</Divider>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subtotal"
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
        <Button variant="contained" color="secondary" onClick={calculateBeforeTax} sx={{ mt: 2 }}>
          Calcular Totales
        </Button>
        <Button type="submit" variant="contained" color="success" sx={{ mt: 2, ml: 2 }}>
          Crear Compra
        </Button>
      </form>
    </Paper>
  );
}

export default PurchaseForm;
