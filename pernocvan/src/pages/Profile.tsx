import { useEffect, useState } from "react";
import { supabase } from "../database/supabase/client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AvatarUploader } from "../components/old/AvatarUploader";

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

    const [formData, setFormData] = useState({ ...profile });
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [memberSince, setMemberSince] = useState("");

    async function fetchProfile() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);
        setEmail(user.email || "");

        if (user.created_at) {
            const date = new Date(user.created_at);
            setMemberSince(date.toLocaleDateString('es-ES'));
        }

        const { data } = await supabase
            .from("perfiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (data) {
            const loadedData = {
                username: data.username || "",
                full_name: data.full_name || "",
                address: data.address || "",
                avatar_url: data.avatar_url || "",
                favorite_places: data.favorite_places || "",
                rol: data.rol || "",
                van_model: data.van_model || "",
                bio: data.bio || ""
            };
            setProfile(loadedData);
            setFormData(loadedData);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from("perfiles")
            .update({ 
                username: formData.username,
                full_name: formData.full_name,
                address: formData.address,
                avatar_url: formData.avatar_url,
                favorite_places: formData.favorite_places,
                van_model: formData.van_model,
                bio: formData.bio
            })
            .eq("id", user.id);

        if (error) {
            toast.error("Error al actualizar: " + error.message);
        } else {
            toast.success("Perfil actualizado");
            setProfile(formData);
        }
        setUpdating(false);
    };

    if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center">Cargando perfil...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-32 px-4">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleUpdate} className="w-full rounded-2xl border border-gray-200 bg-white p-10 shadow-lg space-y-8">

                    {/* CABECERA */}
                    <div className="flex items-center justify-between pb-6 border-b">
                        <div className="space-y-2">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wide w-fit">
                                {profile.rol || "Usuario"}
                            </span>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {profile.username || "Sin nombre"}
                            </h2>
                            {memberSince && (
                                <p className="text-sm text-gray-400">
                                    Miembro desde {memberSince}
                                </p>
                            )}
                        </div>

                        <AvatarUploader
                            uid={userId}
                            url={formData.avatar_url}
                            onUpload={(url) => setFormData({ ...formData, avatar_url: url })}
                        />
                    </div>

                    {/* CAMPOS DE DATOS */}
                    <div className="space-y-6">
                        <div className="max-w-xs"> 
                            <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                Correo Electrónico 🔒
                            </label>
                            <Input disabled value={email} className="bg-gray-100 mt-1 cursor-not-allowed" />
                            <p className="text-[10px] text-gray-400 mt-1">Bloqueado por seguridad.</p>
                        </div>

                        <div className="max-w-sm">
                            <label className="text-sm font-medium text-gray-600">Nombre de usuario</label>
                            <Input 
                                value={formData.username} 
                                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                className="mt-1" 
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Datos Personales</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Nombre</label>
                                    <Input value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Dirección</label>
                                    <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="mt-1" placeholder="Ciudad, País" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Tu vida en furgo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Mi Camper</label>
                                    <Input value={formData.van_model} onChange={(e) => setFormData({...formData, van_model: e.target.value})} className="mt-1" placeholder="Ej: VW California" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Lugares favoritos</label>
                                    <Input value={formData.favorite_places} onChange={(e) => setFormData({...formData, favorite_places: e.target.value})} className="mt-1" placeholder="Ej: Pirineos, Costa Brava..." />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="text-sm font-medium text-gray-600">Biografía</label>
                                <textarea 
                                    value={formData.bio} 
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})} 
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    rows={3}
                                    placeholder="Cuéntanos un poco sobre ti y tus viajes..."
                                />
                            </div>
                        </div>
    
                        <Button type="submit" disabled={updating} className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 transition-all rounded-full shadow-md">
                            {updating ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}