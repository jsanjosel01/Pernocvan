import { useAuthStore } from '../../stores/authStore'; // 1. Importar el store

const ProfileInfo = () => {
  // 2. Obtener el usuario de la sesión guardada
  const sessionUser = useAuthStore((state) => state.sessionUser);

  // 3. Mapear los datos. Usamos '?' (optional chaining) por si el usuario es null
  const user = {
    // El nombre viene de la tabla 'profiles'
    name: sessionUser?.profile?.username || "Usuario Desconocido",
    // El email viene de la autenticación de Supabase
    email: sessionUser?.user?.email || "Sin correo",
    // Si tienes avatar en la base de datos, úsalo; si no, usa el predeterminado
    avatar: sessionUser?.profile?.avatar_url || "/img/avatar2.png"
  };

  return (
    <div className="p-[2px] rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 max-w-[400px] mx-auto my-10 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-shadow duration-500">
      <div className="text-center p-10 rounded-[calc(1.5rem-2px)] bg-slate-900 h-full w-full backdrop-blur-xl">

        <div className="relative w-40 h-40 mx-auto mb-6 group">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-fuchsia-500/50 animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-fuchsia-500 transition-colors duration-300 z-10 relative bg-slate-800">
            <img
              src={user.avatar} // Usamos la variable dinámica aquí
              alt="Avatar de usuario"
              className="w-full h-full object-cover block opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Usamos las variables dinámicas aquí */}
        <h2 className="mt-4 text-white text-4xl font-extrabold tracking-tight mb-2">
          {user.name}
        </h2>
        <p className="text-violet-300 text-sm font-medium bg-violet-500/10 inline-block px-4 py-1 rounded-full">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;