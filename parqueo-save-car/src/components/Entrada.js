import React from 'react'
import './Footer/estilos.css'
const Entrada = (props) => {
    return (
      <div>
         <label className='Titulo'>{props.tituloEntrada}</label> <br></br>
         <input className='campo' type={props.tipo} placeholder={props.contenido} //pattern={props.formato}
         />
      </div>
    );
  }
  
  export default Entrada;