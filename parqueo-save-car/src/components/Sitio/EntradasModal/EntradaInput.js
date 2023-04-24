import React from 'react'
import '../EntradasModal/Entrada.css';

const EntradaInput = (props) => {
  return (
    <div className='inputs'>
        <label>{props.titulo}</label> <br></br>
        <input className='place' type="text"/>
    </div>
  )
}

export default EntradaInput