import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  ref,   get } from 'firebase/database';
import Entrada from '../Entrada';
import Navegacion from '../Navegacion';
import Footers from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { database } from '../../conexion/firebase';




const Iniciosesion = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [mensajeErrorLogin, setMensajeErrorLogin] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    try {
      if (usuario === 'Admin123@gmail.com' && password === '12345678') {
        navigate('/Home');
        return;
      }

      const guardiasRef = ref(database, 'Guardias');
      const guardiasSnapshot = await get(guardiasRef);

      if (guardiasSnapshot.exists()) {
        const guardias = guardiasSnapshot.val();
        let found = false;
      
        // Iterar sobre cada guardia en la colección
        for (const guardiaKey in guardias) {
          const guardia = guardias[guardiaKey];
          
          // Comparar el correo electrónico y el CI con los valores ingresados
          if (guardia.email === usuario && guardia.ci === password) {
            found = true;
            break;
          }
        }
      
        if (found) {
          navigate('/HomeGuardia');
          return;
        }
      }

      setErrorLogin(true);
      if (usuario === '' || password === '') {
        setMensajeErrorLogin('No puedes dejar el usuario o contraseña vacío');
      } else {
        setMensajeErrorLogin('El usuario o contraseña es incorrecto');
      }
    } catch (error) {
      // Manejar errores de Firebase
      console.log(error);
    }
  };

  return (
    <div>
      <Navegacion />
      <div className='container'>
        <h1 className='title'>
          <b>Iniciar Sesión</b>
        </h1>
        <section className='Columnas'>
          <div className='Columnasx3'>
            <Entrada
              tituloEntrada='Usuario'
              tipo='text'
              contenido='Escriba aqui su usuario'
              valor={usuario}
              cambio={(e) => setUsuario(e.target.value)}
            />

            <br></br>
            <Entrada
              tituloEntrada='Contraseña'
              tipo='password'
              contenido='Escriba aqui su contraseña'
              valor={password}
              cambio={(e) => setPassword(e.target.value)}
            />
            {errorLogin && <div className='mensajeErrorLogin'>{mensajeErrorLogin}</div>}
          </div>
        </section>
        <div>
          <div className='botones1'>
            <button className='btn btn-primary' onClick={iniciarSesion}>
              Iniciar
            </button>
          </div>
          <br></br>
          <div className='botones2'>
            <Link to='/' className='btn btn-link'>
              Volver
            </Link>
          </div>
        </div>
      </div>
      <Footers />
    </div>
  );
};

export default Iniciosesion;
