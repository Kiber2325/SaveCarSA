
import './Anuncios.css'
import React, { useEffect, useState } from 'react'
import Navlading from '../landingPage/Navlading'
import Footers from '../Footer/Footer'
import { onValue, ref } from 'firebase/database'
import { database } from '../../conexion/firebase'

const Anuncio = () => {
    const [anuncio, setAnuncio] = useState([]);

    useEffect(()=>{
       getData()
     },[]);
     function getData() {
       onValue(ref(database, 'Anuncios'), (snapshot) => {
            const dataObj = snapshot.val();
            console.log(dataObj);
            if (dataObj) { // Verificar si dataObj no es null ni undefined
                const dataArr = Object.entries(dataObj).map(([id, anuncio]) => ({ id, ...anuncio }));
                setAnuncio(dataArr);
            }  else{
                setAnuncio(null)
                            }
       });
     }
  return (
    <>
       <Navlading/>
       <div className='container'>
       {anuncio ? (
         anuncio.map((anuncio) => (
            <div className="contenidoAnuncio" key={anuncio.id}>
                <br/>
                <h2 className='titu'>Comunicado</h2> <br/>
              <p>
              <strong>{anuncio.anuncio}</strong>
              </p>
             
           </div>
            ))
        ) : (
        <p className='titu'>¡No se tiene ningun anuncio!</p>
        )}
        
       </div>
       <Footers/>
    </>
  )
}

export default Anuncio