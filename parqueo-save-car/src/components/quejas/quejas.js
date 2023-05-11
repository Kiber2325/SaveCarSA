import { useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../quejas/quejas.css'
import { Link } from "react-router-dom";

function Quejas() {

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
        <center>
      <div className='wrapper'>
        <div className='accordion'>
          <h2>Observaciones</h2>
          {data.map((item, i)=>(
            <div className='item'>
                <div className='title' onClick={()=>toggle(i)}>
                  <h4>{item.pregunta}</h4>
                  <span>{selected ===i ? '-':'+'}</span>
                </div>
               <div className={selected ===i ? 'content show':'content'}>
                {item.respuesta}
               </div>
            </div>

          ))}
        </div>
        <br></br>
        <br></br>
        <div className='form'>
          <form>
          <label>
            <h4>Escribe tu reclamo, tu opinión nos importa:</h4>
          </label>
          <br></br>
          <input type="text" className='inp' placeholder="Escriba aqui el reclamo respecto al servicio del parqueo"/>
          
          
          </form>
      </div>
      <br></br><br></br>
      <div className='volv'>

        <button className='cancelar'>Cancelar</button>


        <button className='env'>Enviar</button>
      </div>



      </div>
      </center>




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
    pregunta:'La reserva no se realizo correctamente',
    respuesta:'Para poder tener un lugar reservado en nuestro estacionamiento debe ser un cliente regular que este correctamente registrado en el sitio web',
  },
  {
    pregunta:'El sitio esta en mal estado',
    respuesta:' texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versione',
  },
  {
    pregunta:'no me carga la pagina de reservas',
    respuesta:'ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versione',
  }]
export default Quejas;