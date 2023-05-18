import React from 'react'
import './ConfiguracionEstacionamiento.css'
import { Link } from 'react-router-dom'
import Navlogin from '../Login/Navlogin'
import Footers from '../Footer/Footer'

const ConfiguracionEstacionamiento = () => {

  return (
    <>
        <Navlogin/>
        <div classname='container'>
        <div className='configuraciones row'>
          <div className='contLink'>
            <Link className='botonConfigurar' to='/ConfigurarAuto'>Sitios Autos</Link>
          </div>
          <div className='contLink'>
            <Link className='botonConfigurar' to='/ConfigurarMoto'>Sitios Motos</Link>
          </div>
          <div className='contLink'>
            <Link className='volverHome' to='/Home'>Volver</Link>
          </div>
        </div>
        </div>
        <Footers/>
    </>
  )
}

export default ConfiguracionEstacionamiento