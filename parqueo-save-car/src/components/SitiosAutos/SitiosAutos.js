import React from 'react'
import './SitiosAutos.css';
import Sitio from '../Sitio/Sitio';
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import ShowSitios from './componentes/ShowSitios';

const SitiosAutos = () => {
  return (
    <div>
<header className='header'>

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
</div>

<footer className='footer'>
<p className='contactos'>Contactos</p>
</footer>
    </div>
  )
}

export default SitiosAutos