import React ,{useState ,useEffect}from 'react'
import { database } from '../../conexion/firebase';
import { onValue, ref , push , update} from 'firebase/database';
import './ConsultaAdmin.css'

import Navlogin from '../Login/Navlogin';
import Footers from '../Footer/Footer';



const ConsultasAdmin = () => {

    const [consultas, setConsultas] = useState([]);
    const [nuevaConsulta, setNuevaConsulta] = useState('');
    const [respuesta, setRespuesta] = useState('');
  
  
    // Cargamos las consultas existentes en Firebase
    useEffect(()=>{
        getData()
      },[]);


      function getData() {
        onValue(ref(database, 'Consultas'), (snapshot) => {
        const consult = snapshot.val();
        if (consult) {
            console.log(consult);
          const consultaArray = Object.entries(consult).map(([id, consulta]) => ({ id, ...consulta }));
          console.log(consultaArray);
          setConsultas(consultaArray);
        }
      });
    }
    const enviarConsulta = () => {
       
        push(ref(database, "Consultas"), {

        Consulta: nuevaConsulta,
        respuesta: '',
        });
     
      setNuevaConsulta('');
    };
 


    const enviarRespuesta = (id) => {
       
        update(ref(database, `Consultas/${id}`),{respuesta:respuesta})
         setRespuesta('');
    };
  
    return (
     <>
       
       <Navlogin/>
      <div className='container'>
        
        <h1 className='titu'>Consultas frecuntes</h1>
        <br/>
        <br/>
      
        {consultas.map((consulta) => (
          <div key={consulta.id}>
            
            <p className='pregunta'><strong>Pregunta: {consulta.Consulta} </strong></p> 

            {consulta.respuesta && <p className='respuesta'>Respuesta: {consulta.respuesta}</p>}
            {!consulta.respuesta && (
              <div>
                <input type="text" placeholder="Respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
                <button className='btn btn-danger' onClick={() => enviarRespuesta(consulta.id)}>Enviar respuesta</button>
              </div>
            )}
          </div>
        ))}
        <h2>Agregar nueva consulta</h2>
        
        <input type="text" placeholder="consulta" value={nuevaConsulta} onChange={(e) => setNuevaConsulta(e.target.value)} />
        <button  className='btn btn-primary' onClick={enviarConsulta}>Enviar consulta</button>
      </div>
      <Footers/> 
      </>
        );
  };

export default ConsultasAdmin