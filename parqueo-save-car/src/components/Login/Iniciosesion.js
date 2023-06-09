import '../Entrada'
import Entrada from '../Entrada';
import '../Login/inicio.css'
import Navegacion from '../Navegacion';
import Footers from '../Footer/Footer';
import { Link } from "react-router-dom";

const Iniciosesion = () => {
    return(
        <div>
        <Navegacion/>
            <h1 className='title'><b>Iniciar Sesión</b></h1>
        <section className='Columnas'>
        <div className='Columnasx3'>
        <Entrada
             tituloEntrada='Usuario' 
             tipo='text'
             contenido='Escriba aqui su usuario'
        />

        
        <br></br>
        <Entrada
        tituloEntrada='Contraseña'
        tipo='password'
        contenido='Escriba aqui su contraseña'
        />
        
        </div>
        </section >
        <div >
            <div className='botones1'>
            <Link to="/Home">
            <button className="btn btn-primary" type="submit">Iniciar</button>
            </Link>
            
            </div >
            <br></br>
            <div className='botones2'>
            <Link to="/">
            <button type="button" class="btn btn-link" >Volver</button>
            </Link>
            
            
            
            
            </div>
        </div>
        <Footers/>

        </div>
    );
};
/*<button type="button" class="btn btn-outline-info">Volver</button>    
<a href='/'className='vol'>Volver</a> 
<button type="button" class="btn btn-link" >Volver</button>*/
export default Iniciosesion;