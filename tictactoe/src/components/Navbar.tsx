import { Link } from "react-router-dom";

export default function Navbar(){

    return(
        
        <nav>
        <Link to="/">Inicio</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/board">Tablero</Link>
        </nav>
        
    )
}