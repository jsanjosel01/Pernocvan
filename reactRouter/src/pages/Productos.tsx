import { useEffect, useState } from "react"
import type { Product } from "../interfaces/Product"
import { createProductRepository } from "../database/repositories"

function Productos() {
  const [productos, setProductos] = useState<Product[]>([])
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')

  // 1. Creamos la instancia del repositorio
  const productRepository = createProductRepository();

  const insertarProducto = async () => {
    //2. Sólo tenemos que cambiar la consulta
    const { data, error } = await productRepository.createProduct({
      nombre,
      precio: parseFloat(precio),
      descripcion,
    })

    if (error) {
      console.error(error)
      alert('Error al insertar')
    } else {
      alert('Producto añadido correctamente 🎉')
      console.log(data)
      obtenerProductos()
    }
  }

  const obtenerProductos = async () => {
    const { data, error } = await productRepository.getAllProducts()

    if (error) {
      console.error(error)
      alert('Error al insertar')
    } else {
      alert('Producto añadido correctamente 🎉')
      console.log(data)
      setProductos(data)
    }
  }

  // ¿Qué problema nos da?
  //obtenerProductos();

  // Posible solución (Se ejecuta solo una vez, cuando el componente se monta)
  // Posible problema: Que el componente se esté montando continuamente debido al router
  // Solución a esto: Usar un contexto que permita conservar los datos
  // Un contexto suele ser útil si sus datos guardados se usan en varios sitios
  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h2>Añadir producto</h2>
        <input type="text" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
        <input type="number" placeholder="Precio" onChange={e => setPrecio(e.target.value)} />
        <input type="text" placeholder="Descripción" onChange={e => setDescripcion(e.target.value)} />
        <button onClick={insertarProducto}>Guardar</button>
      </div>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> — {producto.precio} € <br />
            <small>{producto.descripcion}</small>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Productos
