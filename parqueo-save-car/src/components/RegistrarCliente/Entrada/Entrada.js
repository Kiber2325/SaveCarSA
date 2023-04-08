import React from 'react'
import './Entrada.css'
//import 'bootstrap/dist/css/bootstrap.min.css'

const Entrada = (props) => {
  return (
    <div>
       <label className='Titulo'>{props.tituloEntrada}</label> <br></br>
       <input className='campo' type={props.tipo} value={props.valor} placeholder={props.contenido} onChange={props.cambio} min={props.min} max={props.max} onBlur={props.capturar}
       />
       { props.mostrarAlerta &&<div className='alert alert-danger p-1' >
        {props.mensajeAlerta}
       </div>}
    </div>
  )
}

export default Entrada;