import React, { useEffect, useState } from 'react';
import { database } from '../../conexion/firebase';
import { onValue, ref, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import './AnuncioAdmin.css';

const AnucioAdmin = () => {
  const [anuncio, setAnuncio] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    onValue(ref(database, 'Anuncios'), (snapshot) => {
      const dataObj = snapshot.val();
      console.log(dataObj);
      if (dataObj) {
        const dataArr = Object.entries(dataObj)
          .map(([id, anuncio]) => ({ id, ...anuncio }))
          .reverse(); // Invertir el orden de los anuncios
        setAnuncio(dataArr);
      } else {
        setAnuncio(null);
      }
    });
  }

  function deleteAnuncio(anuncioId) {
    const anuncioRef = ref(database, `Anuncios/${anuncioId}`);
    remove(anuncioRef)
      .then(() => {
        Swal.fire({
          title: 'Eliminado',
          text: 'Anuncio eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        getData();
      })
      .catch((error) => {
        console.error("Error al eliminar el anuncio:", error);
      });
  }

  return (
    <>
      <div className='ladoIzq'>
        {anuncio ? (
          <>
            <h2 className='titu'>Comunicados</h2> <br />
            {anuncio.map((anuncio) => (
              <div className="contenidoQuejas" key={anuncio.id}>
                <br />
                <p>
                  <strong>{anuncio.anuncio}</strong>
                </p>
                <i onClick={() => deleteAnuncio(anuncio.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </i>
              </div>
            ))}
          </>
        ) : (
          <p className='titu'>¡No se tiene ningún anuncio!</p>
        )}
      </div>
    </>
  );
};

export default AnucioAdmin;
