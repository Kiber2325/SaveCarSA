import React, { useEffect, useState } from 'react'
import { database } from '../../conexion/firebase';
import { onValue, ref, remove } from 'firebase/database';

import './Quejas.css'
import Swal from 'sweetalert2';


const Queja = () => {
    const [posts, setPosts] = useState([]);

   useEffect(()=>{
      getData()
    },[]);
    function getData() {
      onValue(ref(database, 'Quejas'), (snapshot) => {
        // const dataObj = snapshot.val();
        // const dataArr = Object.values(dataObj);
           const dataObj = snapshot.val();
           const dataArr = Object.entries(dataObj).map(([id, queja]) => ({ id, ...queja }));
        setPosts(dataArr);
      });
    }

    function deleteQueja(quejaId) {
      const quejaRef = ref(database, `Quejas/${quejaId}`);
      remove(quejaRef)
        .then(() => {
          Swal.fire({
            title: 'Éxito',
            text: 'Queja eliminada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          getData();
        })
        .catch((error) => {
          console.error("Error al eliminar la queja:", error);
        });
    }
    
    

    
  

      return (
        <>
        <div class="containersss">
          <div className='izq'>
            {posts.map((post) => (
              <div className='contenidoQuejas' key={post.id}>
                <p> <strong>- {post.message}</strong> </p>
                <button onClick={() => deleteQueja(post.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default Queja;