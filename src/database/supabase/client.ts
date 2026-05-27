import { createClient } from '@supabase/supabase-js';


// Obtenemos las variables de entorno definidas en tu archivo .env
const supabaseUrl = "https://iwynpyhkulbnifarfmqt.supabase.co";
const supabaseAnonKey = "sb_publishable_MxdlGbo6HbUmVLtDzZBqGw_ffhAA_1W";

// Validación básica para asegurarnos de que las claves están configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase. Revisa tu archivo .env");
}

// Creamos y exportamos la instancia de supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);