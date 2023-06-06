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
    let estadoSitio2 = props.estado;
    if (estadoSitio2 === "disponible") {
      setModalEstado(true);
      console.log(estadoSitio);
    } else if (estadoSitio2 === "reservado mes") {
      console.log(reservas);
      // setModalEstado(true);
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

  // const  [tipo, setTipo]=useState('')
  const [values, setValues] = useState({
    placa: "",
    ci: "",
    celular: "",
    nombreapellido: "",
  });
  const [tipo, setTipo] = useState("reservaD");
  const [tarRes, setTarRes] = useState(400.0);
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
    setMostrarMensajeCelular(false);
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
        if (
          fechaIni >= reservas[i].fechaIni &&
          fechaIni <= reservas[i].fechaFin
        ) {
          if (horaInicio === reservas[i].horaIni) {
            let men = "Ya existe una reserva en esta fecha";
            console.log(men);
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
            console.log(men);
            esInvalido = true;
          } else {
            console.log("Reserva  correcta");
          }
        } else {
          console.log("Reserva  correcta");
        }
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
    let horas = dateNow.getHours()+23;
    let minutos = dateNow.getMinutes();
    let segundos = dateNow.getSeconds();
    let horaFin = calcularHoraFin(horas, minutos, segundos);
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
          //if (reservas[i].periodo === "noche") {
            if ((horaCompleta >= reservas[i].horaIni || horaCompleta<reservas[i].horaFin) || horaFin>reservas[i].horaIni) {
              let men = "Ya existe una reserva en esta fecha y hora";
              console.log(men);
              esInvalido = true;
            } else {
              console.log("Reserva  correcta");
            }
          //}
        } else if (
          fechaFin >= reservas[i].fechaIni &&
          fechaFin <= reservas[i].fechaFin
        ) {
          if (horaFin > reservas[i].horaIni) {
            let men = "Ya existe una reserva en esta fecha";
            console.log(men);
            esInvalido = true;
          } else {
            console.log("Reserva  correcta");
          }
        } else {
          console.log("Reserva  correcta");
        }
      }
    }
    let arregloFiltrado=reservas.filter((reser)=>(fechaIniD >= reser.fechaIni &&
      fechaIniD <= reser.fechaFin))
    console.log(arregloFiltrado)
    let filtradoHora=arregloFiltrado.filter((reser)=>((horaCompleta <= reser.horaIni && horaCompleta>reser.horaFin) || horaFin<reser.horaIni))
    console.log(filtradoHora)
    return esInvalido;
  };
  const calcularHoraFin = (horas, minutos, segundos) => {
    if (horas === 22) {
      horas = 0;
    } else if (horas === 23) {
      horas = 1;
    } else {
      horas = horas + 2;
    }
    if (horas < 10) {
      horas = "0" + horas;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    if (segundos < 10) {
      segundos = "0" + segundos;
    }
    return horas + ":" + segundos + ":" + segundos;
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
      
      if (validar === true) {
        setModalEstado(false);
        setEstadoSitio("reservado");
        //setCardColor(cardColors.reservado)
        let fecha = new Date();
        let hora = fecha.getTime();
        const comprobanteData = {
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
          monto: 3.0,
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
        setUrl(url + idUnico);
        setModalQr(true);
        /*clearInterval(intert);
            updatedS=10;updatedTM=0;
            setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
            startTemp()*/
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
          horaInicio: horaInicio,
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
        setUrl(url + idUnico);
        setModalQr(true);
      }
    }
  };
  //QR
  const [modalQr, setModalQr] = useState(false);
  const cerrarModalQR = () => {
    setModalQr(false);
  };
  const [url, setUrl] = useState(
    "https://creative-sable-0d4ce3.netlify.app/comprobante/"
  );
  const cerrarModalEstadoOcupado = () => {
    setModalEstadoOcupado(false);
  };
  //tipo reserva
  const [fechaIni, setFechaIni] = useState("");
  const [mostrarFechaIni, setMostrarFechaIni] = useState(false);
  const [fechaIniD, setFechaIniD] = useState("");
  const [mostrarFechaIniD, setMostrarFechaIniD] = useState(true);
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
  const [fechaFin, setFechaFin] = useState("");
  const onChangeFechaIni = (e) => {
    setFechaIni(e.target.value);
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
      if (
        horaInicioSiti !== undefined &&
        horaFinSiti !== undefined &&
        fechaIniSiti !== undefined &&
        fechaFinSiti !== undefined &&
        props.periodo !== undefined
      ) {
        //  console.log(fechaAct+'\n'+horaAct)
        // console.log(fechaIniSiti+'\n'+fechaFinSiti+'\n'+horaInicioSiti+'\n'+horaFinSiti)
        //console.log(horaAct+'\n'+horaFinSiti)

        if (fechaAct >= fechaIniSiti && fechaAct <= fechaFinSiti) {
          if (props.periodo === "noche") {
            if (horaAct >= horaInicioSiti) {
              setColor(props.color);
            } else if (horaAct < horaFinSiti) {
              //console.log("aquitoy");
              setColor(props.color);
            } else {
              setColor("#00FF38");
            }
          } else if (props.periodo === "dia") {
            if (horaAct >= horaInicioSiti && horaAct < horaFinSiti) {
              setColor(props.color);
            } else {
              setColor("#00FF38");
            }
          }
        }
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
          {props.estado} {props.periodo}
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
          <h1>Este sitio esta {props.estado}</h1>
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
