import React, { useState } from 'react';
import './ConfigurarAuto.css'
import '../SitioConfiguracion/SitioConfiguracion'
import SitioConfiguracion from '../SitioConfiguracion/SitioConfiguracion';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';


import { ref, set, remove } from "firebase/database";
import { database } from '../../../conexion/firebase';
import Navlogin from '../../Login/Navlogin';
import Footers from '../../Footer/Footer';

const ConfiguracionAuto = () => {
  const navigate=useNavigate()
  
  const [data,setData]=useState([])
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

  const limpiarSitio = ()=>{
    setData([])
    setCantidad(0)
    console.log("se Limpio el arreglo");
 }


  const guardarSitiosAutos=()=>{
    remove(ref(database, `sitiosAutos`));
    for(let i=0;i<data.length;i++){
      console.log(data[i].nombre)
      let agregarNuevoSitio={nombre:data[i].nombre,estado:'disponible',color:'#00FF38'}
      
      set(ref(database, "sitiosAutos/"+(i+1)), agregarNuevoSitio);
      //console.log(agregarNuevoSitio)
    }
    //let agregarNuevoSitio={nombre:data[0].nombre,estado:'disponible'}
    //const dbRef = ref(database);
    navigate('/Home')
    console.log(data)
  }
  const cancelarSitiosAutos=()=>{
    navigate('/ConfigurarEstacionamiento')
    console.log('cancelar')
  }

  return (
    <>
      <Navlogin/>
      <div className='container'>
      <h2 className='titu'>Configurar Parqueo de autos</h2><br/>
        <div className='generar'>
        <Row>
          <Col>
          <label>Cantidad</label>
          <input className='entradaCant' type='number' value={cantidad} onChange={(e)=>setCantidad(e.target.value)}/>
          <button  class="btn btn-primary" onClick={generarSitio} >Generar</button>
          <button  class="btn btn-primary"onClick={limpiarSitio}>Limpiar</button>
          </Col>
        </Row>
       </div>
      
      <div className='sitiosGenerados'>
        {
          data.map(datSitio=><SitioConfiguracion nombre={datSitio.nombre}/>)
        }
      </div>
      <div>
          <div class='text-center botones'>
            <button style={{...StyleSheet.button,backgroundColor:"#00B9BC",}} class="btn btn-secondary" onClick={guardarSitiosAutos} >Registrar</button> 
            <Link style={{...StyleSheet.button,backgroundColor:"#F46D21",}} className="btn btn-primary" to='/ConfigurarEstacionamiento' onClick={cancelarSitiosAutos}>volver</Link>                 
          </div>
      </div>
     </div>
<Footers/>
    </>
  )
}

export default ConfiguracionAuto