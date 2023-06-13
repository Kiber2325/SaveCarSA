import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EntradaInput from "../Sitio/EntradasModal/EntradaInput";
import QrCodigo from "../QRCodigo/QrCodigo";
import { ref, set } from "firebase/database";
import { database } from "../../conexion/firebase";
const SitioReserva = (props) => {
  const [estadoSitio, setEstadoSitio] = useState(props.estado);
  const [color, setColor] = useState(props.color);
  const reservas = props.horarioReserva;
  const cambiarEstado = () => {
    let estadoSitio2 = estadoSitio;
    console.log(estadoSitio2)
    if (estadoSitio2 === "disponible") {
      setModalEstado(true);
      console.log(estadoSitio);
    } else if (estadoSitio2 === "reservado mes"||estadoSitio2==='reservado'||
    estadoSitio2 === "reserva mes noche"||estadoSitio2 === "reserva mes dia") {
      console.log(reservas);
       setModalEstado(true);
      // console.log(estadoSitio);
      let hora = new Date();
      let minutos = hora.getMinutes();
      if (minutos < 10) {
        minutos = "0" + hora.getMinutes();
      }
      let horaAct = hora.getHours() + ":" + minutos + ":" + hora.getSeconds();
      let mes = hora.getMonth() + 1;
      if (mes < 10) {
        mes = "0" + mes;
      }
      let fechaAct = hora.getFullYear() + "-" + mes + "-" + hora.getDate();
      if (
        horaInicioSiti !== undefined &&
        horaFinSiti !== undefined &&
        fechaIniSiti !== undefined &&
        fechaFinSiti !== undefined
      ) {
        if (
          fechaAct >= fechaIniSiti &&
          fechaAct <= fechaFinSiti &&
          horaAct >= horaInicioSiti &&
          horaAct <= horaFinSiti
        ) {
          setModalEstadoOcupado(true);
        } else {
          setModalEstado(true);
        }
      }
    } else {
      setModalEstadoOcupado(true);
    }
  };
  //Modal
  const [modalEstado, setModalEstado] = useState(false);
  const [modalEstadoOcupado, setModalEstadoOcupado] = useState(false);

  const [mostrarMensajePlaca, setMostrarMensajePlaca] = useState(false);
  const [mostrarMensajeCi, setMostrarMensajeCi] = useState(false);
  const [mostrarMensajeNombre, setMostrarMensajeNombre] = useState(false);
  const [mostrarMensajeCelular, setMostrarMensajeCelular] = useState(false);
  const [mensajePlaca, setMensajePlaca] = useState("");
  const [mensajeCi, setMensajeCi] = useState("");
  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeCelular, setMensajeCelular] = useState("");
  const [errorFechaIni,setErrorFechaIni]=useState('')
  const [mostrarErrorFechaIni,setMostrarErrorFechaIni]=useState(false)
  const [errorFechaIniD,setErrorFechaIniD]=useState('')
  const [mostrarErrorFechaIniD,setMostrarErrorFechaIniD]=useState(false)
  // const  [tipo, setTipo]=useState('')
  const [values, setValues] = useState({
    placa: "",
    ci: "",
    celular: "",
    nombreapellido: "",
  });
  const [tipo, setTipo] = useState("reservaD");
  const [tarRes, setTarRes] = useState(400.0);
  const [tarHor,setTarHor]=useState(3)
  const [tarHora,setTarHora]=useState(1)
  const [periodo, setPeriodo] = useState("dia");
  const [horaInicio, setHoraInicio] = useState("06:00:00");
  const [horaFin, setHoraFin] = useState("22:00:00");
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const cancelarAccion = () => {
    quitarMensajesError();
    setModalEstado(false);
  };
  const quitarMensajesError = () => {
    setMostrarMensajePlaca(false);
    setMostrarMensajeCi(false);
    setMostrarMensajeNombre(false)
    setMostrarMensajeCelular(false);
    setMostrarErrorFechaIni(false)
    setMostrarErrorFechaIniD(false)
    setMensajePlaca('')
    setMensajeCi('')
    setMensajeNombre('')
    setMensajeCelular('')
    setFechaIni('')
    setFechaIniD('')
  };
  const validarInputPlaca = (
    contenido,
    mostrar,
    mensajeAlerta,
    regla,
    min,
    max
  ) => {
    let esInvalido = false;
    let tam = contenido.length;
    if (!contenido.trim()) {
      setMostrarMensajePlaca(mostrar);
      setMensajePlaca("El campo no puede estar vacío");
      esInvalido = true;
    } else if (tam < min || tam > max) {
      setMostrarMensajePlaca(mostrar);
      setMensajePlaca(
        "El campo tiene límite mínimo de " +
          min +
          " carácteres y un máximo de " +
          max +
          " carácteres"
      );
      esInvalido = true;
    } else if (!regla.test(contenido)) {
      setMostrarMensajePlaca(mostrar);
      setMensajePlaca(mensajeAlerta);
      esInvalido = true;
    } else {
      setMostrarMensajePlaca(false);
      //setMensajePlaca(null)
    }
    return esInvalido;
  };
  const validarInputCi = (
    contenido,
    mostrar,
    mensajeAlerta,
    regla,
    min,
    max
  ) => {
    let esInvalido = false;
    let tam = contenido.length;
    if (!contenido.trim()) {
      setMostrarMensajeCi(mostrar);
      setMensajeCi("El campo no puede estar vacío");
      esInvalido = true;
    } else if (tam < min || tam > max) {
      setMostrarMensajeCi(mostrar);
      setMensajeCi(
        "El campo tiene límite mínimo de " +
          min +
          " carácteres y un máximo de " +
          max +
          " carácteres"
      );
      esInvalido = true;
    } else if (!regla.test(contenido)) {
      setMostrarMensajeCi(mostrar);
      setMensajeCi(mensajeAlerta);
      esInvalido = true;
    } else {
      setMostrarMensajeCi(false);
      //setMensajeCi(null)
    }
    return esInvalido;
  };
  const validarInputNombre = (
    contenido,
    mostrar,
    mensajeAlerta,
    regla,
    min,
    max
  ) => {
    let esInvalido = false;
    let tam = contenido.length;
    if (!contenido.trim()) {
      setMostrarMensajeNombre(mostrar);
      setMensajeNombre("El campo no puede estar vacío");
      esInvalido = true;
    } else if (tam < min || tam > max) {
      setMostrarMensajeNombre(mostrar);
      setMensajeNombre(
        "El campo tiene límite mínimo de " +
          min +
          " carácteres y un máximo de " +
          max +
          " carácteres"
      );
      esInvalido = true;
    } else if (!regla.test(contenido)) {
      setMostrarMensajeNombre(mostrar);
      setMensajeNombre(mensajeAlerta);
      esInvalido = true;
    } else {
      setMostrarMensajeNombre(false);
      //setMensajeCi(null)
    }
    return esInvalido;
  };
  const validarInputCelular = (
    contenido,
    mostrar,
    mensajeAlerta,
    regla,
    min,
    max
  ) => {
    let esInvalido = false;
    let tam = contenido.length;
    if (!contenido.trim()) {
      setMostrarMensajeCelular(mostrar);
      setMensajeCelular("El campo no puede estar vacío");
      esInvalido = true;
    } else if (tam < min || tam > max) {
      setMostrarMensajeCelular(mostrar);
      setMensajeCelular(
        "El campo tiene límite mínimo de " +
          min +
          " carácteres y un máximo de " +
          max +
          " carácteres"
      );
      esInvalido = true;
    } else if (!regla.test(contenido)) {
      setMostrarMensajeCelular(mostrar);
      setMensajeCelular(mensajeAlerta);
      esInvalido = true;
    } else {
      setMostrarMensajeCelular(false);
      //setMensajeCelular(null)
    }
    return esInvalido;
  };
  const validarFechaIni = () => {
    let esInvalido = false;
    if (fechaIni.length === 0) {
      esInvalido = true;
    }
    for (let i = 0; i < reservas.length && esInvalido === false; i++) {
      if (tipo === "reservaM") {
        let reservasFechaIniFin=[]
        for(let i=0;i<reservas.length;i++){
          if(reservas[i].fechaIni>=fechaIni&&reservas[i].fechaFin<=fechaFin){
            reservasFechaIniFin.push(reservas[i])
          }else if(reservas[i].fechaFin>fechaFin&&reservas[i].fechaIni<=fechaFin){
            reservasFechaIniFin.push(reservas[i])
          }else if(reservas[i].fechaFin>=fechaIni&&reservas[i].fechaIni<fechaIni){
            reservasFechaIniFin.push(reservas[i])
          }
        }
        console.log(reservasFechaIniFin)
        if(periodo==='dia'){
          let encontrado=false
          let horaIniMesDia='06:00';let horaFinMesDia='22:00'
          for(let i=0;i<reservasFechaIniFin.length&&encontrado===false;i++){
            if(reservasFechaIniFin[i].horaIni>=horaIniMesDia&&reservasFechaIniFin[i].horaFin<=horaFinMesDia){
              encontrado=true
            }else if(reservasFechaIniFin[i].fechaIni<reservasFechaIniFin[i].fechaFin){
              if(reservasFechaIniFin[i].fechaFin>=fechaIni&&reservasFechaIniFin[i].horaFin>=horaIniMesDia){
                encontrado=true
              }else if(reservasFechaIniFin[i].fechaIni<=fechaFin&&reservasFechaIniFin[i].horaIni<=horaFinMesDia){
                encontrado=true
              }
            } 
          }
          if(encontrado===false){
            console.log('Reserva correcta')
          }else{
            let men='Ya existe una reserva en este periodo'
            console.log(men)
            setErrorFechaIni(men)
          }
        }else if(periodo==='noche'){
          
        }/*
        if (
          fechaIni >= reservas[i].fechaIni &&
          fechaIni <= reservas[i].fechaFin
        ) {
          if (horaInicio === reservas[i].horaIni) {
            let men = "Ya existe una reserva en esta fecha";
            setMostrarErrorFechaIni(true)
            setErrorFechaIni(men)
            esInvalido = true;
          } else {
            console.log("Reserva  correcta");
          }
        } else if (
          fechaFin >= reservas[i].fechaIni &&
          fechaFin <= reservas[i].fechaFin
        ) {
          if (horaInicio === reservas[i].horaIni) {
            let men = "Ya existe una reserva en esta fecha";
            setMostrarErrorFechaIni(true)
            setErrorFechaIni(men)
            esInvalido = true;
          } else {
            console.log("Reserva correcta");
          }
        } else {
          console.log("Reserva correcta");
        }*/
      }
    }

    return esInvalido;
  };
  const validarFechaIniD = () => {
    let esInvalido = false;
    if (fechaIniD.length === 0) {
      esInvalido = true;
    }
    let dateNow = new Date();
    let horas = dateNow.getHours();
    let minutos = dateNow.getMinutes();
    let segundos = dateNow.getSeconds();
    let horaFinal=horaInicioReserva.split(':')
    let horaFin = calcularHoraFin(parseInt(tarHora), parseInt(horaFinal[0]), parseInt(horaFinal[1]));
    if (horas < 10) {
      horas = "0" + horas;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    if (segundos < 10) {
      segundos = "0" + segundos;
    }
    let horaCompleta = horas + ":" + minutos + ":" + segundos;
    for (let i = 0; i < reservas.length && esInvalido === false; i++) {
      if (tipo === "reservaD") {
        if (
          fechaIniD >= reservas[i].fechaIni &&
          fechaIniD <= reservas[i].fechaFin
        ) {
          if (reservas[i].horaIni > reservas[i].horaFin) {
            if ((horaInicioReserva >= reservas[i].horaIni || horaFin<reservas[i].horaFin)) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaCompleta)
              console.log(horaFin)
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            } else {
              console.log("Reserva  correcta");
            }
          }else{
            if ((horaInicioReserva+':00' >= reservas[i].horaIni && horaInicioReserva+':00'<=reservas[i].horaFin)) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaInicioReserva)
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            } else if(horaFin+':00'>=reservas[i].horaIni && horaFin+':00'<=reservas[i].horaFin){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaFin+':00')
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            } else{
              console.log(horaInicioReserva)
              console.log(horaFin)
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log("Reserva  correcta");
            }
          }
        }/* else if (
          fechaFin >= reservas[i].fechaIni &&
          fechaFin <= reservas[i].fechaFin
        ) {
          if (horaFin > reservas[i].horaIni) {
            let men = "Ya existe una reserva en esta fecha y hora";
            setMostrarErrorFechaIniD(true)
            setErrorFechaIniD(men)
            console.log(men)
            console.log(horaFin)
            esInvalido = true;
          } else {
            console.log("Reserva  correcta");
          }
        } else {
          console.log("Reserva  correcta");
        }*/
      }
    }
    /*let arregloFiltrado=reservas.filter((reser)=>(fechaIniD >= reser.fechaIni &&
      fechaIniD <= reser.fechaFin))
    let filtradoHora=arregloFiltrado.filter((reser)=>((horaCompleta >= reser.horaIni && horaCompleta<reser.horaFin)))
    console.log(filtradoHora)*/
    return esInvalido;
  };
  const calcularHoraFin = (aumento,horas, minutos) => {
    horas=horas+aumento
    if (horas > 23) {
      horas = horas%24;
    }
    if (horas < 10) {
      horas = "0" + horas;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    return horas + ":" + minutos ;
  };
  const ejecutarAccion = () => {
    //formato
    //const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexCar = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexNumber = /^[0-9]+$/;
    const regexPlaca = /^[0-9A-ZÑÁÉÍÓÚÜ\s]+$/;
    //mensajes alertas
    let alertaPlaca = "Solo se permiten carácteres alfanuméricos y mayúsculas";
    let alertaCi = "Solo se permiten carácteres numéricos";
    let alertaNombre = "Solo se permiten carácteres alfabéticos";
    let alertaCelular = "Solo se permiten carácteres numéricos";
    if (tipo === "reservaD") {
      let validarPlaca = !validarInputPlaca(
        values.placa,
        true,
        alertaPlaca,
        regexPlaca
      );
      let validarCi = !validarInputCi(values.ci, true, alertaCi, regexNumber);
      let validarNombre = !validarInputNombre(
        values.nombreapellido,
        true,
        alertaNombre,
        regexCar
      );
      let validarCelular = !validarInputCelular(
        values.celular,
        true,
        alertaCelular,
        regexNumber
      );
      let validarFechaIniDi = !validarFechaIniD();
      let validar =
        validarPlaca &&
        validarCi &&
        validarNombre &&
        validarCelular &&
        validarFechaIniDi;
      console.log(tarHor)
      console.log(tarHora)
      console.log((parseInt(horaInicioReserva.split(':')[0])+parseInt(tarHora))%24)
      console.log(fechaIniD)
      if (validar === true) {
        setModalEstado(false);
        setEstadoSitio("reservado");
        //setCardColor(cardColors.reservado)
        let fecha = new Date();
        let hora = fecha.getTime();
        let anio=fecha.getFullYear();let mes=fecha.getMonth()+1;let dia=fecha.getDay()
        if(mes<10){
          mes='0'+mes
        }
        if(dia<10){
          dia='0'+dia
        }
        /*let hour=fecha.getHours();let minute=fecha.getMinutes();let second=fecha.getSeconds();
        if(hour<10){
          hour='0'+hour
        }
        if(minute<10){
          minute='0'+minute
        }
        if(second<10){
          second='0'+second
        }*/
        let horaActual=horaInicioReserva.split(':')
        let hour=parseInt(horaActual[0])
        let fechaFinal=fechaIniD
        if(hour+parseInt(tarHora)>23){
          let sepFechaFinal=fechaFinal.split('-')
          let diaFinal=parseInt(sepFechaFinal[2])
          let dayActualizado=diaFinal+1
          if(dayActualizado<10){
            dayActualizado='0'+dayActualizado
          }
          fechaFinal=anio+'-'+mes+'-'+dayActualizado
        }
        const comprobanteData = {
          sitio: props.nombre,
          placa: values.placa,
          ciCliente: values.ci,
          nombreapellido: values.nombreapellido,
          celular: values.celular,
          fechaIni: fechaIniD,
          fechaFin:fechaFinal,
          horaIni:horaInicioReserva+':00',
          horaFin:calcularHoraFin(parseInt(tarHora),hour,parseInt(horaActual[1]))+':00',  
          monto: tarHor,
        };
        let idUnico =
          values.placa +
          values.ci +
          hora +
          fecha.getHours() +
          "-" +
          fecha.getMinutes() +
          "-" +
          fecha.getSeconds();
        console.log(idUnico);
        console.log(comprobanteData);
        set(ref(database, "comprobantes/" + idUnico), comprobanteData);
        setUrl(urlDef + idUnico);
        setModalQr(true);
        /*clearInterval(intert);
            updatedS=10;updatedTM=0;
            setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
            startTemp()*/
            quitarMensajesError()
      }
    } else if (tipo === "reservaM") {
      let validarPlaca = !validarInputPlaca(
        values.placa,
        true,
        alertaPlaca,
        regexPlaca
      );
      let validarCi = !validarInputCi(values.ci, true, alertaCi, regexNumber);
      let validarNombre = !validarInputNombre(
        values.nombreapellido,
        true,
        alertaNombre,
        regexCar
      );
      let validarCelular = !validarInputCelular(
        values.celular,
        true,
        alertaCelular,
        regexNumber
      );
      let validarFechaIn = !validarFechaIni();
      console.log(validarFechaIn);
      let validar =
        validarPlaca &&
        validarCi &&
        validarNombre &&
        validarCelular &&
        validarFechaIn;
      if (validar === true) {
        setModalEstado(false);
        setEstadoSitio("reservado");
        //setCardColor(cardColors.reservado)
        let fecha = new Date();
        let hora = fecha.getTime();
        const comprobanteDataM = {
          sitio: props.nombre,
          placa: values.placa,
          ciCliente: values.ci,
          nombreapellido: values.nombreapellido,
          celular: values.celular,
          fecha: fecha.toDateString(),
          hora:
            fecha.getHours() +
            ":" +
            fecha.getMinutes() +
            ":" +
            fecha.getSeconds(),
          fechaIni: fechaIni,
          fechaFin: fechaFin,
          periodo: periodo,
          horaIni: horaInicio,
          horaFin: horaFin,
          monto: parseFloat(tarRes),
        };
        let idUnico =
          values.placa +
          values.ci +
          hora +
          fecha.getHours() +
          "-" +
          fecha.getMinutes() +
          "-" +
          fecha.getSeconds();
        console.log(idUnico);
        console.log(comprobanteDataM);
        set(ref(database, "comprobantes/" + idUnico), comprobanteDataM);
        setUrl(urlDef + idUnico);
        setModalQr(true);
        quitarMensajesError()
      }
    }
  };
  //QR
  const [modalQr, setModalQr] = useState(false);
  const cerrarModalQR = () => {
    setModalQr(false);
  };
  const urlDef="https://creative-sable-0d4ce3.netlify.app/comprobante/"
  const [url, setUrl] = useState('');
  const cerrarModalEstadoOcupado = () => {
    setModalEstadoOcupado(false);
  };
  //tipo reserva
  const [fechaIni, setFechaIni] = useState("");
  const [mostrarFechaIni, setMostrarFechaIni] = useState(false);
  const [fechaIniD, setFechaIniD] = useState("");
  const [mostrarFechaIniD, setMostrarFechaIniD] = useState(true);
  const [horaInicioReserva,setHoraInicioReserva]=useState('')
  const tipoReserva = (opcion) => {
    setTipo(opcion);
    //setValues(values.tipo)
    if (opcion === "reservaM") {
      console.log(values.fechaIni);
      setMostrarFechaIni(true);
      setMostrarFechaIniD(false);
    } else if (opcion === "reservaD") {
      console.log(opcion);
      setMostrarFechaIni(false);
      setMostrarFechaIniD(true);
    }
  };
  const tarifaReserva = (newTarifa) => {
    setTarRes(newTarifa);
    if (newTarifa === "400") {
      setPeriodo("dia");
      setHoraInicio("06:00:00");
      setHoraFin("22:00:00");
    } else if (newTarifa === "300") {
      setPeriodo("noche");
      setHoraInicio("22:00:00");
      setHoraFin("06:00:00");
    } else if (newTarifa === "600") {
      setPeriodo("completo");
      setHoraInicio("00:00:00");
      setHoraFin("23:59:00");
    }
  };
  const tarifaHoraria=(newTarifaHoraria)=>{
    let horaElegida=parseInt(newTarifaHoraria)
    setTarHor(horaElegida)
    if(horaElegida===3){
      setTarHora(1)
    }else if(horaElegida===6){
      setTarHora(4)
    }else if(horaElegida===10){
      setTarHora(12)
    }else if(horaElegida===15){
      setTarHora(24)
    }
  }
  const [fechaFin, setFechaFin] = useState("");
  const onChangeFechaIni = (e) => {
    setFechaIni(e.target.value);
    setMostrarErrorFechaIni(false)
    //setTipo(e.target.value)
    let fechaFinalizacion = "";
    if (e.target.value !== 0) {
      let fechaSep = e.target.value.split("-");
      let mesFin = parseInt(fechaSep[1]) + 1;
      if (mesFin < 10) {
        mesFin = "0" + mesFin;
      } else {
        mesFin = mesFin + "";
      }
      fechaFinalizacion = fechaSep[0] + "-" + mesFin + "-" + fechaSep[2];
      console.log(fechaFinalizacion);
      setFechaFin(fechaFinalizacion);
    }
    //return fechaFinalizacion
  };
  const onChangeFechaIniD = (e) => {
    setFechaIniD(e.target.value);
    setMostrarErrorFechaIniD(false)
  };
  const onChangeHoraInicioReserva=(e)=>{
    setHoraInicioReserva(e.target.value)
  }
  const [currentTime, setCurrentTime] = useState(new Date());
  /*let horaInicioSitio='16:11:00'
  let horaFinSitio='22:58:00'
  let fechaIniSitio='2023-05-28'
  let fechaFinSitio='2023-05-29'*/
  let horaInicioSiti = props.timeIni;
  let horaFinSiti = props.timeFin;
  let fechaIniSiti = props.dateIni;
  let fechaFinSiti = props.dateFin;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      let hora = new Date();
      let horas = hora.getHours();
      if (horas < 10) {
        horas = "0" + horas;
      }
      let minutos = hora.getMinutes();
      if (minutos < 10) {
        minutos = "0" + hora.getMinutes();
      }
      let horaAct = horas + ":" + minutos + ":" + hora.getSeconds();
      let mes = hora.getMonth() + 1;
      if (mes < 10) {
        mes = "0" + mes;
      }
      let day = hora.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let fechaAct = hora.getFullYear() + "-" + mes + "-" + day;
      let arregloFiltrado=reservas.filter((reser)=>(fechaAct >= reser.fechaIni &&
        fechaAct <= reser.fechaFin))
        //console.log(arregloFiltrado)
      //let filtradoHora=arregloFiltrado.filter((reser)=>((horaAct<reser.horaFin)))
      //console.log(filtradoHora)
      //console.log(reservas)
      if(arregloFiltrado.length!==0){
        let encontrado=false
        for(let i=0;i<arregloFiltrado.length&&encontrado===false;i++){
          //console.log(arregloFiltrado[i].horaIni)
          if(arregloFiltrado[i].horaIni>arregloFiltrado[i].horaFin){
            //console.log('ehh')
            if(horaAct>=arregloFiltrado[i].horaIni||horaAct<=arregloFiltrado[i].horaFin){
              setColor(arregloFiltrado[i].color)
              setEstadoSitio(arregloFiltrado[i].estado)
              encontrado=true
            }else{
              setColor('#00FF38')
              setEstadoSitio('disponible')
            }
          }else if(arregloFiltrado[i].horaIni<arregloFiltrado[i].horaFin){
            //console.log('ehh')
            if(horaAct>=arregloFiltrado[i].horaIni&&horaAct<=arregloFiltrado[i].horaFin){
              setColor(arregloFiltrado[i].color)
              setEstadoSitio(arregloFiltrado[i].estado)
              encontrado=true
            }else{
              setColor('#00FF38')
              setEstadoSitio('disponible')
            }
          }
        }
      }else{
        //console.log('#00FF38')
      }/*
      if(filtradoHora.length===0){
        setColor('#00FF38')
        setEstadoSitio('disponible')
      }else{
        setColor(filtradoHora[0].color)
        setEstadoSitio(filtradoHora[0].estado)
      }*/
      if(props.estado==='deshabilitado'){
        setEstadoSitio(props.estado)
        setColor(props.color)
      }
    }, 1000); // Actualizar la hora cada segundo

    return () => {
      clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
    };
  }, [
    horaInicioSiti,
    horaFinSiti,
    fechaIniSiti,
    fechaFinSiti,
    color,
    props.color,
    props.periodo,fechaIniD,reservas,props.estado
  ]);
  return (
    <div>
      <div
        className="sitio"
        onClick={cambiarEstado}
        style={{ backgroundColor: color }}
      >
        <h2>{props.nombre}</h2>
        <p className="texto">
          {//props.estado} {props.periodo
          }
          {estadoSitio}
        </p>
      </div>
      <Modal isOpen={modalEstado} centered={true}>
        <div className="modalHeader">
          <ModalHeader>
            <p className="asig">Asignar sitio</p>
            <p className="asig">{props.nombre}</p>
          </ModalHeader>
        </div>
        <ModalBody>
          <label>Definir tipo de reserva que desea realizar:</label>
          <select onChange={(e) => tipoReserva(e.target.value)}>
            <option value="reservaD">Reserva diaria</option>
            <option value="reservaM">Reserva mensual</option>
          </select>
          <br />
          {mostrarFechaIni && (
            <select onChange={(e) => tarifaReserva(e.target.value)}>
              <option value={400.0}>Mes Día (06:00-22:00) 400 Bs.</option>
              <option value={300.0}>Mes Noche (22:00-06:00) 300 Bs.</option>
              <option value={600.0}>Mes Completo (24:00 horas) 600 Bs.</option>
            </select>
          )}
          <EntradaInput
            titulo="Placa"
            nombre="placa"
            cambio={onChange}
            mostrarMensaje={mostrarMensajePlaca}
            mensaje={mensajePlaca}
          />
          <EntradaInput
            titulo="CI"
            nombre="ci"
            cambio={onChange}
            mostrarMensaje={mostrarMensajeCi}
            mensaje={mensajeCi}
          />
          <EntradaInput
            titulo="Nombres y Apellidos"
            nombre="nombreapellido"
            cambio={onChange}
            mostrarMensaje={mostrarMensajeNombre}
            mensaje={mensajeNombre}
          />
          <EntradaInput
            titulo="Celular"
            nombre="celular"
            cambio={onChange}
            mostrarMensaje={mostrarMensajeCelular}
            mensaje={mensajeCelular}
          />
          {mostrarFechaIniD && <label>Definir fecha de la reserva:</label>}
          {mostrarFechaIniD && (
            <input
              type="date"
              value={fechaIniD}
              onChange={onChangeFechaIniD}
              name="fechaIniD"
            />
          )}
          {mostrarErrorFechaIniD&&<div className="mensajeErrorFormModal">{errorFechaIniD}</div>}
          {mostrarFechaIniD && 
            <select onChange={(e) => tarifaHoraria(e.target.value)}> 
              <option value='3'>0 a 1 hora(3 Bs)</option>
              <option value='6'>1 a 4 horas(6 Bs)</option>
              <option value='10'>4 a 12 horas(10 Bs)</option>
              <option value='15'>12 a 24 horas(15 Bs)</option>
            </select>
          }
          {mostrarFechaIniD && 
            <input type="time" value={horaInicioReserva} onChange={onChangeHoraInicioReserva} name="horaInicioReserva"/>
          }
          {mostrarFechaIni && (
            <label>
              Definir fecha de inicio de la reserva(la fecha de finalización
              será definida automaticamente):
            </label>
          )}
          {mostrarFechaIni && (
            <input
              type="date"
              value={fechaIni}
              onChange={onChangeFechaIni}
              name="fechaIni"
            />
          )}
          {mostrarFechaIni && (
            <input type="date" value={fechaFin} name="fechaFin" disabled />
          )}
          
          {mostrarErrorFechaIni&&<div className="mensajeErrorFormModal">{errorFechaIni}</div>}
          {false && currentTime}
        </ModalBody>
        <div className="modalFooter">
          <ModalFooter>
            <div className="botonesModalSitio">
              <Button
                onClick={cancelarAccion}
                className="botonModal"
                style={{
                  ...StyleSheet.buttonModal,
                  padding: "6px 20px",
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={ejecutarAccion}
                className="botonModal"
                style={{
                  ...StyleSheet.buttonModal,
                  padding: "6px 26px",
                }}
              >
                Aplicar
              </Button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
      <Modal isOpen={modalEstadoOcupado} centered={true}>
        <ModalHeader>
          <h1>Este sitio esta {estadoSitio}</h1>
        </ModalHeader>
        <ModalFooter>
          <button
            onClick={cerrarModalEstadoOcupado}
            className="botonModal"
            style={{
              ...StyleSheet.buttonModal,
              padding: "6px 26px",
              border: "none",
            }}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalQr} centered={true}>
        <div className="modalHeader">
          <ModalHeader>
            <p className="asig">Escanear Código QR</p>
            <p className="asig">{props.nombre}</p>
          </ModalHeader>
        </div>
        <ModalBody>
          <QrCodigo datos={url} />
        </ModalBody>
        <div className="modalFooter">
          <ModalFooter>
            <div className="botonesModalSitio">
              <Button
                onClick={cerrarModalQR}
                className="botonModal"
                style={{
                  ...StyleSheet.buttonModal,
                  padding: "6px 20px",
                }}
              >
                Cerrar
              </Button>
              <Button
                onClick={cerrarModalQR}
                className="botonModal"
                style={{
                  ...StyleSheet.buttonModal,
                  padding: "6px 26px",
                }}
              >
                Guardar
              </Button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default SitioReserva;
