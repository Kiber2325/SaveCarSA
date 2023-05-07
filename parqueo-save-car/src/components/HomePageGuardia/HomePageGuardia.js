import React from 'react'
import Footers from '../Footer/Footer'
import { Link } from 'react-router-dom'
import img1 from '../../Images/estacionamiento1.jpg'
import img2 from '../../Images/estacionamiento2.jpeg'
import img3 from '../../Images/estacionamiento3.jpeg'
import logo from '../../Images/logo.png';
const HomePageGuardia = () => {
  return (
    <div>
        <header className="Encabezado2">
    
    <section>
          <div>
          <Link to="/">
              <img className="image" src={logo} alt="log"/>
          </Link>
          </div>
      </section>

      <section className="navegarnav">
          <div>
              <div className="sesion">
              <a className="Cerrar" href="/">Cerrar Sesion</a>
              </div>
          </div>
      </section>
      </header>
        <div >
            <div class="container text-center">
                <h2>Administrador</h2>
            <div className="row row-cols-1 row-cols-md-3 g-5">
                <div className="col" >
                    <div className="card h-100"> 
                        <img src={img1} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Sitios Autos</h5>
                                <p className="card-text">Control sobre los sitios que pueden ser ocupados por autos del Estacionamiento.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">
                                <Link className="btn btn-primary" to="/SitiosAutos">Acceder</Link>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src={img2} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Sitios Motos</h5>
                                <p className="card-text">Control sobre los sitios que pueden ser ocupados por motos del Estacionamiento.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">

                            <Link className="btn btn-primary" to='/SitiosMotos'>Acceder</Link>

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

export default HomePageGuardia