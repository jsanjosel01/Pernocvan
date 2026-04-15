import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";
import Button from "../ui/Button";
import InputField from "./InputField";
import { createUserRepository } from "../../database/repositories";
import type { RegisterData } from "../../interfaces/Profile";
import { isEmailTaken } from "../../database/supabase/RPCs/isEmailTaken";

interface FormDataProps {
  avatar_url?: string | undefined;
  avatar_file?: File;
  username: string;
  email: string;
  name: string;
  age: number;
  password: string;
}

interface ErrorsProps {
  name: string;
  age: string;
  password: string;
  email: string;
}

export default function SimpleForm() {
  const userRepository = createUserRepository();

  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    age: 0,
    password: "",
    email: "",
    username: "",
    avatar_url: "",
    
  });


  const [errors, setErrors] = useState<ErrorsProps>({
    name: "",
    age: "",
    password: "",
    email: "",
  });


  // Actualiza el valor del campo mientras el usuario escribe.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Valida el campo cuando el usuario sale de él (pierde el foco).
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };


   const handleEmailBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const error = validateField("email", e.target.value);
    setErrors((prev) => ({ ...prev, email: error }));
    if (error) return;

    const taken = await isEmailTaken(e.target.value);
    if (taken) {
      setErrors((prev) => ({ ...prev, email: "Este correo electrónico ya está registrado" }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      age: validateField("age", formData.age.toString()),
      password: validateField("password", formData.password),
      email: validateField("email", formData.email),
    };
    setErrors(newErrors);

    // Comprueba si hay algún valor en el array newErrors (true si hay alguno)
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      alert("Formulario válido ✅");
      const newUser: RegisterData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        avatar_url: "",
        
      }
      userRepository.createUser(newUser);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">


      <InputField
        label="Nombre"
        name="name"
        type="text"
        value={formData.name}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}>
      </InputField>

            <InputField
        label="Usuario"
        name="username"
        type="username"
        value={formData.username}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}>
      </InputField>

        {/* <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}>
      </InputField> */}


      <InputField 
      label="Edad" 
      name="age" 
      type="number" 
      value={formData.age} 
      autoComplete="off" 
      onChange={handleChange}
      onBlur={handleBlur} 
      error={errors.age}
      >
      </InputField>


      <InputField 
      label="Contraseña" 
      name="password" 
      type="password" 
      value={formData.password} 
      autoComplete="off"
      onChange={handleChange} 
      onBlur={handleBlur} error={errors.password}
      >
        
      </InputField>


    <InputField label="Email" name="email" type="email" autoComplete="off"
      value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} error={errors.email}
    />

      <Button type="submit">Enviar</Button>
    </form>
  );
}