import { useState, type ChangeEvent } from "react";

// Hacer interfaz para los errores
interface errorsProps{
    name: string;
    email: string;
}


export default function ControlledForm(){
    // const [nombre, setNombre]= useState('');
    // const [email, setEmail]= useState('');

    const [formData, setFormData]= useState({
        nombre:"",
        email:"",
        
    // ... 
    });


    // Un estado que inicialmente esta vacio
    const [errors, setErrors] = useState<errorsProps>({
        name:"El nombres es..",
        email:"",
    });

    // Función para el nombre
    // const handleName= (event:any)=>{
    //     // sí el event es del input nombre
    //     setNombre(event.target.value);

    // };

    // // Función para el email
    // const handleEmail= (event:any)=>{
    //     // Sino, es del input email
    //     setEmail(event.target.value);

    // };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    
    };


    return (
        <>

        <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
        />
        {/* // Si existe se imprime, y sino no se imprime */}
        {errors.name && <div className="error">{errors.name}</div>}

        <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        </>
    )
}
