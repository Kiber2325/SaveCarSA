import React from 'react'
import '../EntradasModal/Entrada.css';

const EntradaInput = (props) => {
  return (
    <div className='inputs'>
        <label>{props.titulo}</label> <br></br>
        <input className='place' type="text" name={props.nombre} onChange={props.cambio}/>
        {props.mostrarMensaje&&<div className='mensajeErrorFormModal'>{props.mensaje}</div>}
    </div>
  )
}

export default EntradaInput