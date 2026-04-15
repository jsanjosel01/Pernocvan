import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      <Header />
      {/* El 'main' crece para empujar el footer abajo si hay poco contenido */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};