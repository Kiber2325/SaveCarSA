import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EntradaInput from "../Sitio/EntradasModal/EntradaInput";
import QrCodigo from "../QRCodigo/QrCodigo";
import { getDatabase, push, ref, set, update } from "firebase/database";
import { app, database } from "../../conexion/firebase";
import "./Sitio.css";
const Sitio = (props) => {
  const [estadoSitio, setEstadoSitio] = useState(props.estado);
  const [color, setColor] = useState(props.color);
  const reservas = props.horarioReserva;
  const cambiarEstado = () => {
    let estadoSitio2 = estadoSitio;
    console.log(estadoSitio2);
    if (estadoSitio2 === "disponible") {
      setModalEstado(true);
    } else if (
      estadoSitio2 === "reserva mes completo" ||
      estadoSitio2 === "reservado" ||
      estadoSitio2 === "reserva mes noche" ||
      estadoSitio2 === "reserva mes dia" ||
      estadoSitio2 === "ocupado"
    ) {
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
      console.log(estadoSitio2);
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
  const [errorFechaIni, setErrorFechaIni] = useState("");
  const [mostrarErrorFechaIni, setMostrarErrorFechaIni] = useState(false);
  const [errorFechaIniD, setErrorFechaIniD] = useState("");
  const [mostrarErrorFechaIniD, setMostrarErrorFechaIniD] = useState(false);
  const [errorFechaIniO, setErrorFechaIniO] = useState("");
  const [mostrarErrorFechaIniO, setMostrarErrorFechaIniO] = useState(false);
  // const  [tipo, setTipo]=useState('')
  const [ocuRes, setOcuRes] = useState(true);
  const [tablaReservas,setTablaReservas]=useState(false)
  const [ocuparHorarios, setOcuparHorarios] = useState(true);
  const [motivo, setMotivo] = useState(false);
  const [mensajeMotivo, setMensajeMotivo] = useState("");
  const [mostrarMensajeMotivo, setMostrarMensajeMotivo] = useState(false);
  const [values, setValues] = useState({
    placa: "",
    ci: "",
    celular: "",
    nombreapellido: "",
  });
  const [tipo, setTipo] = useState("ocupar");
  const [tarRes, setTarRes] = useState(400.0);
  const [tarHor, setTarHor] = useState(3);
  const [tarHora, setTarHora] = useState(1);
  const [tarHorO, setTarHorO] = useState(3);
  const [tarHoraO, setTarHoraO] = useState(1);
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
    setMostrarMensajeNombre(false);
    setMostrarMensajeCelular(false);
    setMostrarErrorFechaIni(false);
    setMostrarErrorFechaIniD(false);
    setMensajePlaca("");
    setMensajeCi("");
    setMensajeNombre("");
    setMensajeCelular("");
    setFechaIni("");
    setFechaIniD("");
  };
  const validarInputMotivo = (
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
      setMostrarMensajeMotivo(mostrar);
      setMensajeMotivo("El campo no puede estar vacío");
      esInvalido = true;
    } else if (tam < min || tam > max) {
      setMostrarMensajeMotivo(mostrar);
      setMensajeMotivo(
        "El campo tiene límite mínimo de " +
          min +
          " carácteres y un máximo de " +
          max +
          "carácteres"
      );
      esInvalido = true;
    } else if (!regla.test(contenido)) {
      setMostrarMensajeMotivo(mostrar);
      setMensajeMotivo(mensajeAlerta);
      esInvalido = true;
    } else {
      setMostrarMensajeMotivo(false);
      //setMensajeMotivo(null)
    }
    return esInvalido;
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
        let reservasFechaIniFin = [];
        for (let i = 0; i < reservas.length; i++) {
          if (
            reservas[i].fechaIni >= fechaIni &&
            reservas[i].fechaFin <= fechaFin
          ) {
            reservasFechaIniFin.push(reservas[i]);
          } else if (
            reservas[i].fechaFin > fechaFin &&
            reservas[i].fechaIni <= fechaFin
          ) {
            reservasFechaIniFin.push(reservas[i]);
          } else if (
            reservas[i].fechaFin >= fechaIni &&
            reservas[i].fechaIni < fechaIni
          ) {
            reservasFechaIniFin.push(reservas[i]);
          }
        }
        console.log(reservasFechaIniFin);
        if (periodo === "dia") {
          let encontrado = false;
          let horaIniMesDia = "06:00:00";
          let horaFinMesDia = "22:00:00";
          for (
            let i = 0;
            i < reservasFechaIniFin.length && encontrado === false;
            i++
          ) {
            if (
              reservasFechaIniFin[i].fechaIni ===
              reservasFechaIniFin[i].fechaFin
            ) {
              console.log(reservasFechaIniFin[i].horaIni >= horaIniMesDia);
              if (
                reservasFechaIniFin[i].horaIni >= horaIniMesDia &&
                reservasFechaIniFin[i].horaFin <= horaFinMesDia
              ) {
                encontrado = true;
              } else if (
                reservasFechaIniFin[i].horaIni >= horaIniMesDia &&
                reservasFechaIniFin[i].horaIni <= horaFinMesDia
              ) {
                encontrado = true;
              } else if (
                reservasFechaIniFin[i].horaFin <= horaFinMesDia &&
                reservasFechaIniFin[i].horaFin >= horaIniMesDia
              ) {
                encontrado = true;
              }
            } else if (
              reservasFechaIniFin[i].fechaIni < reservasFechaIniFin[i].fechaFin
            ) {
              if (
                reservasFechaIniFin[i].fechaFin >= fechaIni &&
                reservasFechaIniFin[i].horaFin > horaIniMesDia
              ) {
                //console.log('toy')
                encontrado = true;
              } else if (
                reservasFechaIniFin[i].fechaIni <= fechaFin &&
                reservasFechaIniFin[i].horaIni < horaFinMesDia
              ) {
                encontrado = true;
                //console.log('toy')
              }
            }
          }
          if (encontrado === false) {
            console.log("Reserva mes dia correcta");
            esInvalido = encontrado;
          } else {
            let men = "Ya existe una reserva en este periodo";
            console.log(men);
            setMostrarErrorFechaIni(true);
            setErrorFechaIni(men);
            esInvalido = encontrado;
          }
        } else if (periodo === "noche") {
          let encontrado = false;
          let horaIniMesNoche = "22:00:00";
          let horaFinMesNoche = "06:00:00";
          for (
            let i = 0;
            i < reservasFechaIniFin.length && encontrado === false;
            i++
          ) {
            if (
              reservasFechaIniFin[i].fechaIni < reservasFechaIniFin[i].fechaFin
            ) {
              if (
                reservasFechaIniFin[i].horaIni ===
                reservasFechaIniFin[i].horaFin
              ) {
                if (
                  reservasFechaIniFin[i].horaIni >= horaIniMesNoche &&
                  reservasFechaIniFin[i].horaFin <= "23:59:59"
                ) {
                  encontrado = true;
                } else if (
                  reservasFechaIniFin[i].horaIni >= "00:00:00" &&
                  reservasFechaIniFin[i].horaFin <= horaFinMesNoche
                ) {
                  encontrado = true;
                }
              } else if (
                reservasFechaIniFin[i].horaIni > reservasFechaIniFin[i].horaFin
              ) {
                if (
                  reservasFechaIniFin[i].horaIni >= horaIniMesNoche &&
                  reservasFechaIniFin[i].horaFin <= horaFinMesNoche
                ) {
                  encontrado = true;
                }
              }
            } else if (
              reservasFechaIniFin[i].fechaIni ===
              reservasFechaIniFin[i].fechaFin
            ) {
              if (
                reservasFechaIniFin[i].horaIni >= horaIniMesNoche &&
                reservasFechaIniFin[i].horaFin <= "23:59:59"
              ) {
                encontrado = true;
              } else if (
                reservasFechaIniFin[i].horaIni >= "00:00:00" &&
                reservasFechaIniFin[i].horaFin <= horaFinMesNoche
              ) {
                encontrado = true;
              }
            }
          }
          if (encontrado === false) {
            console.log("Reserva mes dia correcta");
            esInvalido = encontrado;
          } else {
            let men = "Ya existe una reserva en este periodo";
            console.log(men);
            setMostrarErrorFechaIni(true);
            setErrorFechaIni(men);
            esInvalido = encontrado;
          }
        } else if (periodo === "completo") {
          if (reservasFechaIniFin.length === 0) {
            console.log("reserva mensual completa correcta");
            esInvalido = false;
          } else {
            let men = "Ya existe una reserva en este periodo de mes completo";
            console.log(men);
            setMostrarErrorFechaIni(true);
            setErrorFechaIni(men);
            esInvalido = true;
          }
        } /*
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
    let horaFinal = horaInicioReserva.split(":");
    let horaFin = calcularHoraFin(
      parseInt(tarHora),
      parseInt(horaFinal[0]),
      parseInt(horaFinal[1])
    );
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
            if (
              horaInicioReserva >= reservas[i].horaIni ||
              horaFin < reservas[i].horaFin
            ) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true);
              setErrorFechaIniD(men);
              console.log(horaCompleta);
              console.log(horaFin);
              console.log(reservas[i].horaIni);
              console.log(reservas[i].horaFin);
              console.log(men);
              esInvalido = true;
            }else if(horaFin+':00'>reservas[i].horaIni && horaFin+':00'<'23:59:59'){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaFin+':00')
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            }else if(horaInicioReserva+':00'===horaFin+':00'){
              if(horaInicioReserva+':00'<=reservas[i].horaIni&&horaFin+':00'>=reservas[i].horaFin){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaFin+':00')
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;}
            } else {
              console.log("Reserva  correcta");
            }
          } else {
            if (
              horaInicioReserva + ":00" >= reservas[i].horaIni &&
              horaInicioReserva + ":00" <= reservas[i].horaFin
            ) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true);
              setErrorFechaIniD(men);
              console.log(horaInicioReserva);
              console.log(reservas[i].horaIni);
              console.log(reservas[i].horaFin);
              console.log(men);
              esInvalido = true;
            } else if(horaFin+':00'<reservas[i].horaIni && horaFin+':00'<reservas[i].horaFin){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaFin+':00')
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            }else if(horaInicioReserva+':00'<reservas[i].horaIni && horaFin+':00'>reservas[i].horaFin){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(horaFin+':00')
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log(men)
              esInvalido = true;
            } else if(horaFin+':00'>reservas[i].horaIni && horaFin+':00'<=reservas[i].horaFin){
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true)
              setErrorFechaIniD(men)
              console.log(men)
              esInvalido = true;
            }else{
              console.log(horaInicioReserva)
              console.log(horaFin)
              console.log(reservas[i].horaIni)
              console.log(reservas[i].horaFin)
              console.log("Reserva  correcta");
            }
          }
        } /* else if (
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
  const validarFechaIniO = () => {
    let esInvalido = false;
    /*if (fechaIniD.length === 0) {
      esInvalido = true;
    }*/
    let dateNow = new Date();
    let horas = dateNow.getHours();
    let minutos = dateNow.getMinutes();
    let segundos = dateNow.getSeconds();
    console.log(tarHorO);
    let horaFin = calcularHoraFin(parseInt(tarHoraO), horas, minutos);
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
    horaFin = horaFin + ":" + segundos;
    console.log(horaCompleta);
    console.log(horaFin);
    console.log(reservas);
    let anio = dateNow.getFullYear();
    let mes = dateNow.getMonth() + 1;
    let dia = dateNow.getDate();
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (dia < 10) {
      dia = "0" + dia;
    }
    let fechaAhora = anio + "-" + mes + "-" + dia;
    console.log(fechaAhora);
    for (let i = 0; i < reservas.length && esInvalido === false; i++) {
      if (tipo === "ocupar") {
        if (
          fechaAhora >= reservas[i].fechaIni &&
          fechaAhora <= reservas[i].fechaFin
        ) {
          console.log("ocupar");
          if (reservas[i].horaIni > reservas[i].horaFin) {
            if (
              horaCompleta >= reservas[i].horaIni ||
              horaFin < reservas[i].horaFin
            ) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniO(true);
              setErrorFechaIniO(men);
              console.log(horaCompleta);
              console.log(horaFin);
              console.log(reservas[i].horaIni);
              console.log(reservas[i].horaFin);
              console.log(men);
              esInvalido = true;
            } else {
              console.log("Reserva  correcta");
            }
          } else {
            if (
              horaCompleta >= reservas[i].horaIni &&
              horaCompleta <= reservas[i].horaFin
            ) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true);
              setErrorFechaIniD(men);
              console.log(horaInicioReserva);
              console.log(reservas[i].horaIni);
              console.log(reservas[i].horaFin);
              console.log(men);
              esInvalido = true;
            } else if (
              horaFin >= reservas[i].horaIni &&
              horaFin <= reservas[i].horaFin
            ) {
              let men = "Ya existe una reserva en esta fecha y hora";
              setMostrarErrorFechaIniD(true);
              setErrorFechaIniD(men);
              console.log(horaFin + ":00");
              console.log(reservas[i].horaIni);
              console.log(reservas[i].horaFin);
              console.log(men);
              esInvalido = true;
            } else {
              console.log("Reserva  correcta");
            }
          }
        }
      }
    }
    console.log(esInvalido);
    return esInvalido;
  };
  const calcularHoraFin = (aumento, horas, minutos) => {
    horas = horas + aumento;
    if (horas > 23) {
      horas = horas % 24;
    }
    if (horas < 10) {
      horas = "0" + horas;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    return horas + ":" + minutos;
  };
  const meses=[31,28,31,30,31,30,31,31,30,31,30,31]
  const confirmarReservaMensual=(nuevoColor,
    estadoReserva,
    tipoReserva)=>{
        let periodo='completo'
        if(fechaFin==='06:00:00'){
          periodo='noche'
        }else if(fechaFin==='22:00:00'){
          periodo='dia'
        }
        const nuevaReserva = {
            nombreSitio: props.nombre,
            estado: estadoReserva+periodo,
            color: nuevoColor,
            ciCliente: values.ci,
            nombreApellido: values.nombreapellido,
            celularCliente: values.celular,
            placaDelAuto: values.placa,
            periodo: periodo,
            fechaIni: fechaIni,
            fechaFin: fechaFin,
            horaIni: horaInicio,
            horaFin: horaFin,
          };
          let nuevosTiempos = [];
          let fechaIniPartida=fechaIni.split('-')
          let fechaFinPartida=fechaFin.split('-')
          let horaFinPartida=horaFin.split(':')
          let horaIniPartida=horaInicio.split(':')
          if (horaInicio< horaFin) {
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
                sitioUsado: props.nombre,
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
                  sitioUsado: props.nombre,
                };
                nuevosTiempos.push(nuevoTiempo);
              }
            }
            let fecha=new Date()
            let fechaDividida=fechaIni.split('-')
          const nuevoIngreso = {
            anio: parseInt(fechaDividida[0]),
            mes: parseInt(fechaDividida[1]),
            fecha: parseInt(fechaDividida[2]),
            dia: parseInt(fechaDividida[2]),
            monto: tarHor,
            fechaActual: fecha.toDateString(),
            ciCliente: values.ci,
            nombreApellido: values.nombreapellido,
            celularCliente: values.celular,
            placaDelAuto: values.placa,
            lugarUsado: props.nombre,
            tipo: tipoReserva,
          };
          console.log(nuevaReserva)
          console.log(nuevosTiempos)
          console.log(nuevoIngreso)
          const db = getDatabase(app);
      const collectionRef = ref(db, "ingresos");
      const newId = push(collectionRef).key;
      set(ref(database, "reservas/" + newId), nuevaReserva);
      for (let i = 0; i < nuevosTiempos.length; i++) {
        console.log(nuevosTiempos[i]);
        set(ref(database, "tiempoUso/" + newId), nuevosTiempos[i]);
      }
      set(ref(database, "ingresos/" + newId), nuevoIngreso);
  }
  const confirmarReserva=(estadoSitio,
    nuevoColor,
    periodo,
    estadoReserva,
    tipoReserva)=>{
        let fecha = new Date();
          //let hora = fecha.getTime();
          let anio = fecha.getFullYear();
          let mes = fecha.getMonth() + 1;
          let dia = fecha.getDay();
          if (mes < 10) {
            mes = "0" + mes;
          }
          if (dia < 10) {
            dia = "0" + dia;
          }
          let horaActual = horaInicioReserva.split(":");
          let hour = parseInt(horaActual[0]);
          let fechaFinal = fechaIniD;
          if (hour + parseInt(tarHora) > 23) {
            let sepFechaFinal = fechaFinal.split("-");
            let diaFinal = parseInt(sepFechaFinal[2]);
            let dayActualizado = diaFinal + 1;
            if (dayActualizado < 10) {
              dayActualizado = "0" + dayActualizado;
            }
            fechaFinal = anio + "-" + mes + "-" + dayActualizado;
          }
        const nuevaReserva = {
            nombreSitio: props.nombre,
            estado: estadoReserva,
            color: nuevoColor,
            ciCliente: values.ci,
            nombreApellido: values.nombreapellido,
            celularCliente: values.celular,
            placaDelAuto: values.placa,
            periodo: periodo,
            fechaIni: fechaIniD,
            fechaFin: fechaFinal,
            horaIni: horaInicioReserva + ":00",
            horaFin: calcularHoraFin(
                parseInt(tarHora),
                hour,
                parseInt(horaActual[1])
              ) + ":00",
          };
          let nuevosTiempos = [];
    if (fechaIniD === fechaFinal) {
      const nuevoTiempo = {
        fecha: fechaIniD,
        horasUsadas: parseInt(tarHora),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      nuevosTiempos.push(nuevoTiempo);
    } else {
      const nuevoTiempo1 = {
        fecha: fechaIniD,
        horasUsadas: 24 - parseInt(horaActual[0]),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      const nuevoTiempo2 = {
        fecha: fechaFinal,
        horasUsadas: parseInt(hour),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      nuevosTiempos.push(nuevoTiempo1);
      nuevosTiempos.push(nuevoTiempo2);
    }
          let fechaDividida=fechaIniD.split('-')
          const nuevoIngreso = {
            anio: parseInt(fechaDividida[0]),
            mes: parseInt(fechaDividida[1]),
            fecha: parseInt(fechaDividida[2]),
            dia: parseInt(fechaDividida[2]),
            monto: tarHor,
            fechaActual: fecha.toDateString(),
            ciCliente: values.ci,
            nombreApellido: values.nombreapellido,
            celularCliente: values.celular,
            placaDelAuto: values.placa,
            lugarUsado: props.nombre,
            tipo: tipoReserva,
          };
          console.log(nuevoIngreso)
          console.log(nuevaReserva)
          console.log(nuevosTiempos)
          const db = getDatabase(app);
      const collectionRef = ref(db, "ingresos");
      const newId = push(collectionRef).key;
      set(ref(database, "reservas/" + newId), nuevaReserva);
      for (let i = 0; i < nuevosTiempos.length; i++) {
        console.log(nuevosTiempos[i]);
        set(ref(database, "tiempoUso/" + newId), nuevosTiempos[i]);
      }
      set(ref(database, "ingresos/" + newId), nuevoIngreso);
  }
  const confirmarOcupacion = (
    estadoSitio,
    nuevoColor,
    periodo,
    estadoReserva,
    tipoReserva
  ) => {
    let cad = props.nombre;/*
    let cadRecortada = cad.slice(1);
    const nuevaData = {
      nombre: props.nombre,
      estado: estadoSitio,
      color: nuevoColor,
    };*/
    let fechaAhora = new Date();
    let hora = fechaAhora.getHours();
    let minutos = fechaAhora.getMinutes();
    let horaFin = hora + tarHora;
    if (hora < 10) {
      hora = "0" + hora;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    let anio = fechaAhora.getFullYear();
    let mes = fechaAhora.getMonth() + 1;
    let dia = fechaAhora.getDate();
    let diaFin = fechaAhora.getDate();
    if (horaFin > 23) {
      horaFin = horaFin % 24;
      diaFin = diaFin + 1;
    }
    if (horaFin < 10) {
      horaFin = "0" + horaFin;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (dia < 10) {
      dia = "0" + dia;
    }
    let horaExacta = hora + ":" + minutos + ":00";
    let fechaExacta = anio + "-" + mes + "-" + dia;
    let horaExactaFin = horaFin + ":" + minutos + ":00";
    let fechaExactaFin = anio + "-" + mes + "-" + diaFin;
    const nuevaReserva = {
      nombreSitio: props.nombre,
      estado: estadoReserva,
      color: nuevoColor,
      ciCliente: values.ci,
      nombreApellido: values.nombreapellido,
      celularCliente: values.celular,
      placaDelAuto: values.placa,
      periodo: periodo,
      fechaIni: fechaExacta,
      fechaFin: fechaExactaFin,
      horaIni: horaExacta,
      horaFin: horaExactaFin,
    };
    console.log(nuevaReserva);
    let nuevosTiempos = [];
    if (fechaExacta === fechaExactaFin) {
      const nuevoTiempo = {
        fecha: fechaExacta,
        horasUsadas: parseInt(tarHora),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      nuevosTiempos.push(nuevoTiempo);
    } else {
      const nuevoTiempo1 = {
        fecha: fechaExacta,
        horasUsadas: 24 - parseInt(hora),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      const nuevoTiempo2 = {
        fecha: fechaExactaFin,
        horasUsadas: parseInt(horaFin),
        minutosUsados: 0,
        segundosUsados: 0,
        sitioUsado: props.nombre,
      };
      nuevosTiempos.push(nuevoTiempo1);
      nuevosTiempos.push(nuevoTiempo2);
    }

    let fechaDividida = fechaExacta.split("-");
    const nuevoIngreso = {
      anio: parseInt(fechaDividida[0]),
      mes: parseInt(fechaDividida[1]),
      fecha: parseInt(fechaDividida[2]),
      dia: parseInt(fechaDividida[2]),
      monto: tarHor,
      fechaActual: fechaAhora.toDateString(),
      ciCliente: values.ci,
      nombreApellido: values.nombreapellido,
      celularCliente: values.celular,
      placaDelAuto: values.placa,
      lugarUsado: props.nombre,
      tipo: tipoReserva,
    };
    console.log(nuevoIngreso);
    if (cad.includes("A")) {
      
      const db = getDatabase(app);
      const collectionRef = ref(db, "ingresos");
      const newId = push(collectionRef).key;
      set(ref(database, "reservas/" + newId), nuevaReserva);
      for (let i = 0; i < nuevosTiempos.length; i++) {
        console.log(nuevosTiempos[i]);
        set(ref(database, "tiempoUso/" + newId), nuevosTiempos[i]);
      }
      set(ref(database, "ingresos/" + newId), nuevoIngreso);
    } else if (cad.includes("M")) {
      
    }
  };
  const ejecutarAccion = (tiempoReal) => {
    //formato
    const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexCar = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexNumber = /^[0-9]+$/;
    const regexPlaca = /^[0-9A-ZÑÁÉÍÓÚÜ\s]+$/;
    //mensajes alertas
    let alertaPlaca = "Solo se permiten carácteres alfanuméricos y mayúsculas";
    let alertaCi = "Solo se permiten carácteres numéricos";
    let alertaNombre = "Solo se permiten carácteres alfabéticos";
    let alertaCelular = "Solo se permiten carácteres numéricos";
    let alertaMotivo = "Solo se permiten carácteres alfanuméricos";
    if (tipo === "ocupar") {
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
      let validarFechaIniDiO = !validarFechaIniO();
      let validar =
        validarPlaca &&
        validarCi &&
        validarNombre &&
        validarCelular &&
        validarFechaIniDiO;
      console.log(validar);
      console.log(tarHora);
      if (validar === true) {
        if (tiempoReal === "qr") {
          setModalEstado(false);
          let dateNow = new Date();
          let horas = dateNow.getHours();
          let minutos = dateNow.getMinutes();
          let segundos = dateNow.getSeconds();
          console.log(tarHorO);
          let horaFin = calcularHoraFin(parseInt(tarHoraO), horas, minutos);
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
          horaFin = horaFin + ":" + segundos;
          let anio = dateNow.getFullYear();
          let mes = dateNow.getMonth() + 1;
          let dia = dateNow.getDate();
          let diaFinal = dateNow.getDate();
          if (horaCompleta > horaFin) {
            diaFinal = diaFinal + 1;
          }
          if (mes < 10) {
            mes = "0" + mes;
          }
          if (dia < 10) {
            dia = "0" + dia;
          }
          if (diaFinal < 10) {
            diaFinal = "0" + diaFinal;
          }
          let fechaAhora = anio + "-" + mes + "-" + dia;
          let fechaFin = anio + "-" + mes + "-" + diaFinal;
          const comprobanteData = {
            sitio: props.nombre,
            placa: values.placa,
            ciCliente: values.ci,
            nombreapellido: values.nombreapellido,
            celular: values.celular,
            fechaIni: fechaAhora,
            fechaFin: fechaFin,
            horaIni: horaCompleta,
            horaFin: horaFin,
            monto: tarHor,
            tipoVehiculo: "Auto",
            tipo:'ocupacion'
          };
          let idUnico =
            values.placa +
            values.ci +
            horas +
            dateNow.getHours() +
            "-" +
            dateNow.getMinutes() +
            "-" +
            dateNow.getSeconds();
          console.log(idUnico);
          console.log(comprobanteData);
          set(ref(database, "comprobantes/" + idUnico), comprobanteData);
          setUrl(urlDef + idUnico);
          setModalQr(true);
        } else if (tiempoReal === "momento") {
          setModalEstado(false);
          confirmarOcupacion(
            "ocupado",
            "#0050C8",
            "corto",
            "ocupado",
            "Ocupación"
          );
        }
      }
    } else if (tipo === "reservaD") {
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
      console.log(tarHor);
      console.log(tarHora);
      console.log(
        (parseInt(horaInicioReserva.split(":")[0]) + parseInt(tarHora)) % 24
      );
      console.log(fechaIniD);
      if (validar === true) {
        if (tiempoReal === "qr") {
          setModalEstado(false);
          let fecha = new Date();
          let hora = fecha.getTime();
          let anio = fecha.getFullYear();
          let mes = fecha.getMonth() + 1;
          let dia = fecha.getDay();
          if (mes < 10) {
            mes = "0" + mes;
          }
          if (dia < 10) {
            dia = "0" + dia;
          }
          let horaActual = horaInicioReserva.split(":");
          let hour = parseInt(horaActual[0]);
          let fechaFinal = fechaIniD;
          if (hour + parseInt(tarHora) > 23) {
            let sepFechaFinal = fechaFinal.split("-");
            let diaFinal = parseInt(sepFechaFinal[2]);
            let dayActualizado = diaFinal + 1;
            if (dayActualizado < 10) {
              dayActualizado = "0" + dayActualizado;
            }
            fechaFinal = anio + "-" + mes + "-" + dayActualizado;
          }
          const comprobanteData = {
            sitio: props.nombre,
            placa: values.placa,
            ciCliente: values.ci,
            nombreapellido: values.nombreapellido,
            celular: values.celular,
            fechaIni: fechaIniD,
            fechaFin: fechaFinal,
            horaIni: horaInicioReserva + ":00",
            horaFin:
              calcularHoraFin(
                parseInt(tarHora),
                hour,
                parseInt(horaActual[1])
              ) + ":00",
            monto: tarHor,
            tipoVehiculo: "Moto",
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
          quitarMensajesError();
        } else if (tiempoReal === "momento") {
          setModalEstado(false);
          confirmarReserva(
            "reservado",
            "#FC6901",
            "corto",
            "reservado",
            "Reservado"
          );
        }
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
        if (tiempoReal === "qr") {
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
            tipoVehiculo: "Moto",
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
          quitarMensajesError();
        } else if (tiempoReal === "momento") {
            setModalEstado(false)
            confirmarReservaMensual('#808080','reserva mes ','Reserva Mensual')
        }
      }
    } else if (tipo === "deshabilitar") {
      if (
        !validarInputMotivo(values.motivo, true, alertaMotivo, regexAll, 3, 50)
      ) {
        setModalEstado(false)
        //setEstado('deshabilitado')
        let cad = props.nombre;
        let cadRecortada = cad.slice(1);
        console.log(cadRecortada);
        update(ref(database, "sitiosAutos/" + cadRecortada), {
          color: "#BC0000",
          estado: "deshabilitado",
        });
        //setCardColor(cardColors.inactive)
      }
    }
  };
  //QR
  const [modalQr, setModalQr] = useState(false);
  const cerrarModalQR = () => {
    setModalQr(false);
  };
  const urlDef = "https://creative-sable-0d4ce3.netlify.app/comprobante/";
  const [url, setUrl] = useState("");
  const cerrarModalEstadoOcupado = () => {
    setModalEstadoOcupado(false);
  };
  //tipo reserva
  const [fechaIni, setFechaIni] = useState("");
  const [mostrarFechaIni, setMostrarFechaIni] = useState(false);
  const [fechaIniD, setFechaIniD] = useState("");
  const [mostrarFechaIniD, setMostrarFechaIniD] = useState(false);
  const [horaInicioReserva, setHoraInicioReserva] = useState("");
  const tipoReserva = (opcion) => {
    setTipo(opcion);
    //setValues(values.tipo)
    if (opcion === "ocupar") {
      setOcuparHorarios(true);
      setOcuRes(true);
      setMostrarFechaIni(false);
      setMostrarFechaIniD(false);
      setMotivo(false);
      setTablaReservas(false)
    } else if (opcion === "reservaM") {
      setOcuRes(true);
      setOcuparHorarios(false);
      console.log(values.fechaIni);
      setMostrarFechaIni(true);
      setMostrarFechaIniD(false);
      setMotivo(false);
      setTablaReservas(false)
    } else if (opcion === "reservaD") {
      setOcuRes(true);
      setOcuparHorarios(false);
      console.log(opcion);
      setMostrarFechaIni(false);
      setMostrarFechaIniD(true);
      setMotivo(false);
      setTablaReservas(false)
    } else if (opcion === "deshabilitar") {
      console.log(opcion);
      setOcuparHorarios(false);
      setOcuRes(false);
      setMostrarFechaIni(false);
      setMostrarFechaIniD(false);
      setMotivo(true);
      setTablaReservas(false)
    } else if(opcion==='reservas'){
      setOcuparHorarios(false);
      setOcuRes(false)
      setMostrarFechaIni(false);
      setMostrarFechaIniD(false);
      setMotivo(false);
      setTablaReservas(true)
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
  const tarifaHoraria = (newTarifaHoraria) => {
    let horaElegida = parseInt(newTarifaHoraria);
    setTarHor(horaElegida);
    if (horaElegida === 3) {
      setTarHora(1);
    } else if (horaElegida === 6) {
      setTarHora(4);
    } else if (horaElegida === 10) {
      setTarHora(12);
    } else if (horaElegida === 15) {
      setTarHora(24);
    }
  };
  const tarifaHorariaO = (newTarifaHoraria) => {
    let horaElegida = parseInt(newTarifaHoraria);
    setTarHorO(horaElegida);
    if (horaElegida === 3) {
      setTarHoraO(1);
    } else if (horaElegida === 6) {
      setTarHoraO(4);
    } else if (horaElegida === 10) {
      setTarHoraO(12);
    } else if (horaElegida === 15) {
      setTarHoraO(24);
    }
  };
  const [fechaFin, setFechaFin] = useState("");
  const onChangeFechaIni = (e) => {
    setFechaIni(e.target.value);
    setMostrarErrorFechaIni(false);
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
    setMostrarErrorFechaIniD(false);
  };
  const onChangeHoraInicioReserva = (e) => {
    setHoraInicioReserva(e.target.value);
  };
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
      let arregloFiltrado = reservas.filter(
        (reser) => fechaAct >= reser.fechaIni && fechaAct <= reser.fechaFin
      );
      //console.log(arregloFiltrado)
      //let filtradoHora=arregloFiltrado.filter((reser)=>((horaAct<reser.horaFin)))
      //console.log(filtradoHora)
      //console.log(reservas)
      if (arregloFiltrado.length !== 0) {
        let encontrado = false;
        for (
          let i = 0;
          i < arregloFiltrado.length && encontrado === false;
          i++
        ) {
          //console.log(arregloFiltrado[i].horaIni)
          if (arregloFiltrado[i].horaIni > arregloFiltrado[i].horaFin) {
            //console.log('ehh')
            if (
              horaAct >= arregloFiltrado[i].horaIni ||
              horaAct <= arregloFiltrado[i].horaFin
            ) {
              setColor(arregloFiltrado[i].color);
              setEstadoSitio(arregloFiltrado[i].estado);
              encontrado = true;
            } else {
              setColor("#00FF38");
              setEstadoSitio("disponible");
            }
          } else if (arregloFiltrado[i].horaIni < arregloFiltrado[i].horaFin) {
            //console.log('ehh')
            if (
              horaAct >= arregloFiltrado[i].horaIni &&
              horaAct <= arregloFiltrado[i].horaFin
            ) {
              setColor(arregloFiltrado[i].color);
              setEstadoSitio(arregloFiltrado[i].estado);
              encontrado = true;
            } else {
              setColor("#00FF38");
              setEstadoSitio("disponible");
            }
          }
        }
      } else {
        //console.log('#00FF38')
      } /*
      if(filtradoHora.length===0){
        setColor('#00FF38')
        setEstadoSitio('disponible')
      }else{
        setColor(filtradoHora[0].color)
        setEstadoSitio(filtradoHora[0].estado)
      }*/
      if (props.estado === "deshabilitado") {
        setEstadoSitio(props.estado);
        setColor(props.color);
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
    props.periodo,
    fechaIniD,
    reservas,
    props.estado,
  ]);
  const habilitarSitio=()=>{
    let cad = props.nombre;
        let cadRecortada = cad.slice(1);
        console.log(cadRecortada);
        update(ref(database, "sitiosAutos/" + cadRecortada), {
          color: "#00FF38",
          estado: "disponible",
        });
        setModalEstadoOcupado(false);
  }
  return (
    <div>
      <div
        className={
          props.nombre.includes("A")
            ? "sitio"
            : props.nombre.includes("M")
            ? "sitioM"
            : "sitio"
        }
        onClick={cambiarEstado}
        style={{ backgroundColor: color }}
      >
        <h2>{props.nombre}</h2>
        <p className="texto">
          {
            //props.estado} {props.periodo
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
          <label>Seleccione la acción que desea realizar:</label>
          <select onChange={(e) => tipoReserva(e.target.value)}>
            <option value="ocupar" selected>
              Ocupar
            </option>
            <option value="reservaD">Reserva diaria</option>
            <option value="reservaM">Reserva mensual</option>
            <option value="deshabilitar">Deshabilitar</option>
            <option value="reservas">Reservas realizadas</option>
          </select>
          <br />
          {mostrarFechaIni && (
            <select onChange={(e) => tarifaReserva(e.target.value)}>
              <option value={400.0}>Mes Día (06:00-22:00) 400 Bs.</option>
              <option value={300.0}>Mes Noche (22:00-06:00) 300 Bs.</option>
              <option value={600.0}>Mes Completo (24:00 horas) 600 Bs.</option>
            </select>
          )}
          {ocuRes && (
            <EntradaInput
              titulo="Placa"
              nombre="placa"
              cambio={onChange}
              mostrarMensaje={mostrarMensajePlaca}
              mensaje={mensajePlaca}
            />
          )}
          {ocuRes && (
            <EntradaInput
              titulo="CI"
              nombre="ci"
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCi}
              mensaje={mensajeCi}
            />
          )}
          {ocuRes && (
            <EntradaInput
              titulo="Nombres y Apellidos"
              nombre="nombreapellido"
              cambio={onChange}
              mostrarMensaje={mostrarMensajeNombre}
              mensaje={mensajeNombre}
            />
          )}
          {ocuRes && (
            <EntradaInput
              titulo="Celular"
              nombre="celular"
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCelular}
              mensaje={mensajeCelular}
            />
          )}
          {motivo && (
            <EntradaInput
              titulo="Motivo"
              nombre="motivo"
              cambio={onChange}
              mostrarMensaje={mostrarMensajeMotivo}
              mensaje={mensajeMotivo}
            />
          )}
          {ocuparHorarios && (
            <select onChange={(e) => tarifaHorariaO(e.target.value)}>
              <option value="3">0 a 1 hora(3 Bs)</option>
              <option value="6">1 a 4 horas(6 Bs)</option>
              <option value="10">4 a 12 horas(10 Bs)</option>
              <option value="15">12 a 24 horas(15 Bs)</option>
            </select>
          )}
          {mostrarErrorFechaIniO && (
            <div className="mensajeErrorFormModal">{errorFechaIniO}</div>
          )}
          {mostrarFechaIniD && <label>Definir fecha de la reserva:</label>}
          {mostrarFechaIniD && (
            <input
              type="date"
              value={fechaIniD}
              onChange={onChangeFechaIniD}
              name="fechaIniD"
            />
          )}
          {mostrarErrorFechaIniD && (
            <div className="mensajeErrorFormModal">{errorFechaIniD}</div>
          )}
          {mostrarFechaIniD && (
            <select onChange={(e) => tarifaHoraria(e.target.value)}>
              <option value="3">0 a 1 hora(3 Bs)</option>
              <option value="6">1 a 4 horas(6 Bs)</option>
              <option value="10">4 a 12 horas(10 Bs)</option>
              <option value="15">12 a 24 horas(15 Bs)</option>
            </select>
          )}
          {mostrarFechaIniD && (
            <input
              type="time"
              value={horaInicioReserva}
              onChange={onChangeHoraInicioReserva}
              name="horaInicioReserva"
            />
          )}
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

          {mostrarErrorFechaIni && (
            <div className="mensajeErrorFormModal">{errorFechaIni}</div>
          )}
          {tablaReservas&&<label>Reservas realizadas en este sitio</label>}
          {tablaReservas&&<table class="table table-bordered">
              <thead >
                <tr className="cabeceraClientes">
                  <th className="cabeceraTablaClientes" scope="col">Fecha Inicio</th>
                  <th className="cabeceraTablaClientes" scope="col">Fecha Fin</th>
                  <th className="cabeceraTablaClientes" scope="col">Hora Inicio</th>
                  <th className="cabeceraTablaClientes" scope="col">Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva)=>(
                  <tr>
                    <th className="datoIngreso">{reserva.fechaIni}</th>
                    <th className="datoIngreso">{reserva.fechaFin}</th>
                    <th className="datoIngreso">{reserva.horaIni}</th>
                    <th className="datoIngreso">{reserva.horaFin}</th>
                  </tr>
                ))}
              </tbody>
            </table>}
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
                onClick={() => ejecutarAccion("qr")}
                className="botonModal"
                style={{
                  ...StyleSheet.buttonModal,
                  padding: "6px 26px",
                }}
              >
                Generar QR
              </Button>
              <Button
                onClick={() => ejecutarAccion("momento")}
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
          <button
            onClick={habilitarSitio}
            className="botonModal"
            style={{
              ...StyleSheet.buttonModal,
              padding: "6px 26px",
              border: "none",
            }}
          >
            Habilitar
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

export default Sitio;
