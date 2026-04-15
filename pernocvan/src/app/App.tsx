import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- Importamos los componentes de ruta
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage';

function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Ruta principal: muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </AppLayout>
  );
}

export default App;