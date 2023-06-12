import React from 'react'
import Navlading from '../landingPage/Navlading'
import Footers from '../Footer/Footer'
import { Link } from 'react-router-dom'
import imgAuto from '../../Images/auto2.png.jpg' 
import imgMoto from '../../Images/Moto2.jpg' 
import './AutosMotos.css'
const AutosMotos = () => {
  return (
    <>
    <Navlading/>
    <div className='container text-center'>

    <h2 className='titu'>Usuarios</h2><br/><br/>
            <div className="abcGuardia row row-cols-1 row-cols-md-3 g-5">
            <div className="col" >
                    <div className='autos' > 
                        <img src={imgAuto} className="card-img-top" width="40%" height="50%" alt="..."/>
                        <div className="d-grid gap-2">
                        <Link className="btn btn-primary" to="/ReservasCliente">Acceder</Link>
                        </div>
                    </div>
            </div>

            <div className="col" >
                    <div className='autos' > 
                        <img src={imgMoto} className="card-img-top" width="40%" height="50%" alt="..."/>
                        <div className="d-grid gap-2">
                        <Link className="btn btn-primary" to="/Motos">Acceder</Link>
                        </div>
                    </div>
                </div>
            </div>

    </div>
    <Footers/>
    </>
  )
}

export default AutosMotos