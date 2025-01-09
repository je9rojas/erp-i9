// Archivo: frontend/src/components/SupplierFormView.js

import React from 'react';

export default function SupplierFormView({
  formData,
  handleChange,
  handleNestedChange,
  handleSubmit,
}) {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h2>Registrar Proveedor</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Información del Proveedor */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Nombre del Proveedor</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <label htmlFor="email" className="form-label mt-3">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <label htmlFor="phone" className="form-label mt-3">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            {/* Dirección */}
            <div className="mb-4">
              <h4>Dirección</h4>
              <label htmlFor="street" className="form-label">Calle</label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={formData.address.street}
                onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
              />
              <label htmlFor="city" className="form-label mt-3">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={formData.address.city}
                onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
              />
              <label htmlFor="country" className="form-label mt-3">País</label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={formData.address.country}
                onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
              />
              <label htmlFor="postalCode" className="form-label mt-3">Código Postal</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                value={formData.address.postalCode}
                onChange={(e) => handleNestedChange('address', 'postalCode', e.target.value)}
              />
            </div>

            {/* Persona de Contacto */}
            <div className="mb-4">
              <h4>Persona de Contacto</h4>
              <label htmlFor="contactName" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="contactName"
                value={formData.contactPerson.name}
                onChange={(e) => handleNestedChange('contactPerson', 'name', e.target.value)}
              />
              <label htmlFor="contactPhone" className="form-label mt-3">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="contactPhone"
                value={formData.contactPerson.phone}
                onChange={(e) => handleNestedChange('contactPerson', 'phone', e.target.value)}
              />
              <label htmlFor="contactEmail" className="form-label mt-3">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="contactEmail"
                value={formData.contactPerson.email}
                onChange={(e) => handleNestedChange('contactPerson', 'email', e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">Guardar Proveedor</button>
          </form>
        </div>
      </div>
    </div>
  );
}
