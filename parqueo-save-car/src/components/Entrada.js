import React from 'react'
import './Footer/estilos.css'
const Entrada = (props) => {
    return (
      <div>
         <label className='Titulo'>{props.tituloEntrada}</label> <br></br>
         <input className='campo' type={props.tipo} placeholder={props.contenido} value={props.valor} onChange={props.cambio}//pattern={props.formato}
         />
      </div>
    );
  }
  
  export default Entrada;