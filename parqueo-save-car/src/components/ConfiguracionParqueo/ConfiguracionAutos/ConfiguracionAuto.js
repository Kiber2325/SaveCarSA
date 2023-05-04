import React, { useState } from 'react';
import './ConfigurarAuto.css'
import '../SitioConfiguracion/SitioConfiguracion'
import SitioConfiguracion from '../SitioConfiguracion/SitioConfiguracion';
import { useNavigate } from 'react-router-dom';
import { ref, set, remove } from "firebase/database";
import { database } from '../../../conexion/firebase';

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
    remove(ref(database, `sitiosAutos`));
    for(let i=0;i<data.length;i++){
      console.log(data[i].nombre)
      let agregarNuevoSitio={nombre:data[i].nombre,estado:'disponible'}
      
      set(ref(database, "sitiosAutos/"+(i+1)), agregarNuevoSitio);
      //console.log(agregarNuevoSitio)
    }
    //let agregarNuevoSitio={nombre:data[0].nombre,estado:'disponible'}
    //const dbRef = ref(database);
    navigate('/ConfigurarEstacionamiento')
    console.log(data)
  }
  const cancelarSitiosAutos=()=>{
    navigate('/ConfigurarEstacionamiento')
    console.log('cancelar')
  }

  /*const peticionPost=()=>{
    firebase.child("sitios").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      //this.setState({modalInsertar: false});
  }*/
  return (
    <div>
      <header className="Encabezado"></header>
      <div className='divGenerarMotos'>
        <label>Cantidad</label>
        <input className='entradaCant' type='number' value={cantidad} onChange={(e)=>setCantidad(e.target.value)}/>
        <button className='generarMotos' onClick={generarSitio}>Generar</button>
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