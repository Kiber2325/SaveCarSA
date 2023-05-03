import React, { useEffect, useState } from 'react'
import './SitiosAutos.css';
import Sitio from '../Sitio/Sitio';
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import {  ref, onValue } from "firebase/database";
import { database } from '../../firebase';
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import ShowSitios from './componentes/ShowSitios';

const SitiosAutos = () => {
  /*const tableRef = ref(database, "sitiosAutos");
  const dataSitios=[]
  const [dataRecuperados,setDataRecuperados]=useState(dataSitios)
  */
  useEffect(()=>{
    getData()
  },[]);
  
  /*const obtenerSitios=()=>{
    onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      setDataRecuperados(data)
     // console.log(data); // Aquí puedes hacer algo con los datos obtenidos
    });
  }*/
  const [dataArr, setDataArr] = useState([]);
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
<Sitio
  nombre='A1'
/> 
<Sitio
  nombre='A2'
/>
<Sitio
  nombre='A3'
/>
<Sitio
  nombre='A4'
/>
<Sitio
  nombre='A5'
/>
<Sitio
  nombre='A6'
/>
<Sitio
  nombre='A7'
/>
<Sitio
  nombre='A8'
/>
</div>
<div className='sitiosRecuperados'>
  {dataArr.map((sitio)=>(
    <Sitio
      nombre={sitio.nombre}
    />
  ))}
</div>
<div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default SitiosAutos