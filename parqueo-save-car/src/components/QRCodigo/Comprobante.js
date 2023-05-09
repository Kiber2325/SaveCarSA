import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const Comprobante = () => {
    const { comprobanteId } = useParams();
    const [product, setProduct] = useState(null);
    console.log(comprobanteId)
    useEffect(() => {
        const fetchProduct = async () => {
          // Realiza una consulta a Firebase Realtime Database utilizando el ID del producto
          const db = getDatabase();
          console.log(comprobanteId)
          const productRef = ref(db, `sitiosAutos/${comprobanteId}`);
          console.log(productRef)
          const productSnapshot = await get(productRef);
          console.log(productSnapshot)
          const productData = productSnapshot.val();
          console.log(productData)  
          setProduct(productData);
        };
    
        fetchProduct();
      }, [comprobanteId]);
  
    if (!product) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>{product.estado}</h1>
        <p>{product.nombre}</p>
      </div>
    );
}
export default Comprobante