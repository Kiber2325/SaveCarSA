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
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const descargarPDF=()=>{
      const doc = new jsPDF();
      console.log(product)
      // Agrega contenido al PDF
      let info='SaveCar\nFactura Nro:'+(getRandomInt(3)+1)+'\nPor la ocupación del sitio: '+product.sitio+'\nCI del cliente: '+
      product.ciCliente+'\nPlaca del auto del cliente: '+product.placa+'\nCelular del auto del cliente:'+product.celular+
      '\nMonto pagado: '+product.monto+' Bs.\nFecha del transacción: '+tiempoLimite()+
      '\nHora de inicio reserva: '+product.hora+'\nHora límite de la reserva: '+formatoFecha()+'\n¡Atención! debes llegar antes a ocupar el sitio reservado antes de la hora de'+ 
      '\nfinalización de la reserva, de lo contrario perderá su reserva.\n¡Gracias por la compra! Recuerda que debes enviar el comprobante\npara confirmar la reserva.';
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
      const nuevaData={nombre:product.sitio, estado:'reservado',color:'#FC6901'}
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
    const tiempoLimite=()=>{
      let array=product.hora.split(':')
      let tiempoLimite=parseInt(product.hora.split(':')[0])
      if(tiempoLimite===22){
        tiempoLimite=0
      }else if(tiempoLimite===23){
        tiempoLimite=1
      }else{
        tiempoLimite=tiempoLimite+2
      }
      return formatoReloj(tiempoLimite)+':'+formatoReloj(parseInt(array[1]))+':'+formatoReloj(parseInt(array[2]));
    }
    const formatoReloj=(num)=>{
      let res=num
      if(res<10){
        res='0'+res
      }
      return res+''
    }
    const formatoFecha=()=>{
      let array=product.fecha.split(' ')
      return traducirDia(array[0])+' '+traducirMes(array[1])+' '+array[2]+' '+array[3]
    }
    const traducirDia=(diaEn)=>{
      let diaTraducido='';
      if(diaEn==='Mon'){
        diaTraducido='Lunes'
      }else if(diaEn==='Thu'){
        diaTraducido='Martes'
      }else if(diaEn==='Wed'){
        diaTraducido='Miércoles'
      }else if(diaEn==='Tue'){
        diaTraducido='Jueves'
      }else if(diaEn==='Fri'){
        diaTraducido='Viernes'
      }else if(diaEn==='Sat'){
        diaTraducido='Sábado'
      }else if(diaEn==='Sun'){
        diaTraducido='Domingo'
      }
      return diaTraducido;
    }
    const traducirMes=(mesEn)=>{
      let mesTraducido='';
      if(mesEn==='Jan'){
        mesTraducido='Enero'
      }else if(mesEn==='Feb'){
        mesTraducido='Febrero'
      }else if(mesEn==='Mar'){
        mesTraducido='Marzo'
      }else if(mesEn==='Apr'){
        mesTraducido='Abril'
      }else if(mesEn==='May'){
        mesTraducido='Mayo'
      }else if(mesEn==='Jun'){
        mesTraducido='Junio'
      }else if(mesEn==='Jul'){
        mesTraducido='Julio'
      }else if(mesEn==='Aug'){
        mesTraducido='Agosto'
      }else if(mesEn==='Sep'){
        mesTraducido='Septiembre'
      }else if(mesEn==='Oct'){
        mesTraducido='Octubre'
      }else if(mesEn==='Nov'){
        mesTraducido='Noviembre'
      }else if(mesEn==='Dec'){
        mesTraducido='Diciembre'
      }
      return mesTraducido;
    }
    return (
      <div className='recibo'>
        <div>
          <h1>Comprobante de la reserva del sitio {product.sitio}</h1>
          <p>CI del cliente: {product.ciCliente}</p>
          <p>Nombre y apellidos del cliente: {product.nombreapellido}</p>
          <p>Placa del auto del Cliente: {product.placa}</p>
          <p>Número celular del cliente: {product.celular}</p>
          <p>Monto pagado: {product.monto},0 Bs.</p>
          <p>Fecha: {formatoFecha()}</p>
          <p>Hora de inicio de la reserva: {product.hora}</p>
          <p>Hora de finalizacion de la reserva: {tiempoLimite()}</p>
          {product.fechaIni&&<p>Fecha de inicio {product.fechaIni}</p>}
          {product.fechaFin&&<p>Fecha de finalización {product.fechaFin}</p>}
          {product.periodo&&<p>Periodo escogido: Mes {product.periodo}</p>}
          {product.horaInicio&&<p>Hora de ingreso: {product.horaInicio} </p>}
          {product.horaFin&&<p>Hora de finalización: {product.horaFin} </p>}
          <p>¡Atención! debes llegar antes a ocupar el sitio reservado antes de la hora de finalización de la reserva, de lo contrario perderá su reserva.</p>
          <p>¡Gracias por la compra! Recuerda que debes enviar el comprobante para confirmar la reserva.</p>
        </div>
        <div className='botonesComprobante'>
          <button className='botonComprobante' onClick={confirmarReserva}>Enviar comprobante</button>
          <button className='botonComprobante' onClick={descargarPDF}>Guardar como PDF</button>
        </div>
      </div>
    );
}
export default Comprobante