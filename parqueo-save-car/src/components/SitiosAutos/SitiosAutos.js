import React, { useEffect, useState } from 'react'
import './SitiosAutos.css';
import Sitio from '../Sitio/Sitio';

import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';
import Navlogin from '../Login/Navlogin';
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
       <Navlogin/>
      

    <div className='cuerpo'>
        {dataArr.map((sitio)=>(
    <Sitio
      nombre={sitio.nombre}
      estado={sitio.estado}
      color={sitio.color}
     />
    ))}
   </div>
<div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default SitiosAutos