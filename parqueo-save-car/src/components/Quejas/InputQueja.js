import { push, ref } from 'firebase/database';
import React, { useState } from 'react'
import { database } from '../../conexion/firebase';
import Swal from 'sweetalert2';



const InputQueja = () => {
  const [message, setMessage]= useState("")

  
  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(database, "Quejas"), { message });
    Swal.fire({
      title: 'Éxito',
      text: 'Enviado exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    setMessage("");
  };

  return (
    <div className='formula'>
      <label>
         <h4>Escribe tu reclamo, tu opinión nos importa:</h4>
      </label>
      <form  onSubmit={handleSubmit}>
        <textarea 
          className='inp' 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
       />
      <div className='volv'>
        <a className='cancelar btn  ' href='/'  >Cancelar</a>
      <button  className='env' type="submit">Enviar</button>
      </div>
      </form>
    </div>
  );
};

export default InputQueja