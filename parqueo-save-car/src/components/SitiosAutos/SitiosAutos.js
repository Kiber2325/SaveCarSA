import React, { useEffect, useState } from 'react'
import './SitiosAutos.css';
import Sitio from '../Sitio/Sitio';
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import ShowSitios from './componentes/ShowSitios';

const SitiosAutos = () => {
const [dataArr, setDataArr] = useState([]);
useEffect(()=>{
  getData()
},[]);
function getData() {
  onValue(ref(database, 'sitiosAutos'), (snapshot) => {
    const dataObj = snapshot.val();
    const dataArr = Object.values(dataObj);
    setDataArr(dataArr);
  });
}
  return (
    <div>
<header className='header'>
<section>
            <div>
            <Link to="/">
                <img className="image" src={logo} alt="log"/>
            </Link>
            </div>
        </section>
        <div className='medio'>

        </div>
        <section className="navegarnav">
            <div>

                <div className="cerrarSesionGuardia">
                <a className="Cerrar" href="/">Cerrar Sesion</a>
                </div>
            </div>
            

           

        </section>
</header>
<div className='cuerpo'>
{dataArr.map((sitio)=>(
    <Sitio
      nombre={sitio.nombre}
      estado={sitio.estado}
    />
  ))}
</div>
<div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default SitiosAutos