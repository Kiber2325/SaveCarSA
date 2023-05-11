import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Images/logo.png'
import './Clientes.css'
import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';

import 'bootstrap-icons/font/bootstrap-icons.css'
const Clientes = () => {
    const [dataArr, setDataArr] = useState([]);
useEffect(()=>{
  getData()
},[]);
function getData() {
  onValue(ref(database, 'clientesMensuales'),(snapshot) => {
    const dataObj = snapshot.val();
    const dataArr = Object.values(dataObj);
    setDataArr(dataArr);
  });
}
const [mensaje,setMensaje]=useState('')
const controlarMensaje=(e)=>{
    setMensaje(e.target.value)
}
const enviarMensaje=(e)=>{
    e.preventDefault()
    enviarMensajeNum(60372091)
}
const enviarMensajeNum=(cel)=>{
    let phoneNumber = '+591'+cel;
    let message = mensaje;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
        <div className='cuerpoClientes'>
            <div className='tituloListaClientes'>
                <h2>Lista de clientes mensuales</h2>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr className='cabeceraClientes'>
                        <th className='cabeceraTablaClientes' scope="col">CI</th>
                        <th className='cabeceraTablaClientes' scope="col">Nombre</th>
                        <th className='cabeceraTablaClientes' scope="col">Apellidos</th>
                        <th className='cabeceraTablaClientes' scope="col">Estado</th>
                        <th className='cabeceraTablaClientes' scope="col">Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                <tr>
              {dataArr.map(cliente=>(
                <>
                  <td className='datoIngreso'>{cliente.ciCliente}</td>
                  <td className='datoIngreso'>{cliente.nombre}</td>
                  <td className='datoIngreso'>{cliente.apellido}</td>
                  <td className='datoIngreso'>{cliente.estado}</td>
                  
                  </>
              ))}
              <td className='datoIngreso'>
                    <input className='mensajeWhats' onChange={(e)=>controlarMensaje(e)}/><></>
                    <button className='contWhats' onClick={(e)=>enviarMensaje(e)}> Enviar <i class="bi bi-whatsapp"></i></button>
                  </td>
              </tr>
            </tbody>
                </table>
            </div>
        </div>
        <div className='regresarHome'>
            <Link className='regresarHomeBoton' to='/Home'>Regresar a la página principal</Link>
        </div>
        <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default Clientes