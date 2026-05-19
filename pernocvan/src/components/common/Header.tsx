
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '../../database/supabase/client';
import type { Session } from '@supabase/supabase-js';

import { Map, Globe, Sun, Moon, Truck, LayoutDashboard, Users} from 'lucide-react';

export const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 
  const navigate = useNavigate();
  
  const location = useLocation(); // Detecta los cambios de página al vuelo

  // COMPROBACIÓN LIMPIA POR TU COLUMNA 'rol'
  const verificarRolAdmin = async (currentSession: Session | null) => {
    if (!currentSession || !currentSession.user) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', currentSession.user.id)
        .single();

      // Comprobamos que el rol sea exactamente 'administrador' como en tu SQL
      if (!error && data?.rol === 'administrador') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Error al verificar el rol:", err);
      setIsAdmin(false);
    }
  };

  // Escucha a Supabase (Login, Logout y sesión inicial)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      verificarRolAdmin(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSession(null);
        setIsAdmin(false);
        return;
      }

      setSession(currentSession);
      verificarRolAdmin(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  
  // Cada vez que cambies de página, obligamos a verificar el rol de nuevo
  useEffect(() => {
    if (session) {
      verificarRolAdmin(session);
    }
  }, [location.pathname, session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/login');
  };

  // CANDADO VISUAL: Si la URL del navegador está en la recuperación, apagón total de botones admin
  const ocultarPorRuta = location.pathname.includes('reset-password');


  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex justify-between items-center py-4 px-6">
        
        {/* SECCIÓN IZQUIERDA: LOGO */}
        <div className="logo-section">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Truck className="w-7 h-7 text-primary" strokeWidth={2.5} />
            <h3 className="text-2xl font-bold text-primary">VanLife</h3>
          </Link>
        </div>

        {/* SECCIÓN DERECHA: COMPONENTES */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* HERRAMIENTAS GENERALES */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" asChild className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground h-9 px-3">
              <Link to="/mapa"><Map className="h-4 w-4" /><span className="text-sm font-medium hidden sm:inline">Mapa</span></Link>
            </Button>
            <Button variant="ghost" className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground h-9 px-3" title="Cambiar idioma">
              <Globe className="h-4 w-4" /><span className="text-sm font-medium hidden sm:inline">ES</span>
            </Button>
            <Button variant="ghost" size="icon" className="cursor-pointer text-muted-foreground hover:text-foreground h-9 w-9" title="Cambiar tema">
              <Sun className="h-4 w-4 dark:hidden" /><Moon className="h-4 w-4 hidden dark:block" />
            </Button>
          </div>

          {/* CONTROL DE FLUJO POR SESIÓN */}
          {session ? (
            <>
              <div className="h-5 w-[1px] bg-border mx-2 self-center opacity-80" />

              {/* DASHBOARD */}
              {isAdmin && !ocultarPorRuta && (
                <Button variant="ghost" asChild className="cursor-pointer gap-2 text-[#e03b4b] hover:text-red-700 font-bold h-9 px-3 bg-red-500/5 hover:bg-red-500/10 rounded-full">
                  <Link to="/admin/dashboard"><LayoutDashboard className="h-4 w-4" /></Link>
                </Button>
              )}

              {/* GESTIÓN USUARIOS */}
              {isAdmin && !ocultarPorRuta && (
                <Button variant="ghost" asChild className="cursor-pointer gap-2 text-[#e03b4b] hover:text-red-700 font-bold h-9 px-3 bg-red-500/5 hover:bg-red-500/10 rounded-full">
                  <Link to="/admin"><Users className="h-4 w-4" /></Link>
                </Button>
              )}

              <Button variant="outline" className="cursor-pointer border-border text-foreground h-9 px-4 hover:bg-accent">
                <Link to="/profile">Mi Perfil</Link>
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="cursor-pointer h-9 px-4 active:scale-95">
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <div className="h-5 w-[1px] bg-border mx-2 self-center opacity-80" />
              <Button variant="outline" asChild className="cursor-pointer border-border text-foreground h-9 px-4 hover:bg-accent">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild className="cursor-pointer bg-primary text-primary-foreground h-9 px-5 font-medium shadow-sm hover:opacity-90">
                <Link to="/signup">Registrarse</Link>
              </Button>
            </>
          )}

        </div>
      </div>
    </header>
  );
};