import React from "react";
import logo from '../Images/logo.png';
import { Link } from "react-router-dom";


const Navegacion = () => {
  return (
    <div>
      <header className="Encabezado">
        <Link to="/">
            <img className="image" src={logo} alt="logo"/>
        </Link>
        
        </header>
    </div>
  );
}
export default Navegacion;