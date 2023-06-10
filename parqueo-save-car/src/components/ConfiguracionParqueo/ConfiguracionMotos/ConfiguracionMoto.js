import { useState } from 'react'
import './ConfigurarMoto.css'
import '../SitioConfiguracion/SitioConfiguracion'
import { Link, useNavigate } from 'react-router-dom';
import { ref, remove, set } from 'firebase/database';
import { database } from '../../../conexion/firebase';
import Footers from '../../Footer/Footer';
import { Col, Row } from 'reactstrap';
import Navlogin from '../../Login/Navlogin';
import SitioMotoTamanio from '../SitioConfiguracion/SitioMotoTamanio';
const ConfiguracionMoto = () => {
  const navigate=useNavigate()
  const dataSitios=[]
  const [data,setData]=useState(dataSitios)
  const [cantidad,setCantidad]=useState(0)

  //const [sitio,setSitio]=useState({nombre:''})
  const generarSitio=()=>{
    //console.log(cantidad)
    let nuevaData=[]
    
    for(let i=0;i<cantidad;i++){
      let nuevoSitio={nombre:'M'+(i+1)}
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

  const guardarSitiosMotos=()=>{

    remove(ref(database, `sitiosMotos`));
    for(let i=0;i<data.length;i++){
      console.log(data[i].nombre)
      let agregarNuevoSitio={nombre:data[i].nombre,estado:'disponible',color:'#00FF38'}
      
      set(ref(database, "sitiosMotos/"+(i+1)), agregarNuevoSitio);
      //console.log(agregarNuevoSitio)
    }
    //let agregarNuevoSitio={nombre:data[0].nombre,estado:'disponible'}
    //const dbRef = ref(database);
    navigate('/Home')
    console.log(data)  
  }
  
  const cancelarSitiosMotos=(e)=>{
    navigate('/ConfigurarEstacionamiento')
    console.log('cancelar')
  }
  
  return (
    <div>
      <Navlogin/>
      <div className='container'>
      <h2 className='titu'>Configurar Parqueo de motos <i class="fa-solid fa-motorcycle"></i></h2><br/>
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
          data.map(datSitio=><SitioMotoTamanio nombre={datSitio.nombre}/>)
        }
      </div>
      <div>
          <div class='text-center botones'>
            <button style={{...StyleSheet.button,backgroundColor:"#00B9BC",}} class="btn btn-secondary" onClick={guardarSitiosMotos} >Registrar</button> 
            <Link style={{...StyleSheet.button,backgroundColor:"#F46D21",}} className="btn btn-primary" to='/ConfigurarEstacionamiento' onClick={cancelarSitiosMotos}>volver</Link>                 
          </div>
      </div>
     </div>
<Footers/>
    </div>
  )
}

export default ConfiguracionMoto