// Ruta: frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PurchaseForm from './components/PurchaseForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>ERP Management</h1>
          {/* Menú de navegación */}
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/purchases">Formulario de Compras</Link></li>
            </ul>
          </nav>
        </header>

        {/* Definición de rutas */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchases" element={<PurchaseForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
