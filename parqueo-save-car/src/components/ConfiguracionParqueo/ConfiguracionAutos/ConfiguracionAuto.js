import React, { useState } from 'react';
import './ConfigurarAuto.css'
import '../SitioConfiguracion/SitioConfiguracion'
import SitioConfiguracion from '../SitioConfiguracion/SitioConfiguracion';
import { useNavigate } from 'react-router-dom';
const ConfiguracionAuto = () => {
  const navigate=useNavigate()
  const dataSitios=[]
  const [data,setData]=useState(dataSitios)
  const [cantidad,setCantidad]=useState(0)

  //const [sitio,setSitio]=useState({nombre:''})
  const generarSitio=()=>{
    //console.log(cantidad)
    let nuevaData=[]
    
    for(let i=0;i<cantidad;i++){
      let nuevoSitio={nombre:'A'+(i+1)}
      //nuevoSitio.nombre='A'+numeros[i]+''
      //setSitio(nuevoSitio)
      nuevaData[i]=nuevoSitio
    }
    setData(nuevaData);
    console.log(data)
  }
  const guardarSitiosAutos=()=>{
    navigate('/ConfigurarEstacionamiento')
    console.log(data)
  }
  const cancelarSitiosAutos=()=>{
    navigate('/ConfigurarEstacionamiento')
    console.log('cancelar')
  }
  return (
    <div>
      <header className="Encabezado"></header>
      <div>
        <label>Cantidad</label>
        <input className='entradaCant' type='number' value={cantidad} onChange={(e)=>setCantidad(e.target.value)}/>
        <button onClick={generarSitio}>Generar</button>
       </div>
       <div className='sitiosGenerados'>
        {
          data.map(datSitio=><SitioConfiguracion 
            nombre={datSitio.nombre}/>)
        }
       </div>
       <div className='botonesAccionConfigurarAuto'>
       <button className='guardarSitiosAutos' onClick={guardarSitiosAutos} >Registrar</button>
      <button className='cancelarSitiosAutos' onClick={cancelarSitiosAutos}>Cancelar</button>
       </div>
      <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default ConfiguracionAuto