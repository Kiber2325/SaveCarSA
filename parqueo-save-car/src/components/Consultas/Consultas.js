import React, { useState, useEffect } from 'react';
import "./consultas.css"
import Navlogin from '../Login/Navlogin';
import Footers from '../Footer/Footer';
import { ref, set, onValue  } from "firebase/database";
import { database } from '../../conexion/firebase';



const Consultas = () => {
  // const firebase = app.database();
  const [titulo, setTitulo] = useState('');
  const [consulta, setConsulta] = useState('');
  const [consultas, setConsultas] = useState([]);

  useEffect(()=>{
    getData()
  },[]);
  function getData() {
    onValue(ref(database, 'Consultas'),(snapshot) => {
      const dataObj = snapshot.val();
      let dataArray = []
      console.log(dataObj);
    
      if (dataObj) {
        dataArray  = Object.values(dataObj).map(([id, titulo]) => ({ id, ...titulo }));
      setConsultas(dataArray);
      }
    });
  }

  const enviarConsulta = () => {
    console.log(titulo, consulta);
    const nuevaConsulta = { titulo, consulta };
    // const consultasRef = ref(database, 'Consultas');
    // consultasRef.set(nuevaConsulta);
    set(ref(database, "Consultas/"), nuevaConsulta);
    setTitulo('');
    setConsulta('');
  };
    
  return (
    <>
     <Navlogin/>
    <div>
      <h1>Consultas</h1>
      <div>
        <label htmlFor="titulo">Titulo:</label>
        <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        <label htmlFor="consulta">Consulta:</label>
        <textarea id="consulta" value={consulta} onChange={(e) => setConsulta(e.target.value)} />
      </div>
      <button onClick={enviarConsulta}>Enviar Consulta</button>
      <ul>
        {consultas.map((consultas) => (
          <li key={consultas.id}>
            <p>{consultas.titulo}</p>
            <p>{consultas.consulta}</p>
          </li>
        ))}
      </ul>
    </div>


    <Footers/> 
    </>
  )
}

export default Consultas;