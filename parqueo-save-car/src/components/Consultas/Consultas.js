import React, { useState, useEffect } from 'react';
import "./consultas.css"
// import Navlogin from '../Login/Navlogin';
// import Footers from '../Footer/Footer';
import { ref, onValue,push  } from "firebase/database";
import { database } from '../../conexion/firebase';
import Navlading from '../landingPage/Navlading';



const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [nuevaConsulta, setNuevaConsulta] = useState('');



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
    
  return (
    <>
     <Navlading/>
    <div className='container'>
    <h1 className='titu'>Consultas frecuntes</h1>
        <br/>
        <br/>
      
        {consultas.map((consulta) => (
          <div key={consulta.id}>
           <p className='pregunta'><strong>Pregunta: {consulta.Consulta} </strong></p> 
            <p className='respuesta'>Respuesta: {consulta.respuesta}</p>
           </div>
        ))}
         
        <h2>Agregar nueva consulta</h2>
        
        <input type="text" placeholder="consulta" value={nuevaConsulta} onChange={(e) => setNuevaConsulta(e.target.value)} />
        <button className='btn btn-primary' onClick={enviarConsulta}>Enviar consulta</button>
      </div>
      <div className='footerXDS'><p id='cont'>Contactos</p></div>
    </>
  )
}

export default Consultas;