import React from 'react';
// Importamos los componentes que acabas de rellenar
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';

export const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Bloque principal de bienvenida */}
      <Hero />

      {/*  Bloque de características y servicios */}
      <Features />

      
    </div>
  );
};