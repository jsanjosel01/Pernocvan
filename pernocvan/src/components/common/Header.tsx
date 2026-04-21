import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50 border-b border-border">
      <div className="header-content flex justify-between items-center p-4">
        
        <div className="logo-section">
            <h1 className="text-2xl font-bold text-primary">
              Pernocvan
            </h1>
        </div>

        <div className="auth-actions flex gap-3">
          <Link to="/login">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Iniciar Sesión
            </Button>
          </Link>

          <Link to="/signup">
            <Button>
              Registrarse
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
};