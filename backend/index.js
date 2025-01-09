// Ruta: erp-i9/backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta principal: Página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Ruta para el formulario de compras
app.get('/purchases', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/purchases.html'));
});

// Rutas de la API

// Cargar rutas para compras
const purchasesRoutes = require('./routes/purchases');
app.use('/api/purchases', purchasesRoutes);

// Cargar rutas para proveedores
const suppliersRoutes = require('./routes/suppliers'); // Asegúrate de crear este archivo en "routes"
app.use('/api/suppliers', suppliersRoutes); // Todas las rutas relacionadas con suppliers estarán en este endpoint



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
