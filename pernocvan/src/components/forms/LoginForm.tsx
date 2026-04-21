import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // <--- ESTADO PARA EL OJO
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsLoading(false);
    };

    return (
    
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
    <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-6xl rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
        {/* Header */}
        <div className="mb-6 space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Acceder</h1>
            <p className="text-lg text-muted-foreground">Introduce tus credenciales para acceder</p>
        </div>

        <div className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Correo electrónico <span className="text-red-500">*</span>
                </label>
                <Input 
                    className="h-12 text-lg" 
                    type="email" 
                    placeholder="tucorreo@gmail.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
            
            {/* Contraseña */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                        Contraseña <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* INPUT Y OJO */}
                <div className="relative">
                    <Input 
                        className="h-12 text-lg pr-14"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 8 caracteres" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    {/* Botón del ojo */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>
                
                {/* Link */}
                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        ¿Has olvidado tu contraseña?
                    </Link>
                </div>
            </div>
        </div>

        <Button className="mt-6 h-12 w-full text-lg font-semibold" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta? {" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
                Regístrate
            </Link>
        </p>
    </form>
</div>
);
}