import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get, set, push } from "firebase/database";
import "./Comprobante.css";
import jsPDF from "jspdf";
//import { initializeApp } from 'firebase/app';

import { app, database } from "../../conexion/firebase";
import Swal from "sweetalert2";
const Comprobante = () => {
  const { comprobanteId } = useParams();
  const [product, setProduct] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const meses=[31,28,31,30,31,30,31,31,30,31,30,31]
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
    return <h1 className="carga">Cargando...</h1>;
  }
  //PDF
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const descargarPDF = () => {
    //formatoFecha()
    const doc = new jsPDF();
    console.log(product);
    // Agrega contenido al PDF
    let info =
      "SaveCar\nFactura Nro:" +
      (getRandomInt(3) + 1) +
      "\nPor la ocupación del sitio: " +
      product.sitio +
      "\nCI del cliente: " +
      product.ciCliente +
      "\nNombres y apellidos del cliente: " +
      product.nombreapellido +
      "\nPlaca del auto del cliente: " +
      product.placa +
      "\nCelular del cliente:" +
      product.celular +
      "\nMonto pagado: " +
      product.monto +
      " Bs.\nFecha de inicio de la reserva: " +
      product.fechaIni +
      " \nFecha de finalización de la reserva: " +
      product.fechaFin +
      "\nHora de inicio de la reserva: " +
      product.horaIni +
      "\nHora de finalización de la reserva: " +
      product.horaFin +
      "\n¡Atención! debes ocupar el sitio a la fecha y hora indicada" +
      "\nfinalización de la reserva, de lo contrario perderá su reserva.\n¡Gracias por la reserva! Recuerda que debes enviar el comprobante\npara confirmar la reserva.";
    doc.text(info, 10, 10);
    //doc.addImage(getQRCodeDataUrl(), 'PNG', 10, 20, 50, 50);

    // Guarda el PDF
    doc.save("comprobante.pdf");
    Swal.fire({
      title: "Éxito",
      text: "Se descargo su comprobante",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };
  //reserva
  const confirmarReserva = () => {
    if (product.tipoVehiculo === "Auto" || product.tipoVehiculo === undefined) {
      //let cad = product.sitio;
      //let cadRecortada = cad.slice(1);
      /*const dataRef = ref(database, 'sitiosAutos/'+cadRecortada);
      const nuevaData={nombre:product.sitio, estado:'reservado',color:'#FC6901'}
      set(dataRef, nuevaData)
      .then(() => {
        console.log('Dato actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el dato:', error);
      });*/
      let fecha = new Date();
      let fechaAct = fecha.toDateString();
      let anio = fecha.getFullYear();
      let mes = fecha.getMonth() + 1;
      let dia = fecha.getDate();
      let diaSemana = fecha.getDay();

      if (product.periodo !== undefined) {
        let ingreso = {
          anio: anio,
          mes: mes,
          fecha: dia,
          dia: diaSemana,
          monto: product.monto,
          fechaActual: fechaAct,
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          lugarUsado: product.sitio,
          tipo: "Reserva Mensual",
        };
        /*const dataRef = ref(database, "sitiosAutos/" + cadRecortada);
      const nuevaData = {
        nombre: product.sitio,
        estado: "reservado mes",
        color: "#808080",
        ciCliente: product.ciCliente,
        nombreApellido: product.nombreapellido,
        celularCliente: product.celular,
        placaDelAuto: product.placa,
        periodo:product.periodo,
        fechaIni:product.fechaIni,
        fechaFin:product.fechaFin,
        horaIni:product.horaInicio,
        horaFin:product.horaFin
      };
      set(dataRef, nuevaData)
        .then(() => {
          console.log("Dato actualizado correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar el dato:", error);
        });*/
        const db = getDatabase(app);
        const collectionRef = ref(db, "ingresos");
        const newId = push(collectionRef).key;
        set(ref(database, "ingresos/" + newId), ingreso);
        const nuevaReserva = {
          nombreSitio: product.sitio,
          estado: "reserva mes " + product.periodo,
          color: "#808080",
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          periodo: product.periodo,
          fechaIni: product.fechaIni,
          fechaFin: product.fechaFin,
          horaIni: product.horaIni,
          horaFin: product.horaFin,
        };
        let nombre_apelli=product.nombreapellido.split(' ')
        const valuesClie={
          ciCliente:product.ciCliente,
          nombre:nombre_apelli[0],
          apellido:nombre_apelli[1],
          celular:product.celular,
          estado:'activo'
        }
        set(ref(database, "clientesMensuales/"+(product.ciCliente)), valuesClie);
        set(ref(database, "reservas/" + newId), nuevaReserva);
        let horaIniPartida = product.horaIni.split(":");
        let horaFinPartida = product.horaFin.split(":");
        let fechaIniPartida=product.fechaIni.split('-')
        let fechaFinPartida=product.fechaFin.split('-')
        let nuevosTiempos = [];
        if (product.horaIni < product.horaFin) {
          for(let i=parseInt(fechaIniPartida[2]);i<meses[parseInt(fechaIniPartida[1]-1)];i++){
            let j=i
            if(j<10){
             j='0'+j 
            }
            const nuevoTiempo = {
              fecha:fechaIniPartida[0]+'-'+fechaIniPartida[1]+'-'+j,
              horasUsadas: parseInt(horaFinPartida[0])-parseInt(horaIniPartida[0]),
              minutosUsados: 0,
              segundosUsados: 0,
              sitioUsado: product.sitio,
            };
            nuevosTiempos.push(nuevoTiempo);
          }
          for(let i=1;i<=parseInt(fechaFinPartida[2]);i++){
              let j=i
              if(j<10){
               j='0'+j 
              }
              const nuevoTiempo = {
                fecha:fechaFinPartida[0]+'-'+fechaFinPartida[1]+'-'+j,
                horasUsadas: parseInt(horaFinPartida[0])-parseInt(horaIniPartida[0]),
                minutosUsados: 0,
                segundosUsados: 0,
                sitioUsado: product.sitio,
                horaIni: product.horaIni,
                horaFin: product.horaFin,
              };
              nuevosTiempos.push(nuevoTiempo);
            }
        } else {
          const nuevoTiempo1 = {
            fecha: product.fechaIni,
            horasUsadas: 24 - parseInt(horaFinPartida[0]),
            minutosUsados: 0,
            segundosUsados: 0,
            sitioUsado: product.sitio,
            horaIni: product.horaIni,
                horaFin: '23:59:59',
          };
          const nuevoTiempo2 = {
            fecha: product.fechaFin,
            horasUsadas: parseInt(horaIniPartida[0]),
            minutosUsados: 0,
            segundosUsados: 0,
            sitioUsado: product.sitio,
            horaIni: '00:00:00',
                horaFin: product.horaFin,
          };
          nuevosTiempos.push(nuevoTiempo1);
          nuevosTiempos.push(nuevoTiempo2);
        }
        for(let i=0;i<nuevosTiempos.length;i++){
          const db = getDatabase(app);
        const collectionRef = ref(db, "tiempoUso");
        const newIdT = push(collectionRef).key;
          console.log(nuevosTiempos[i])
          set(ref(database, 'tiempoUso/'+newIdT),nuevosTiempos[i])
        }
        setEnviando(true);
        Swal.fire({
          title: "Éxito",
          text: "Enviado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        let ingreso = {
          anio: anio,
          mes: mes,
          fecha: dia,
          dia: diaSemana,
          monto: product.monto,
          fechaActual: fechaAct,
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          lugarUsado: product.sitio,
          tipo: "Reserva",
        };
        /*const dataRef = ref(database, "sitiosAutos/" + cadRecortada);
      const nuevaData = {
        nombre: product.sitio,
        estado: "reservado",
        color: "#FC6901",
      };
      set(dataRef, nuevaData)
        .then(() => {
          console.log("Dato actualizado correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar el dato:", error);
        });*/
        const db = getDatabase(app);
        const collectionRef = ref(db, "ingresos");
        const newId = push(collectionRef).key;
        set(ref(database, "ingresos/" + newId), ingreso);
        let nuevaReserva = {
          nombreSitio: product.sitio,
          estado: "reservado",
          color: "#FC6901",
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          periodo: "corto",
          fechaIni: product.fechaIni,
          fechaFin: product.fechaFin,
          horaIni: product.horaIni,
          horaFin: product.horaFin,
        };
        if(product.tipo!==undefined){
          nuevaReserva= {
            nombreSitio: product.sitio,
            estado: "ocupado",
            color: "#0050C8",
            ciCliente: product.ciCliente,
            nombreApellido: product.nombreapellido,
            celularCliente: product.celular,
            placaDelAuto: product.placa,
            periodo: "corto",
            fechaIni: product.fechaIni,
            fechaFin: product.fechaFin,
            horaIni: product.horaIni,
            horaFin: product.horaFin,
          };
        }
        //console.log(nuevaReserva)
        set(ref(database, "reservas/" + newId), nuevaReserva);
        let horaIniPartida = product.horaIni.split(":");
        let horaFinPartida = product.horaFin.split(":");
        let nuevosTiempos = [];
        if (product.fechaIni === product.fechaFin) {
          const nuevoTiempo = {
            fecha: product.fechaIni,
            horasUsadas: parseInt(horaFinPartida[0])-parseInt(horaIniPartida[0]),
            minutosUsados: 0,
            segundosUsados: 0,
            sitioUsado: product.sitio,
            horaIni: product.horaIni,
                horaFin: product.horaFin,
          };
          nuevosTiempos.push(nuevoTiempo);
        } else {
          const nuevoTiempo1 = {
            fecha: product.fechaIni,
            horasUsadas: 24 - parseInt(horaFinPartida[0]),
            minutosUsados: 0,
            segundosUsados: 0,
            sitioUsado: product.sitio,
            horaIni: product.horaIni,
                horaFin: product.horaFin,
          };
          const nuevoTiempo2 = {
            fecha: product.fechaFin,
            horasUsadas: parseInt(horaIniPartida[0]),
            minutosUsados: 0,
            segundosUsados: 0,
            sitioUsado: product.sitio,
            horaIni: product.horaIni,
                horaFin: product.horaFin,
          };
          nuevosTiempos.push(nuevoTiempo1);
          nuevosTiempos.push(nuevoTiempo2);
        }
        for(let i=0;i<nuevosTiempos.length;i++){
          console.log(nuevosTiempos[i])
          set(ref(database, 'tiempoUso/'+newId),nuevosTiempos[i])
        }
        setEnviando(true);
        Swal.fire({
          title: "Éxito",
          text: "Enviado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    } else if (product.tipoVehiculo === "Moto") {
      let fecha = new Date();
      let fechaAct = fecha.toDateString();
      let anio = fecha.getFullYear();
      let mes = fecha.getMonth() + 1;
      let dia = fecha.getDate();
      let diaSemana = fecha.getDay();
      if (product.periodo !== undefined) {
        let ingreso = {
          anio: anio,
          mes: mes,
          fecha: dia,
          dia: diaSemana,
          monto: product.monto,
          fechaActual: fechaAct,
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          lugarUsado: product.sitio,
          tipo: "Reserva Mensual",
        };
        /*const dataRef = ref(database, "sitiosAutos/" + cadRecortada);
      const nuevaData = {
        nombre: product.sitio,
        estado: "reservado mes",
        color: "#808080",
        ciCliente: product.ciCliente,
        nombreApellido: product.nombreapellido,
        celularCliente: product.celular,
        placaDelAuto: product.placa,
        periodo:product.periodo,
        fechaIni:product.fechaIni,
        fechaFin:product.fechaFin,
        horaIni:product.horaInicio,
        horaFin:product.horaFin
      };
      set(dataRef, nuevaData)
        .then(() => {
          console.log("Dato actualizado correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar el dato:", error);
        });*/
        const db = getDatabase(app);
        const collectionRef = ref(db, "ingresos");
        const newId = push(collectionRef).key;
        set(ref(database, "ingresos/" + newId), ingreso);
        const nuevaReserva = {
          nombreSitio: product.sitio,
          estado: "reserva mes " + product.periodo,
          color: "#808080",
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          periodo: product.periodo,
          fechaIni: product.fechaIni,
          fechaFin: product.fechaFin,
          horaIni: product.horaIni,
          horaFin: product.horaFin,
        };
        let nombre_apelli=product.nombreapellido.split(' ')
        const valuesClie={
          ciCliente:product.ciCliente,
          nombre:nombre_apelli[0],
          apellido:nombre_apelli[1],
          celular:product.celular,
          estado:'activo'
        }
        set(ref(database, "clientesMensuales/"+(product.ciCliente)), valuesClie);
        set(ref(database, "reservasMotos/" + newId), nuevaReserva);
        setEnviando(true);
        Swal.fire({
          title: "Éxito",
          text: "Enviado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        let ingreso = {
          anio: anio,
          mes: mes,
          fecha: dia,
          dia: diaSemana,
          monto: product.monto,
          fechaActual: fechaAct,
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          lugarUsado: product.sitio,
          tipo: "Reserva",
        };
        /*const dataRef = ref(database, "sitiosAutos/" + cadRecortada);
      const nuevaData = {
        nombre: product.sitio,
        estado: "reservado",
        color: "#FC6901",
      };
      set(dataRef, nuevaData)
        .then(() => {
          console.log("Dato actualizado correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar el dato:", error);
        });*/
        const db = getDatabase(app);
        const collectionRef = ref(db, "ingresos");
        const newId = push(collectionRef).key;
        set(ref(database, "ingresos/" + newId), ingreso);
        const nuevaReserva = {
          nombreSitio: product.sitio,
          estado: "reservado",
          color: "#FC6901",
          ciCliente: product.ciCliente,
          nombreApellido: product.nombreapellido,
          celularCliente: product.celular,
          placaDelAuto: product.placa,
          periodo: "corto",
          fechaIni: product.fechaIni,
          fechaFin: product.fechaFin,
          horaIni: product.horaIni,
          horaFin: product.horaFin,
        };
        //console.log(nuevaReserva)
        set(ref(database, "reservasMotos/" + newId), nuevaReserva);
        let tiempoUso = {};
        let horaIniPartida = product.horaIni.split(":");
        let horaFinPartida = product.horaFin.split(":");
        if (product.fechaIni === product.fechaFin) {
          tiempoUso = {
            fecha: product.fechaIni,
            horasUsadas: diferenciaHoras(
              parseInt(horaIniPartida[0]),
              parseInt(horaFinPartida[0])
            ),
            minutosUsados: parseInt(
              parseInt(horaFinPartida[1]) - parseInt(horaIniPartida[1])
            ),
            segundosUsados: parseInt(horaIniPartida[2]),
            sitioUsado: product.sitio,
            horaIni: product.horaIni,
                horaFin: product.horaFin,
          };
        } else {
        }
        set(ref(database, "tiempoUso/" + newId), tiempoUso);
        setEnviando(true);
        Swal.fire({
          title: "Éxito",
          text: "Enviado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };
  const diferenciaHoras = (horaIniRes, horaFinRes) => {
    if (horaFinRes > horaIniRes) {
      return horaFinRes - horaIniRes;
    }
  };
  const tiempoLimite = () => {
    let array = product.horaIni.split(":");
    let tiempoLimite = parseInt(product.horaIni.split(":")[0]);
    if (tiempoLimite === 22) {
      tiempoLimite = 0;
    } else if (tiempoLimite === 23) {
      tiempoLimite = 1;
    } else {
      tiempoLimite = tiempoLimite + 2;
    }
    return (
      formatoReloj(tiempoLimite) +
      ":" +
      formatoReloj(parseInt(array[1])) +
      ":" +
      formatoReloj(parseInt(array[2]))
    );
  };
  const formatoReloj = (num) => {
    let res = num;
    if (res < 10) {
      res = "0" + res;
    }
    return res + "";
  };
  /*const formatoFecha = () => {
    let array = product.fecha.split(" ");
    return (
      traducirDia(array[0]) +
      " " +
      traducirMes(array[1]) +
      " " +
      array[2] +
      " " +
      array[3]
    );
  };
  const traducirDia = (diaEn) => {
    let diaTraducido = "";
    if (diaEn === "Mon") {
      diaTraducido = "Lunes";
    } else if (diaEn === "Thu") {
      diaTraducido = "Martes";
    } else if (diaEn === "Wed") {
      diaTraducido = "Miércoles";
    } else if (diaEn === "Tue") {
      diaTraducido = "Jueves";
    } else if (diaEn === "Fri") {
      diaTraducido = "Viernes";
    } else if (diaEn === "Sat") {
      diaTraducido = "Sábado";
    } else if (diaEn === "Sun") {
      diaTraducido = "Domingo";
    }
    return diaTraducido;
  };
  const traducirMes = (mesEn) => {
    let mesTraducido = "";
    if (mesEn === "Jan") {
      mesTraducido = "Enero";
    } else if (mesEn === "Feb") {
      mesTraducido = "Febrero";
    } else if (mesEn === "Mar") {
      mesTraducido = "Marzo";
    } else if (mesEn === "Apr") {
      mesTraducido = "Abril";
    } else if (mesEn === "May") {
      mesTraducido = "Mayo";
    } else if (mesEn === "Jun") {
      mesTraducido = "Junio";
    } else if (mesEn === "Jul") {
      mesTraducido = "Julio";
    } else if (mesEn === "Aug") {
      mesTraducido = "Agosto";
    } else if (mesEn === "Sep") {
      mesTraducido = "Septiembre";
    } else if (mesEn === "Oct") {
      mesTraducido = "Octubre";
    } else if (mesEn === "Nov") {
      mesTraducido = "Noviembre";
    } else if (mesEn === "Dec") {
      mesTraducido = "Diciembre";
    }
    return mesTraducido;
  };
*/
  return (
    <div className="recibo">
      <div>
        <h1>Comprobante de la reserva del sitio {product.sitio}</h1>
        <p>CI del cliente: {product.ciCliente}</p>
        <p>Nombre y apellidos del cliente: {product.nombreapellido}</p>
        <p>Placa del auto del Cliente: {product.placa}</p>
        <p>Número celular del cliente: {product.celular}</p>
        <p>Monto pagado: {product.monto},0 Bs.</p>
        {
          //<p>Fecha: {formatoFecha()}</p>
        }
        {false && <p>Hora de inicio de la reserva: {product.horaIni}</p>}
        {false && <p>Hora de finalizacion de la reserva: {tiempoLimite()}</p>}
        {product.fechaIni && <p>Fecha de inicio: {product.fechaIni}</p>}
        {product.fechaFin && <p>Fecha de finalización: {product.fechaFin}</p>}
        {product.periodo && <p>Periodo escogido: Mes {product.periodo}</p>}
        {product.horaIni && <p>Hora de ingreso: {product.horaIni} </p>}
        {product.horaFin && <p>Hora de finalización: {product.horaFin} </p>}
        <p>
          ¡Atención! debes ocupar el sitio a la fecha y hora indicada, de lo
          contrario perderá su reserva.
        </p>
        <p>
          ¡Gracias por la reserva! Recuerda que debes enviar el comprobante para
          confirmar la reserva.
        </p>
      </div>
      <div className="botonesComprobante">
        <button
          className="botonComprobante"
          onClick={confirmarReserva}
          disabled={enviando}
        >
          Enviar comprobante
        </button>
        <button className="botonComprobante" onClick={descargarPDF}>
          Guardar como PDF
        </button>
      </div>
    </div>
  );
};
export default Comprobante;
