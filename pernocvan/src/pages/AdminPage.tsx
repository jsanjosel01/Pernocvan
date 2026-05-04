import { supabase } from "@/database/supabase/client";
import { RefreshCw, Search, Trash2, Save, X, MapPin, Truck, Info } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";

export const AdminPage = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any | null>(null);
  const [editando, setEditando] = useState(false);

  const cargarUsuarios = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('perfiles').select('*').order('created_at', { ascending: false });
    if (!error) setUsuarios(data || []);
    setLoading(false);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => { cargarUsuarios(); }, []);

  // UPDATE EXTENDIDO: Guardar cambios desde el Inspector
  const guardarCambios = async () => {
    const { error } = await supabase
      .from('perfiles')
      .update({
        full_name: usuarioSeleccionado.full_name,
        address: usuarioSeleccionado.address,
        van_model: usuarioSeleccionado.van_model,
        bio: usuarioSeleccionado.bio
      })
      .eq('id', usuarioSeleccionado.id);

    if (!error) {
      toast.success("Perfil actualizado globalmente");
      setEditando(false);
      cargarUsuarios();
    } else {
      toast.error("Error al actualizar");
    }
  };

  const eliminarUsuario = async (id: string) => {
    if (!confirm("¡Atención! Esto eliminará al usuario de la base de datos y su acceso.")) return;
    const { error } = await supabase.from('perfiles').delete().eq('id', id);
    if (!error) {
      toast.success("Usuario y acceso eliminados");
      setUsuarioSeleccionado(null);
      cargarUsuarios();
    }
  };

  return (
    <div className="bg-background pt-10 pb-40 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700">
      {/* HEADER DINÁMICO */}
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">Gestión de Usuarios</h2>
        </div>
        <button onClick={cargarUsuarios} className="p-3 bg-secondary rounded-xl hover:rotate-180 transition-all duration-500">
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="group relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Filtrar por nombre, usuario, modelo o ciudad..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-muted bg-card focus:border-primary outline-none transition-all shadow-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* TABLA */}
      <div className="grid grid-cols-1 gap-4">
        {usuarios.filter(u => JSON.stringify(u).toLowerCase().includes(busqueda.toLowerCase())).map((u) => (
          <div key={u.id} className="bg-card border-2 border-muted p-4 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-all group">
            <div className="flex items-center gap-4">
              <img src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}`} className="h-12 w-12 rounded-xl object-cover shadow-md" />
              <div>
                <h3 className="font-bold text-lg leading-none">{u.username}</h3>
                <p className="text-sm text-muted-foreground">{u.full_name || 'Sin nombre completo'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${u.rol === 'administrador' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                {u.rol}
              </span>
              <button 
                onClick={() => setUsuarioSeleccionado(u)}
                className="bg-foreground text-background px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 cursor-pointer transition-transform"
              >
                Gestionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Menu lateral (CREATE/READ/UPDATE/DELETE) */}  
    {usuarioSeleccionado && (
    <>
    <div className="fixed inset-0 h-screen w-screen bg-background/60 backdrop-blur-sm z-40" onClick={() => setUsuarioSeleccionado(null)} />

    <div className="fixed top-0 right-0 h-screen w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            
        <div className="flex justify-end items-center p-5 pb-2">
        <button onClick={() => setUsuarioSeleccionado(null)} className="p-1 hover:bg-muted rounded-full cursor-pointer transition-colors">
            <X className="h-5 w-5" />
        </button>
    </div>

    {/* Contenedor del contenido - flex-1 para que rellene todo el espacio vertical */}
    <div className="flex-1 overflow-y-auto px-5 pb-5 custom-scrollbar">
        
        {/* Datos del usuario */}
        <header className="text-center space-y-2 py-2">
          <img 
            src={usuarioSeleccionado.avatar_url || `https://ui-avatars.com/api/?name=${usuarioSeleccionado.username}`} 
            className="h-20 w-20 rounded-2xl mx-auto shadow-lg border-2 border-primary object-cover" 
          />
          <div>
             <input 
               disabled={!editando}
               className="text-xl font-black text-center bg-transparent w-full outline-none focus:text-primary disabled:opacity-100"
               value={usuarioSeleccionado.full_name || ""}
               onChange={(e) => setUsuarioSeleccionado({...usuarioSeleccionado, full_name: e.target.value})}
             />
             <p className="text-xs text-primary font-mono">@{usuarioSeleccionado.username}</p>
          </div>
        </header>

        {/* Sección de datos en GRID de 2 columnas para ahorrar espacio vertical */}
        <section className="flex flex-col gap-4">
          {/* Ubicación */}
          <div className={`p-4 rounded-xl border transition-all duration-200 ${
              editando 
                  ? 'bg-background border-primary shadow-sm ring-1 ring-primary/20' 
                  : 'bg-secondary/40 border-border/50'
          }`}>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary/70 uppercase tracking-tight mb-1">
                  <MapPin className="h-3 w-3"/> UBICACIÓN
              </div>
              <input 
                  disabled={!editando}
                  className="w-full bg-transparent text-sm font-semibold outline-none focus:text-primary disabled:cursor-default"
                  placeholder="Ej: Madrid, España..."
                  value={usuarioSeleccionado.address || ""}
                  onChange={(e) => setUsuarioSeleccionado({...usuarioSeleccionado, address: e.target.value})}
              />
          </div>

          {/* Vehículo */}
          <div className={`p-4 rounded-xl border transition-all duration-200 ${
              editando 
                  ? 'bg-background border-primary shadow-sm ring-1 ring-primary/20' 
                  : 'bg-secondary/40 border-border/50'
          }`}>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary/70 uppercase tracking-tight mb-1">
                  <Truck className="h-3 w-3"/> VEHÍCULO
              </div>
              <input 
                  disabled={!editando}
                  className="w-full bg-transparent text-sm font-semibold outline-none focus:text-primary disabled:cursor-default placeholder:italic"
                  placeholder="Ej: Renault Kangoo..."
                  value={usuarioSeleccionado.van_model || ""}
                  onChange={(e) => setUsuarioSeleccionado({...usuarioSeleccionado, van_model: e.target.value})}
              />
          </div>

          {/* Biografía */}
          <div className={`p-4 rounded-xl border transition-all duration-200 ${
              editando 
                  ? 'bg-background border-primary shadow-sm ring-1 ring-primary/20' 
                  : 'bg-secondary/40 border-border/50'
          }`}>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary/70 uppercase tracking-tight mb-1">
                  <Info className="h-3 w-3"/> BIOGRAFÍA
              </div>
              <textarea 
                  disabled={!editando}
                  className="w-full bg-transparent text-sm font-semibold outline-none focus:text-primary resize-none h-24 disabled:cursor-default placeholder:italic custom-scrollbar"
                  placeholder="Cuéntanos algo sobre este viajero..."
                  value={usuarioSeleccionado.bio || ""}
                  onChange={(e) => setUsuarioSeleccionado({...usuarioSeleccionado, bio: e.target.value})}
              />
          </div>
      </section>

        {/* Footer de botones */}
        <footer className="pt-2 space-y-2">
          {!editando ? (
            <button onClick={() => setEditando(true)} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer">Editar Perfil</button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={guardarCambios} className="py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all shadow-lg shadow-green-900/20"><Save className="h-4 w-4"/> Guardar</button>
              <button onClick={() => setEditando(false)} className="py-2.5 bg-secondary/50 border border-border text-foreground rounded-xl text-sm font-bold active:scale-95 cursor-pointer hover:bg-secondary transition-all">Cancelar</button>
            </div>
          )}
          {/* <button 
            onClick={() => eliminarUsuario(usuarioSeleccionado.id)} 
            className="w-full py-2 text-destructive/70 hover:text-destructive text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="h-3 w-3" /> Borrar Usuario
          </button> */}

          {/* Botón que abre el modal */}
          <button onClick={() => setShowDeleteConfirm(true)} className="w-full mt-4 py-2.5 border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
            <Trash2 className="h-3.5 w-3.5" /> Borrar Usuario
          </button>


        {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
        {showDeleteConfirm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
                
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDeleteConfirm(false)} />
                
                {/* Contenedor del Modal */}
                <div className="relative bg-card border border-border w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="text-center space-y-4">
                        <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-destructive">
                            <Trash2 className="h-8 w-8" />
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="text-xl font-black tracking-tight">¿Quieres eliminar al viajero?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Estás a punto de borrar a <span className="font-bold text-foreground">@{usuarioSeleccionado.username}</span>. 
                                ¿Estás seguro? Eliminará todos sus datos.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                        {/* Botón de Confirmar */}
                        <button onClick={() => {
                                eliminarUsuario(usuarioSeleccionado.id);
                                setShowDeleteConfirm(false);
                            }}
                            className="w-full py-3 bg-destructive text-white border border-white/10 rounded-2xl font-bold hover:bg-red-600 transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-900/20"
                        >
                            Sí, eliminar definitivamente
                        </button>

                        {/* Botón de Cancelar */}
                        <button onClick={() => setShowDeleteConfirm(false)} className="w-full py-3 bg-secondary/50 text-foreground border border-border rounded-2xl font-bold hover:bg-secondary transition-all active:scale-95 cursor-pointer"
                        >
                            No, cancelar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )}
        </footer>

      </div>
    </div>
    
  </>
)}
    </div>
    </div>
  );
};