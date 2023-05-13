import React, { useEffect, useState } from 'react'
import { database } from '../../conexion/firebase';
import { onValue, ref } from 'firebase/database';

import './Quejas.css'


const Queja = () => {
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
      getData()
    },[]);
    function getData() {
      onValue(ref(database, 'Quejas'), (snapshot) => {
        const dataObj = snapshot.val();
        const dataArr = Object.values(dataObj);
        setPosts(dataArr);
      });
    }
  

      return (
        <>
          <div class="containersss">
          
          <div className='izq'>
       
          {posts.map((post)=>(
            
                <div className='contenidoQuejas' >
                <p key={post.id}> <strong>- { post.message}</strong> </p>
                </div>
          ))}
        
           </div>
              
           </div>
          

      </>
    );
  };

export default Queja;