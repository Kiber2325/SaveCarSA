import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from '../../Images/logo.png';
import "./inicio.css";

import '../landingPage/lading.css'


import "../landingPage/lading.css";
import "./NavLogin.css";
import { onValue, ref } from "firebase/database";
import { database } from "../../conexion/firebase";
const Navlogin = () => {
  const [inboxCount, setInboxCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, 'solicitudes'), (snapshot) => {
      const messages = snapshot.val();
      const newCount = Object.values(messages).reduce(
        (count, message) => count + message.unread,
        0
      );
      setInboxCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <header className="Encabezado2">
        <section>
          <div>
            <Link to="/">
              <img className="image" src={logo} alt="log" />
            </Link>
          </div>
        </section>

        <section className="navegarnav">

            <div className="d-flex justify-content-end">
           
            <div className="sesion" >
                <a className= "Consultas"  href="/Home" >Inicio</a>
             </div>
           
           
           
            <div className="sesion" >
                <a className= "Consultas"  href="/ConsultasAdmin" >Consultas</a>
             </div>

             <div className="sesion" >
                <a className= "Quejas"  href="/QuejasAdmin" >Quejas</a>
             </div>
             <div className="sesion" >
                <a className= "Quejas"  href="/Solicitudes" >Solicitudes {inboxCount}</a>
             </div>
             <div className="sesion">
                <a  className= "cliente"  href="/Clientes" >Clientes</a>
             </div>
            
             <div className="sesion">
              <a clasName="cliente" href="/Ingresos">
                Ingresos{" "}
              </a>
            </div>
                        
             <div className="sesion">
                <a className="Cerrar" href="/">Cerrar Sesion</a>
             </div>


            </div>
          </section>
        </header>
    </div>
  );
};

export default Navlogin;
