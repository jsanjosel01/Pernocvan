
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-footer-bg text-neutral-300 border-t border-neutral-800">
            <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Columna 1: Logo y descripción */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Pernocvan</h2>
                    <p className="text-sm text-neutral-400">
                        Tu plataforma para descubrir los mejores lugares donde pernoctar con tu furgo.
                    </p>
                </div>

                {/* Columna 2: Navegación */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Cuenta</h3>
                  <ul className="space-y-2 text-sm">
                      <li><Link to="/signup" className="hover:text-primary transition-colors">Únete</Link></li>
                      <li><Link to="/login" className="hover:text-primary transition-colors">Inicia sesión</Link></li>
                      <li><Link to="/mapa" className="hover:text-primary transition-colors">Explorar Mapa</Link></li>
                  </ul>
              </div>

                {/* Columna 3: Legal */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-white">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/terms" className="hover:text-primary transition-colors">Términos y condiciones</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary transition-colors">Política de privacidad</Link></li>
                    </ul>
                </div>

                {/* Columna 4: Contacto */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-white">Contacto</h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li>pernocvan@gmail.com</li>
                        
                    </ul>
                </div>

            </div>

            {/* Pie inferior con el corazón */}
            <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-400 flex items-center justify-center gap-2">
                © {new Date().getFullYear()} Pernocvan 
                <Heart size={16} className="text-red-500 fill-red-500" /> 
                Todos los derechos reservados.
            </div>
        </footer>
    );
};