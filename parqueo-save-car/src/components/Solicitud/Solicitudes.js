import React, { useEffect, useState } from 'react'
import Navlogin from '../Login/Navlogin'
import Footers from '../Footer/Footer'
import { database } from '../../conexion/firebase'
import { onValue, ref } from 'firebase/database'
import './Solicitudes.css'
const Solicitudes = () => {
    const [dataArr, setDataArr] = useState([]);
    useEffect(()=>{
        getData()
      },[]);
      function getData() {
        onValue(ref(database, 'solicitudes'), (snapshot) => {
          const dataObj = snapshot.val();
          const dataArr = Object.values(dataObj);
          setDataArr(dataArr);
        });
      }
  return (
    <div>
        <Navlogin/>
        <div classname='cuerpoSolicitudes'>
            <table classname="table">
                <thead>
                    <tr className='cabeceraClientes'>
                    <th className='cabeceraTablaClientes' scope="col">Nombre y Apellido</th>
                    <th className='cabeceraTablaClientes' scope="col">Tiempo Solicitud</th>
                    <th className='cabeceraTablaClientes' scope="col">Celular</th>
                    <th className='cabeceraTablaClientes' scope="col">Dirección</th>
                    </tr>
                </thead>
                <tbody>
        {dataArr.map((solicitud)=>(
            <tr>
                <th className='datoIngreso'>{solicitud.nombresApellidos}</th>
                <th className='datoIngreso'>{solicitud.tiempoSolicitud}</th>
                <th className='datoIngreso'>{solicitud.celular}</th>
                <th className='datoIngreso'>{solicitud.direccion}</th>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        <Footers/>
    </div>
  )
}

export default Solicitudes