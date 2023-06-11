import React, { useState, useEffect } from 'react';
import { database } from '../../conexion/firebase';
import { onValue, ref, push, update, remove } from 'firebase/database';
import './ConsultaAdmin.css';

import Navlogin from '../Login/Navlogin';
import Footers from '../Footer/Footer';
import Swal from 'sweetalert2';

const ConsultasAdmin = () => {
  const [consultas, setConsultas] = useState([]);
  const [nuevaConsulta, setNuevaConsulta] = useState('');
  const [respuestas, setRespuestas] = useState({});

  // Cargamos las consultas existentes en Firebase
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    onValue(ref(database, 'Consultas'), (snapshot) => {
      const consult = snapshot.val();
      if (consult) {
        const consultaArray = Object.entries(consult).map(([id, consulta]) => ({ id, ...consulta }));
        setConsultas(consultaArray);
      }
    });
  }

  const enviarConsulta = () => {
    push(ref(database, 'Consultas'), {
      Consulta: nuevaConsulta,
      respuesta: '',
    });

    setNuevaConsulta('');
  };

  const enviarRespuesta = (id) => {
    update(ref(database, `Consultas/${id}`), { respuesta: respuestas[id] });
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [id]: '' // Limpiamos el valor de la respuesta correspondiente al id
    }));
  };

  function deleteConsulta(quejaId) {
    const consultaRef = ref(database, `Consultas/${quejaId}`);
    remove(consultaRef)
      .then(() => {
        Swal.fire({
          title: 'Eliminado',
          text: 'consulta eliminada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        getData();
      })
      .catch((error) => {
        console.error('Error al eliminar la consulta:', error);
      });
  }

  return (
    <>
      <Navlogin />
      <div className='container'>
        <h1 className='titu'>Consultas frecuentes</h1>
        <br />
        <br />

        {consultas.map((consulta) => (
          <div className='contenidoQuejas' key={consulta.id}>
            <p className='pregunta'>
              <strong>Pregunta: {consulta.Consulta}</strong>
            </p>

            {consulta.respuesta && <p className='respuesta'>Respuesta: {consulta.respuesta}</p>}
            {!consulta.respuesta && (
              <div>
                <input
                  type='text'
                  placeholder='Respuesta'
                  value={respuestas[consulta.id] || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRespuestas((prevRespuestas) => ({
                      ...prevRespuestas,
                      [consulta.id]: value, // Guardamos el valor de la respuesta correspondiente al id
                    }));
                  }}
                />
                <button className='btn btn-danger' onClick={() => enviarRespuesta(consulta.id)}>
                  Enviar respuesta
                </button>
              </div>
            )}
            <i className='fa-solid fa-trash-can' onClick={() => deleteConsulta(consulta.id)} />
          </div>
        ))}

        <h2>Agregar nueva consulta</h2>
        <input
          type='text'
          placeholder='consulta'
          value={nuevaConsulta}
          onChange={(e) => setNuevaConsulta(e.target.value)}
        />
        <button className='btn btn-primary' onClick={enviarConsulta}>
          Enviar consulta
        </button>
      </div>
      <Footers />
    </>
  );
};

export default ConsultasAdmin;
