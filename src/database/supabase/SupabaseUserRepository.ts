import type { SessionUser } from "../../interfaces/SessionUser";
import type { UserRepository } from "../repositories/UserRepository";
import { supabase } from "./client";


export const SupabaseUserRepository: UserRepository = {
    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return { data: null, error };

        // Aquí transformamos el usuario de Supabase a tu formato 'SessionUser'
        const user: SessionUser = {
            profile: {
                id: data.user.id,
                email: data.user.email!,
            }
        };

        return { data: user, error: null };
    },

    fetchRole: async (userId: string) => {
        const { data, error } = await supabase
            .from('perfiles') // Nombre tabla
            .select('rol')    // Nombre columna
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error("Error Supabase:", error.message);
            return { data: 'usuario' }; 
        }

        // Retorna 'administrador' o 'usuario'
        return { data: data?.rol || 'usuario' }; 
    }
};