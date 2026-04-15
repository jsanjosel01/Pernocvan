import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { createUserRepository } from '../../database/repositories';
import Button from '../ui/Button';

const Navbar = () => {

  const { isAuthenticated, clearSession } = useAuthStore();
  const userRepository = createUserRepository();

  const navigate = useNavigate();

  const logout = async () => {

    try {
      const result = await userRepository.logout();
      if (result.error) {
        toast.error('Error al cerrar sesión');
        return;
      }
			// Limpiamos sesión usando la función del store y redirigimos a otra página
      clearSession();
      navigate('/');

    } catch (error) {
      toast.error('Ocurrió un error inesperado');
      console.log(error);
    }
  }

  return (
          <nav>
            <Link to="/">Inicio</Link>

            {isAuthenticated ? (
                <>
                    <Link to="/products">Productos</Link>
                    <Link to="/profile">Perfil</Link>
                    <Link to="/items">Items</Link>
                    <Link to="/bears">Osos</Link>

                    <Button variant="primary" onClick={logout}>Cerrar sesión</Button>
                </>
            ) : (
                <>
                    <Button variant="primary"><Link to="/signup">Registrarse</Link></Button>
                    <Button variant="primary"><Link to="/signin">Iniciar sesión</Link></Button>

                    <Button variant="primary"><Link to="/dashboardpage">Grafico</Link></Button>

                </>
            )}

        </nav>
    );
}


export default Navbar;