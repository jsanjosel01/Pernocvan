import type { RegisterData } from "../../interfaces/Profile";
import type { SessionUser } from "../../interfaces/SessionUser";
import type { UserRepository } from "../repositories/UserRepository";
import { supabase } from "../supabase/Client";


export class SupabaseUserRepository implements UserRepository {

    async createUser(data: RegisterData): Promise<{ data?: SessionUser; error?: any }> {

        try {

            if (!data.email || !data.password || !data.username) {
                return { error: { message: 'Email, nombre de usuario y contraseña son obligatorios' } }
            }

            // 1️⃣ Crear usuario en Auth, si la operación es correcta, obtenemos los datos de la autenticación que lo llamaremos authData
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            })

            // Ejemplos comunes: "Usuario ya registrado", "La contraseña debe tener x carácteres", etc.
            // Faltaría verificar si el email ya está en uso antes de seguir
            if (authError) {
                return { error: authError }
            }

            if (!authData.user) {
                return { error: { message: 'No se pudo crear el usuario en Auth' } }
            }

            //  -> A partir de aquí, el registro se ha hecho correctamente en Auth

            // Y obtenemos de authData el usuario creado y la sesión (posible por no necesitar confirmación de email)
            const user = authData.user
            const session = authData.session;
            console.log('Sesión actual:', session)


            // 2️⃣ Crear su perfil en la tabla `profiles`
            const { data: profileData, error: profileError } = await supabase
                .from('Profiles')
                .insert({
                    id: user.id, // FK hacia auth.users, es aquí donde se enlazan ambas tablas: auth y profiles
                    username: data.username,
                    avatar_url: data.avatar_url ?? null
                    
                })
                .select()
                .single()

            if (profileError) {
                // Borrar el usuario de auth si falla el perfil
                await supabase.auth.admin.deleteUser(user.id);
                return { error: profileError }
            }

            // 3️⃣ Devolver la sesión combinada (tabla Auth + tabla Profiles)
            const sessionUser: SessionUser = {
                user,
                profile: profileData,
            }

            return { data: sessionUser }

        } catch (error) {
            console.error('Error en SupabaseUserRepository.createUser:', error)
            return { error }
        }

    }

    async login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }> {

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) {
            return { error: authError };
        }

        if (!authData.user) {
            return { error: { message: 'No se recibió usuario después del login' } };
        }

        const { data: profile, error: profileError } = await supabase
            .from('Profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();


        if (profileError) {
            // Cerrar sesión si no se encuentra el perfil
            await supabase.auth.signOut();
            return { error: profileError };
        }

        const sessionUser: SessionUser = {
            user: authData.user,
            profile: profile
        };

        return { data: sessionUser };

    }


    async logout(): Promise<{ error?: any }> {
        const { error } = await supabase.auth.signOut();
        return { error : error || null };
    }

    
    async resetPasswordForEmail(email: string): Promise<{ error?: any }> {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email, {
      redirectTo: "https://.../reset-password"
    });
    return { error: error || null };
  }

  
    async fetchRole(userId: string): Promise<{ data?: string | null, error?: any }>{
    const { data: dataRole, error: fetchRoleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (fetchRoleError) {
      return { data: null, error: fetchRoleError };
    }

    return { data: dataRole?.role || null, error: null };
  }
    

}
