import { useState, type ChangeEvent } from "react";
import Button from "../ui/Button";
import InputField from "./InputField";
import { createUserRepository } from "../../database/repositories";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

interface FormData {
    email: string;
    password: string;
}

function SignInForm() {

    const userRepository = createUserRepository();
    const store= useAuthStore(); //Para llamar a los datos del almacen

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await userRepository.login(formData.email, formData.password);

            if (result.error) {
                toast.error('Credenciales inválidas');
                return;
            }

            if (result.data) {

                // Guardar estado
                navigate('/profile');
                store.setSession(result.data) // llamar a la función
                toast.success(`¡Bienvenido ${result.data.profile?.username}!`);

            }

        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };


const resetPasswordForEmail = async () => {
    try {
      if(!formData.email){
        toast.error('Error al obtener el email');
        return;
      }

      const result = await userRepository.resetPasswordForEmail(formData.email);
      if (result.error) {
        toast.error('Error al restablecer la contraseña');
        return;
      }

      toast.success('Se ha enviado un enlace a tu correo');

    } catch (error) {
      toast.error('Ocurrió un error inesperado');
      console.log(error);
    }
  }
 

    
    return (
        <>
            <div>
                <Toaster />
            </div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                <InputField label="Email" name="email" type="email" autoComplete="off"
                    value={formData.email} onChange={handleChange}
                />
                <InputField label="Contraseña" name="password" type="password"
                    value={formData.password} onChange={handleChange}
                />
                <Button type="submit">{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Button>

                <Button onClick={resetPasswordForEmail}>Restablecer contraseña</Button>
               
            </form>
        </>
    );
}



export default SignInForm;
