import React from 'react'
import Footers from '../Footer/Footer'
import { Link } from 'react-router-dom'
import imgAuto from '../../Images/auto2.png.jpg' 
import imgMoto from '../../Images/Moto2.jpg' 
import Navlogin from '../Login/Navlogin'
const AutosMotosAdmin = () => {
  return (
    <div>
         <Navlogin/>
         <div className='container text-center'>

<h2 className='titu'>Administrador</h2><br/><br/>
        <div className="abcGuardia row row-cols-1 row-cols-md-3 g-5">
        <div className="col" >
                <div className='autos' > 
                    <img src={imgAuto} className="card-img-top" width="40%" height="50%" alt="..."/>
                    <div className="d-grid gap-2">
                    <Link className="btn btn-primary" to="/EstadoDelParqueo">Acceder</Link>
                    </div>
                </div>
        </div>

        <div className="col" >
                <div className='autos' > 
                    <img src={imgMoto} className="card-img-top" width="40%" height="50%" alt="..."/>
                    <div className="d-grid gap-2">
                    <Link className="btn btn-primary" to="/EstadoDeMotos">Acceder</Link>
                    </div>
                </div>
            </div>
        </div>

</div>
<Footers/>
    </div>
  )
}

export default AutosMotosAdmin