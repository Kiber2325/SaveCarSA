import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import './Comprobante.css'
const Comprobante = () => {
    const { comprobanteId } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
          // Realiza una consulta a Firebase Realtime Database utilizando el ID del producto
          const db = getDatabase();
          const productRef = ref(db, `comprobantes/${comprobanteId}`);
          const productSnapshot = await get(productRef);
          const productData = productSnapshot.val();
          setProduct(productData);
        };
    
        fetchProduct();
      }, [comprobanteId]);
  
    if (!product) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className='recibo'>
        <h1>Comprobante de la reserva del sitio {product.sitio}</h1>
        <p>CI del cliente: {product.ciCliente}</p>
        <p>Placa del auto del Cliente: {product.placa}</p>
        <p>Número celular del cliente: {product.celular}</p>
        <p>Monto pagado: {product.monto},0 Bs.</p>
        <p>Fecha: {product.fecha}</p>
        <p>Hora: {product.hora}</p>
        <p>¡Gracias por la compra!</p>
      </div>
    );
}
export default Comprobante