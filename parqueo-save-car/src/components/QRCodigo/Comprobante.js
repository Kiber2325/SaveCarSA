import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get, set, push } from 'firebase/database';
import './Comprobante.css'
import jsPDF from 'jspdf';
//import { initializeApp } from 'firebase/app';

import { app, database } from '../../conexion/firebase';
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
      return <h1 className='carga'>Cargando...</h1>;
    }
    //PDF
    const descargarPDF=()=>{
      const doc = new jsPDF();
      console.log(product)
      // Agrega contenido al PDF
      let info=product.sitio+'\n'+
      product.ciCliente+'\n'+product.placa+'\n'+product.celular+'\n'+product.monto+'\n'+product.fecha
      +'\n'+product.hora;
      doc.text(info, 10, 10);
      //doc.addImage(getQRCodeDataUrl(), 'PNG', 10, 20, 50, 50);
  
      // Guarda el PDF
      doc.save('comprobante.pdf');
    }
    //reserva
    const confirmarReserva=()=>{
      let cad=product.sitio
      let cadRecortada=cad.slice(1)
      const dataRef = ref(database, 'sitiosAutos/'+cadRecortada);
      const nuevaData={nombre:product.sitio, estado:'reservado'}
      set(dataRef, nuevaData)
      .then(() => {
        console.log('Dato actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el dato:', error);
      });
      let fecha=new Date()
    let fechaAct=fecha.toDateString();
    let anio=fecha.getFullYear()
    let mes=fecha.getMonth()+1
    let dia=fecha.getDate()
    let diaSemana=fecha.getDay()
    let ingreso={
      anio:anio,
      mes:mes,
      fecha:dia,
      dia:diaSemana,
      monto:product.monto,
      fechaActual:fechaAct,
      ciCliente:product.ciCliente,
      celularCliente:product.celular,
      placaDelAuto:product.placa,
      lugarUsado:product.sitio,
    tipo:'Reserva'}
    const db=getDatabase(app)
    const collectionRef = ref(db,'ingresos');
    const newId = push(collectionRef).key;
    set(ref(database, "ingresos/"+(newId)), ingreso);
    }
    return (
      <div className='recibo'>
        <div>
          <h1>Comprobante de la reserva del sitio {product.sitio}</h1>
          <p>CI del cliente: {product.ciCliente}</p>
          <p>Placa del auto del Cliente: {product.placa}</p>
          <p>Número celular del cliente: {product.celular}</p>
          <p>Monto pagado: {product.monto},0 Bs.</p>
          <p>Fecha: {product.fecha}</p>
          <p>Hora: {product.hora}</p>
          <p>¡Gracias por la compra! Recuerda que debes enviar el comprobante para confirmar la reserva</p>
        </div>
        <div className='botonesComprobante'>
          <button className='botonComprobante' onClick={confirmarReserva}>Enviar comprobante</button>
          <button className='botonComprobante' onClick={descargarPDF}>Guardar como PDF</button>
        </div>
      </div>
    );
}
export default Comprobante