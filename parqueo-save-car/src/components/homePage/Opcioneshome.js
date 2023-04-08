import React from "react";

import img1 from '../../Images/estacionamiento1.jpg'
import img2 from '../../Images/estacionamiento2.png'
import img3 from '../../Images/estacionamiento3.jpg'
import '../homePage/home.css'

//import '../../estilos/home.css'

const Opcioneshome = () => {
    return (
        <div >
            <div class="container text-center">
                <h2>Administrador</h2>
            <div className="row row-cols-1 row-cols-md-3 g-5">
                <div className="col" >
                    <div className="card h-100"> 
                        <img src={img1} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Configurar Estacionamiento</h5>
                                <p className="card-text">Descripción corta de lo que puede hacer aquí.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button">Acceder</button>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src={img2} className="card-img-top" width="40%" height="50%" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Registrar Cliente</h5>
                                <p className="card-text">Descripción corta de lo que puede hacer aquí.</p>
                            </div>
                            <div className="card-footer">
                            <div className="d-grid gap-2">
                            <a className="btn btn-primary" href='/RegistrarCliente'>Acceder</a>
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
                               
                                    
                                    <button className="btn btn-primary" type="button">Acceder </button>
                                 

                            
                               
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Opcioneshome;