import React from 'react'
import './InputSolicitud.css'

const InputSolicitud = (props) => {
  return (
    <div>
        <label className='tituloInputSolicitud'>{props.label}</label><br/>
        <input className='inputSolicitud' type={props.tipo} placeholder={props.placeholder} name={props.nombre} onChange={props.cambio} value={props.obtenerValor}/>
    </div>
  )
}

export default InputSolicitud