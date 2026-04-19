import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50 border-b border-border">
      <div className="header-content flex justify-between items-center p-4">
        
        <div className="logo-section">
            <h1 className="text-2xl font-bold text-primary">
              Prenocvan 
            </h1>
        </div>

        <div className="auth-actions flex gap-3">
          <Link to="/login">
            <button className="px-4 py-2 text-primary border border-primary rounded hover:bg-primary/10 transition">
              Iniciar Sesión
            </button>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 text-primary-foreground bg-primary rounded hover:bg-primary/90 transition">
              Registrarse
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
};