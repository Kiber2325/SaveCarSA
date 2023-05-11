import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Images/logo.png'
import './Clientes.css'
import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';

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
console.log(dataArr)
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
              {dataArr.map(cliente=>(
                <tr>
                  <td className='datoIngreso'>{cliente.ciCliente}</td>
                  <td className='datoIngreso'>{cliente.nombre}</td>
                  <td className='datoIngreso'>{cliente.apellido}</td>
                  <td className='datoIngreso'>{cliente.estado}</td>
                  <td className='datoIngreso'><button>Enviar mensaje</button></td>
                </tr>
              ))}
            </tbody>
                </table>
            {dataArr.map((sitio)=>(
                <div></div>
            ))}
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