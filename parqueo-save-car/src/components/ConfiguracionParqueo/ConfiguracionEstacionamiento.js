import React from 'react'
import './ConfiguracionEstacionamiento.css'
import { Link } from 'react-router-dom'

const ConfiguracionEstacionamiento = () => {

  return (
    <div className='confEst'>
        <header className="Encabezado"></header>
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
        <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  )
}

export default ConfiguracionEstacionamiento