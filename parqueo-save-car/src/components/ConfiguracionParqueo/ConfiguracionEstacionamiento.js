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

            <Link className='botonConfigurar' to='/ConfigurarAuto'><i class="fa-solid fa-car"></i> Sitios Autos</Link>
            <Link className='botonConfigurar' to='/ConfigurarMoto'><i class="fa-solid fa-motorcycle"></i> Sitios Motos</Link>
            <Link className='botonConfigurar' to='/AnunciosAdmin'><i class="fa-solid fa-bell"></i> Anuncio</Link>
            <Link className='botonConfigurar' to=''><i class="fa-solid fa-clock"></i> Horario</Link>
            <Link className='botonConfigurar' to=''><i class="fa-regular fa-dollar-sign"></i> Precios</Link>
                    
         
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