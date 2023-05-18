import React, { useEffect, useState } from 'react'
import './SitiosAutos.css';
import Sitio from '../Sitio/Sitio';

import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';
import Footers from '../Footer/Footer';
import Navar from '../NavbarGuardia/Navar';
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
       <Navar/>     
    <h1 className='titu'> Parqueo de Autos</h1>
    <div className='cuerpo'>
        {dataArr.map((sitio)=>(
    <Sitio
      nombre={sitio.nombre}
      estado={sitio.estado}
      color={sitio.color}
     />
    ))}
   </div>
<Footers/>
    </div>
  )
}

export default SitiosAutos