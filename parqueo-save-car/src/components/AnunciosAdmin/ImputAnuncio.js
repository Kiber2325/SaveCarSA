import { push, ref } from 'firebase/database';
import React, { useState } from 'react'
import { database } from '../../conexion/firebase';
import Swal from 'sweetalert2';
import './AnuncioAdmin.css'

const ImputAnuncio = () => {
    const [anuncio, setAnuncio]= useState("")

  
    const handleSubmit = (e) => {
      e.preventDefault();
      push(ref(database, "Anuncios"), { anuncio });
      Swal.fire({
        title: 'Éxito',
        text: 'Enviado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      setAnuncio("");
    };
  
    return (
      <div className='formula'>
        <label>
           <h4>Escribe el anuncio que quiere publicar</h4>
        </label>
        <form  onSubmit={handleSubmit}>
          <textarea 
            className='inputext' 
            value={anuncio}
            placeholder='Escriba el anuncio ...'
            onChange={(e) => setAnuncio(e.target.value)}
         />
        <div className='volv'>
          <a className='cancelar btn  ' href='/'  >Cancelar</a>
        <button  className='env' type="submit">Publicar</button>
        </div>
        </form>
      </div>
    );
  };


export default ImputAnuncio