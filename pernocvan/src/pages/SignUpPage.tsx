// src/pages/SignUpPage.tsx
import SignUpForm from "../components/forms/SignUpForm";

export const SignUpPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background py-12 px-6 pb-40">
            <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 space-y-2 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Crea una cuenta</h1>
                    <p className="text-lg text-muted-foreground">Únete a Prenocvan para empiezar a viajar</p>
                </div>
                
                {/* Componente del registro */}
                <SignUpForm />
            </div>
        </div>
    );
};