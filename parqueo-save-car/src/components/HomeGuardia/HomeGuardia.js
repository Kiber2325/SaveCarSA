import React from 'react'

import img2 from '../../Images/estacionamiento2.jpeg'
import img3 from '../../Images/estacionamiento3.jpeg'
import Navlogin from '../Login/Navlogin'
import { Link } from 'react-router-dom'
import Footers from '../Footer/Footer'

const HomeGuardia = () => {
  return (
    <div>
        <Navlogin/>
        <div >
            <div class="container text-center">
                <h2 className='titu'>Guardia</h2>
            <div className="row row-cols-1 row-cols-md-3 g-5">
                <div className="col">
                    <div className="card h-100">
                        <img src={img2} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Registrar Cliente</h5>
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
                                <h5 className="card-title">Registrar Guardia</h5>
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