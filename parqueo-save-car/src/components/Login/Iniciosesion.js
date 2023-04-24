import '../Entrada'
import Entrada from '../Entrada';
import '../Login/inicio.css'
import Navegacion from '../Navegacion';
import Footers from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Iniciosesion = () => {
    const [usuario,setUsuario]=useState('');
    const [password,setPassword]=useState('');
    const [errorLogin,setErrorLogin]=useState(false)
    const [mensajeErrorLogin,setMensajeErrorLogin]=useState('');
    const navigate=useNavigate();
    const iniciarSesion=e=>{
        if(usuario==='Admin123@gmail.com' && password==='12345678'){
            navigate('/Home')
        }else if(usuario==='guardia@gmail.com' && password==='alice789'){
            navigate('/SitiosAutos')
        }else{
            setErrorLogin(true);
            if(usuario===''||password===''){
                setMensajeErrorLogin('No puedes dejar el usuario o contraseña vacío')
            }else{
            setMensajeErrorLogin('El usuario o contraseña es incorrecto')
            }
        }
    }
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
             valor={usuario}
             cambio={e=>setUsuario(e.target.value)}
        />

        
        <br></br>
        <Entrada
        tituloEntrada='Contraseña'
        tipo='password'
        contenido='Escriba aqui su contraseña'
        valor={password}
        cambio={e=>setPassword(e.target.value)}
        />
        {errorLogin && <div className='mensajeErrorLogin'>{mensajeErrorLogin}</div>}
        </div>
        </section >
        <div >
            <div className='botones1'>
            <button className="btn btn-primary" onClick={iniciarSesion}>Iniciar</button>
            </div >
            <br></br>
            <div className='botones2'>
            
            <Link to='/' class="btn btn-link">Volver</Link>
            
            
            
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