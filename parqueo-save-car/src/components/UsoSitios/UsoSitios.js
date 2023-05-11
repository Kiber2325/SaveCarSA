import React, { useEffect, useState } from 'react'
import './UsoSitios.css'
import { Link } from 'react-router-dom'
import logo from "../../Images/logo.png";
import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';
const UsoSitios = () => {
    const [dataArr, setDataArr] = useState([]);
useEffect(()=>{
  getData()
},[]);
function getData() {
  onValue(ref(database, 'tiempoUso'),(snapshot) => {
    const dataObj = snapshot.val();
    const dataArr = Object.values(dataObj);
    setDataArr(dataArr);
  });
}
const calcularUso=(horas,minutos,segundos)=>{
    let horasUs=horas
    let minutosUs=minutos
    let segundosUs=segundos
    let usoPorcentaje=((100*(horasUs*3600+minutosUs*60+segundosUs))/86400);
    return usoPorcentaje
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
        <div className='tiempoDetalle'>
          <table class="table table-bordered ">
            <thead>
                <tr className='cabeceraTiempo'>
                  <th className='cabeceraTiempoSitio' scope="col">Sitio</th>
                  <th className='cabeceraTiempoSitio' scope="col">Día</th>
                  <th className='cabeceraTiempoSitio' scope="col">Tiempo de ocupación</th>
                </tr>
            </thead>
            <tbody>
            {dataArr.map(uso=>(
                <tr>
                  <td className='datoIngreso'>{uso.sitioUsado}</td>
                  <td className='datoIngreso'>{uso.fecha}</td>
                  <td className='datoIngreso'>{calcularUso(uso.horasUsadas,uso.minutosUsados,uso.segundosUsados)} %</td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>
        <div className="botonesReservaCliente">
      <Link to='/Home' className="volverLanding">Volver</Link>
      </div> 
      <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default UsoSitios