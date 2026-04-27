import { useEffect, useState } from "react";
import { supabase } from "../database/supabase/client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AvatarUploader } from "../components/ui/AvatarUploader";

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "",
        full_name: "",
        address: "",
        avatar_url: "",
        favorite_places: "",
        rol: "",
        van_model: "",
        bio: "",
    });
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState<string | undefined>(undefined); // Nuevo estado para el ID
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [memberSince, setMemberSince] = useState("");

    // Función para obtener los datos desde Supabase
    async function fetchProfile() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id); // Guardamos el ID para el AvatarUploader
        setEmail(user.email || "");

        // Formateo de fecha
        if (user.created_at) {
            const date = new Date(user.created_at);
            setMemberSince(date.toLocaleDateString('es-ES'));
        }

        // Obtención de perfil
        const { data } = await supabase
            .from("perfiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (data) {
            setProfile({
                username: data.username || "",
                full_name: data.full_name || "",
                address: data.address || "",
                avatar_url: data.avatar_url || "",
                favorite_places: data.favorite_places || "",
                rol: data.rol || "",
                van_model: data.van_model || "",
                bio: data.bio || ""
            });
        }
        setLoading(false);
    }

    // Al cargar la página, traemos los datos
    useEffect(() => {
        fetchProfile();
    }, []);

    // Función de actualización
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // GUARDAMOS EN BASE DE DATOS
        const { error } = await supabase
            .from("perfiles")
            .update({ 
                username: profile.username,
                full_name: profile.full_name,
                address: profile.address,
                avatar_url: profile.avatar_url,
                favorite_places: profile.favorite_places,
                van_model: profile.van_model,
                bio: profile.bio
            })
            .eq("id", user.id);

        if (error) {
            toast.error("Error al actualizar: " + error.message);
        } else {
            toast.success("Perfil actualizado");
            // Nota: No llamamos a fetchProfile aquí para evitar el problema de "reinicio de datos"
        }
        setUpdating(false);
    };

    if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center">Cargando perfil...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-sm space-y-8" style={{ border: 'none' }}>
                    
                    {/* CABECERA */}
                    <div className="flex items-center justify-between pb-6 border-b">
                        <div className="space-y-2">
                            <div className="flex flex-col items-start gap-1 pt-1">
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wide w-fit">
                                    {profile.rol || "Usuario"}
                                </span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {profile.username || "Sin nombre"}
                            </h2>
                            {memberSince && (
                                <p className="text-sm text-gray-400">
                                    Miembro desde {memberSince}
                                </p>
                            )}
                        </div>

                        {/* avatar (Integrado con el nuevo componente) */}
                        <AvatarUploader
                            uid={userId}
                            url={profile.avatar_url}
                            onUpload={(url) => setProfile({ ...profile, avatar_url: url })}
                        />
                    </div>

                    {/* CAMPOS DE DATOS */}
                    <div className="space-y-6">
                        {/* Correo Electrónico */}
                        <div className="max-w-xs"> 
                            <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                Correo Electrónico 🔒
                            </label>
                            <Input disabled value={email} className="bg-gray-100 mt-1 cursor-not-allowed" />
                            <p className="text-[10px] text-gray-400 mt-1">Bloqueado por seguridad.</p>
                        </div>

                        {/* Nombre de usuario */}
                        <div className="max-w-sm">
                            <label className="text-sm font-medium text-gray-600">Nombre de usuario</label>
                            <Input 
                                value={profile.username} 
                                onChange={(e) => setProfile({...profile, username: e.target.value})} 
                                className="mt-1" 
                            />
                        </div>

                        {/* SECCIÓN 2: PERFIL PERSONAL */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Datos Personales</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Nombre</label>
                                    <Input value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})} className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Dirección</label>
                                    <Input value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="mt-1" placeholder="Ciudad, País" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: TU VIDA EN FURGO */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Tu vida en furgo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Mi Camper</label>
                                    <Input value={profile.van_model} onChange={(e) => setProfile({...profile, van_model: e.target.value})} className="mt-1" placeholder="Ej: VW California" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Lugares favoritos</label>
                                    <Input value={profile.favorite_places} onChange={(e) => setProfile({...profile, favorite_places: e.target.value})} className="mt-1" placeholder="Ej: Pirineos, Costa Brava..." />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-sm font-medium text-gray-600">Biografía</label>
                                <textarea 
                                    value={profile.bio} 
                                    onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    rows={3}
                                    placeholder="Cuéntanos un poco sobre ti y tus viajes..."
                                />
                            </div>
                        </div>
    
                        {/* Boton guardar cambios */}
                        <Button type="submit" disabled={updating} className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 transition-all rounded-full shadow-md">
                            {updating ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}