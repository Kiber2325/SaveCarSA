import React, { useState } from 'react'
import './Solicitud.css'
import Navlading from '../landingPage/Navlading'
import Footers from '../Footer/Footer'
import InputSolicitud from './InputSolicitud/InputSolicitud'
import { Link, useNavigate } from 'react-router-dom'
import {   getDatabase, push, ref, set } from "firebase/database";
import { app, database } from '../../conexion/firebase';
const Solicitud = () => {
    const navigate=useNavigate()
    const [values, setValues] = useState({
        nombresApellidos:'',
        tiempoSolicitud:'',
        celular:'',
        direccion:'',
        unread:1
    });
    const onChange = (e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const enviarSolicitud=(e)=>{
        e.preventDefault()
        navigate('/')
        const db=getDatabase(app)
    const collectionRef = ref(db,'ingresos');
    const newId = push(collectionRef).key;
        set(ref(database, "solicitudes/"+(newId)), values);
    }
  return (
    <div>
        <Navlading/>
        <div>
            <div className='tituloSolicitud'>
                <h1>Solicitud de sitio mensual</h1>
            </div>
            <div>
                <div className='tituloFormSolicitud'>
                <p>LLene sus Datos:</p>
                </div>
                <div className='formSolicitud'>
                    <div>
                <InputSolicitud
                    label='Nombres y Apellidos'
                    tipo='text'
                    placeholder='Nombre y apellidos'
                    nombre='nombresApellidos'
                    cambio={onChange}
                    value={values.nombresApellidos}
                />
                <InputSolicitud
                    label='Tiempo de solicitud'
                    tipo='text'
                    placeholder='Defina el monto que pagaran los autos por mes'
                    nombre='tiempoSolicitud'
                    cambio={onChange}
                    value={values.tiempoSolicitud}
                />
                <InputSolicitud
                    label='Celular'
                    tipo='text'
                    placeholder='Escriba su numero de celular'
                    nombre='celular'
                    cambio={onChange}
                    value={values.celular}
                />
                <InputSolicitud
                    label='Dirección'
                    tipo='text'
                    placeholder='Dirección de su domicilio.'
                    nombre='direccion'
                    cambio={onChange}
                    value={values.direccion}
                /></div>
                </div>
            </div>
            <div className="botonesHorarios">
        <Link className="canHor" to='/'>Cancelar</Link>
        <button className="guaHor" onClick={enviarSolicitud}> Enviar </button>
      </div>
        </div>
        <Footers/>
    </div>
  )
}

export default Solicitud