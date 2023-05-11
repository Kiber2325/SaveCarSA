import { useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Consultas/consultas.css'
import { Link } from "react-router-dom";

function Consulta() {

  const [selected, setSelected]=useState(null)
  const toggle = (i) => {
    if(selected ===i){
      return setSelected(null)
    }

    setSelected(i)
  }

  return (
    <div className="App">
      <header className='header'>
      </header>
 
      <div className='wrapper'>
        <div className='accordion'>
          <h2>Consultas Frecuentes</h2>
          {data.map((item, i)=>(
            <div className='item'>
                <div className='title' onClick={()=>toggle(i)}>
                  <h3>{item.pregunta}</h3>
                  <span>{selected ===i ? '-':'+'}</span>
                </div>
               <div className={selected ===i ? 'content show':'content'}>
                {item.respuesta}
               </div>
            </div>

          ))}
        </div>
        <div className='form'>
          <form>
          <label>
            <h4>Consulta:</h4>
          </label>
          <br></br>
          <input type="text" className='inp' placeholder="Escriba aqui la consulta que requiere hacer"/>
          <br></br>
          <button className='env'>Enviar</button>
          </form>
      </div>





      </div>

      <div className='volv'>

        <button className='volver'>Volver</button>

      </div>



      <footer className='footer'>
      <p className='contactos'>Contactos</p>
      </footer>
  
    </div>
    /*<div className="App">
      <header className='header'>

      </header>
    <div>
    <h2>Preguntas Frecuentes</h2>
    <Consultas/>
    </div>
      <footer className='footer'>
      <p className='contactos'>Contactos</p>
      </footer>
  
    </div>*/

  );
}
const data = [
  {
    pregunta:'Que debo hacer para ¿A que número debo llamar para realizar una reserva? realizar reservas?',
    respuesta:'Para poder tener un lugar reservado en nuestro estacionamiento debe ser un cliente regular que este correctamente registrado en el sitio web',
  },
  {
    pregunta:'¿Cómo puedo realizar la reserva mensual?',
    respuesta:' texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versione',
  },
  {
    pregunta:'¿Qué horarios de atención tiene el estacionamiento?',
    respuesta:'ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versione',
  }]
export default Consulta;
