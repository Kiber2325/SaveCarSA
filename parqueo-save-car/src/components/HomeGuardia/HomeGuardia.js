import React from 'react'

import img2 from '../../Images/autoXD.jpg'
import img3 from '../../Images/motoXD.jpg'
import { Link } from 'react-router-dom'
import Footers from '../Footer/Footer'
import Navar from '../Navbar/Navar'
import './HomeGuardia.css'

const HomeGuardia = () => {
  return (
    <div>
        <Navar/>
        <div >
            <div class="container text-center">
                <h2 className='titu'>Guardia</h2>

                
            <div className="abcGuardia row row-cols-md-3 ">
                <div className="col">
                    <div className="card h-100">
                        <img src={img2} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Sitios de autos</h5>
                                <p className="card-text">Descripción corta de lo que puede hacer aquí.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">

                            <Link className="btn btn-primary" to='/SitiosAutos'>Acceder</Link>

                                </div>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src={img3} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Sitios de moto</h5>
                                <p className="card-text">Descripción corta de lo que puede hacer aquí.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">
                               

                                    <Link className="btn btn-primary" to='/FormGuardia'>Acceder</Link>
                                   

                            </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
        <Footers/>
    </div>
  )
}

export default HomeGuardia