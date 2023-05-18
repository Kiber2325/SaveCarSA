import React from 'react'
import './ConfiguracionEstacionamiento.css'
import { Link } from 'react-router-dom'
import Navlogin from '../Login/Navlogin'
import Footers from '../Footer/Footer'

const ConfiguracionEstacionamiento = () => {

  return (
    <>
        <Navlogin/>
        <div className='container'>
        <div className='contenidoBotones'>
            <div className='cajabtn'>
            <div class=" contenido d-grid gap-2 col-3 mx-auto">  

            <Link className='botonConfigurar' to='/ConfigurarAuto'>Sitios Autos</Link>
            <Link className='botonConfigurar' to='/ConfigurarMoto'>Sitios Motos</Link>
         
          </div>
         
          <div className='text-center '>
            <Link className='volverHome' to='/Home'>Volver</Link>
          </div>
        </div>
        </div>
        </div>
        <Footers/>
    </>
  )
}

export default ConfiguracionEstacionamiento