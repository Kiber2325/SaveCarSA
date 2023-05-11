import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';
import "./inicio.css";

import '../landingPage/lading.css'

const Navlogin = () => {

  return (
    <div>

      <header className="Encabezado2">
    
      <section>
            <div>
            <Link to="/">
                <img className="image" src={logo} alt="log"/>
            </Link>
            </div>
        </section>

        <section className="navegarnav">
            <div className="d-flex justify-content-end">
            <div className="sesion" >
                <a className= "Consultas"  href="/Consultas" >Consultas</a>
             </div>

             <div className="sesion" >
                <a className= "Quejas"  href="/Quejas" >Quejas</a>
             </div>

             <div className="sesion">
                <a  className= "cliente"  href="/Clientes" >Clientes</a>
             </div>
                        
             <div className="sesion">
                <a className="Cerrar" href="/">Cerrar Sesion</a>
             </div>

            </div>
          </section>



        
        </header>
    </div>
  );
}
/*<a className="inicio" href="/iniciosesion">Iniciar Sesión</a> */
export default Navlogin;