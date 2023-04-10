import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';


import '../landingPage/lading.css'

const Navlogin = () => {

  return (
    <div>

      <header className="Encabezado2">
    
      <section>
            <div>
            <Link to="/">
                <img className="image" src={logo} alt="logo"/>
            </Link>
            </div>
        </section>

        <section className="navegarnav">
            <div>
            <div className="navcli">
                {/* <a clasName= "cliente" href="/" >Clientes </a> */}
                </div>

                <div className="sesion">
                <Link className="Cerrar" to="/">Cerrar Sesion</Link>
                </div>
            </div>
            

           

        </section>



        
        </header>
    </div>
  );
}
/*<a className="inicio" href="/iniciosesion">Iniciar Sesión</a> */
export default Navlogin;