import React, { useEffect, useState } from 'react'
// import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom'
import {  ref, onValue } from "firebase/database";
import { database } from '../../conexion/firebase';
import './IngresosAnio.css'
import Navlogin from '../Login/Navlogin';
const IngresosAnio = () => {
  const [dataArr, setDataArr] = useState([]);
  //const [montoTotal,setMontoTotal]=useState(0.0);
  useEffect(()=>{
    getData()
  },[]);/*
  useEffect(()=>{
    dataArr.map((ingreso)=>(
      setMontoTotal(montoTotal+ingreso.monto)
  ))
  },[dataArr,montoTotal])*/
  function getData() {
    onValue(ref(database, 'ingresos'),(snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
    });
  }
  const calcularMonto=()=>{
    let montoCalculado=0.0;
    dataArr.map((ingreso)=>(
      montoCalculado=montoCalculado+ingreso.monto
    ))
    return montoCalculado
  }
  const dias={
    sun:'domingo',
    mon:'lunes',
    thu:'martes',
    wed:'miércoles',
    tue:'jueves',
    fri:'viernes',
    sat:'sábado'
  }
  const calcularDia=(dia)=>{
    let diaAEvaluar=dia[0]+dia[1]+dia[2]
    console.log(diaAEvaluar)
    if(diaAEvaluar==='Sun'){
      dia=dias.sun
    }else if(diaAEvaluar==='Mon'){
      dia=dias.mon
    }else if(diaAEvaluar==='Thu'){
      dia=dias.thu
    }else if(diaAEvaluar==='Wed'){
      dia=dias.wed
    }else if(diaAEvaluar==='Tue'){
      dia=dias.tue
    }else if(diaAEvaluar==='Fri'){
      dia=dias.fri
    }else if(diaAEvaluar==='Sat'){
      dia=dias.sat
    }
    return dia
  }
  return (
    <div>
      <Navlogin/>
        <div className='ingresosDetalle'>
          <table class="table table-bordered">
            <thead>
                <tr className='cabeceraClientes'>
                  <th className='cabeceraTablaClientes' scope="col">Año</th>
                  <th className='cabeceraTablaClientes' scope="col">Mes</th>
                  <th className='cabeceraTablaClientes' scope="col">Fecha</th>
                  <th className='cabeceraTablaClientes' scope="col">Día</th>
                  <th className='cabeceraTablaClientes' scope="col">CI</th>
                  <th className='cabeceraTablaClientes' scope="col">Celular</th>
                  <th className='cabeceraTablaClientes' scope="col">Placa</th>
                  <th className='cabeceraTablaClientes' scope="col">Lugar</th>
                  <th className='cabeceraTablaClientes' scope="col">Tipo</th>
                  <th className='cabeceraTablaClientes' scope="col">Monto</th>
                </tr>
            </thead>
            <tbody>
              {dataArr.map(ingreso=>(
                <tr>
                  <td className='datoIngreso'>{ingreso.anio}</td>
                  <td className='datoIngreso'>{ingreso.mes}</td>
                  <td className='datoIngreso'>{ingreso.fecha}</td>
                  <td className='datoIngreso'>{calcularDia(ingreso.fechaActual)}</td>
                  <td className='datoIngreso'>{ingreso.ciCliente}</td>
                  <td className='datoIngreso'>{ingreso.celularCliente}</td>
                  <td className='datoIngreso'>{ingreso.placaDelAuto}</td>
                  <td className='datoIngreso'>{ingreso.lugarUsado}</td>
                  <td className='datoIngreso'>{ingreso.tipo}</td>
                  <td className='datoIngreso'>{ingreso.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='montoTotal'>
          <h3>Monto total: {calcularMonto()} Bs.</h3>          
        </div>
        <div className="botonesReservaCliente">
      <Link to='/Home' className="volverLanding">Volver</Link>
      </div> 
      <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default IngresosAnio