// Archivo: frontend/src/components/SupplierForm.js

import React, { useState } from 'react';
import SupplierFormView from './SupplierFormView'; // Importar el componente de vista

// Componente principal para manejar la lógica del formulario
export default function SupplierForm() {
  // Estado inicial para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: '',
    },
    contactPerson: {
      name: '',
      phone: '',
      email: '',
    },
  });

  // Manejar los cambios en los campos de texto
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Manejar los cambios en los campos anidados (dirección o persona de contacto)
  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  // Manejar la acción del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    try {
      const response = await fetch('http://localhost:3001/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Proveedor registrado con éxito');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            country: '',
            postalCode: '',
          },
          contactPerson: {
            name: '',
            phone: '',
            email: '',
          },
        });
      } else {
        console.error('Error al registrar el proveedor:', await response.text());
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
    }
  };

  // Renderizar el componente de vista con las props necesarias
  return (
    <SupplierFormView
      formData={formData}
      handleChange={handleChange}
      handleNestedChange={handleNestedChange}
      handleSubmit={handleSubmit}
    />
  );
}
