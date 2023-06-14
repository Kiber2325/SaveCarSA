import React, { useEffect, useState } from 'react'
import './Sitio.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EntradaInput from './EntradasModal/EntradaInput';
import DisplayComponent from './DisplayComponent';
import { getDatabase, push, ref, set } from "firebase/database";
import { database, app } from '../../conexion/firebase';
//import BtnComponent from './BtnComponent';
const Sitio = (props) => {
  const [estado,setEstado]=useState(props.estado)

  const [modalEstado,setModalEstado]= useState(false);
  const [modalTerminar,setModalTerminar]= useState(false);
  const [modalHabilitar,setModalHabilitar]= useState(false);
  const [modalReserva,setModalReserva]= useState(false);
  //mensajes
  const [mostrarMensajePlaca,setMostrarMensajePlaca]=useState(false);
  const [mostrarMensajeCi,setMostrarMensajeCi]=useState(false);
  const [mostrarMensajeCelular,setMostrarMensajeCelular]=useState(false);
  const [mostrarMensajeMotivo,setMostrarMensajeMotivo]=useState(false);
  const [mensajePlaca,setMensajePlaca]=useState('');
  const [mensajeCi,setMensajeCi]=useState('');
  const [mensajeCelular,setMensajeCelular]=useState('');
  const [mensajeMotivo,setMensajeMotivo]=useState('');
  //mostrar cronometro
  const [mostrarCronometro,setMostrarCronometro]=useState(false)
  //valores de los inputs
  const [values, setValues] = useState({
    placa:'',
    ci:'',
    celular:'',
    motivo:''
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const reservas = props.horarioReserva;
  const [tarHor,setTarHor]=useState(3)
  const [tarHora,setTarHora]=useState(1)
  //const [horaInicioReserva,setHoraInicioReserva]=useState('')
  const onChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  //colores
  /*const cardColors ={
    active: '#00FF38',
    inactive: '#BC0000',
    pending: '#FC6901',
    completed: '#0050C8'
  };*/
  
  /*const escogerColor=()=>{
    let colorElegido=''
    if(estado==='disponible'){
      colorElegido=cardColors.active
    }else if(estado==='ocupado'){
      colorElegido=cardColors.completed
    }else if(estado==='reservado'){
      colorElegido=cardColors.pending
    }
    return colorElegido;
  }*/
  //const [cardColor,setCardColor] = useState(escogerColor());
  const [color, setColor] = useState('#00FF38');
  //mostrarInputs
  const [placa,setPlaca]=useState(true)
  const [ci,setCi]=useState(true)
  const [celular,setCelular]=useState(true)
  const [motivo,setMotivo]=useState(true)
  
  /*const cambiarColor = (newColor) => {
    setColor(newColor);
  };  */
  //Tiempo
  
  const cambiarEstado=()=>{
    if(estado==='disponible'){
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
      setModalEstado(true)
    }else if(estado==='ocupado'){
      stop()
      setModalTerminar(!modalTerminar)
      calcularMonto()
    }else if(estado==='deshabilitado'){
      setModalHabilitar(!modalHabilitar)
    }else if(estado==='reservado'){
      setModalReserva(!modalReserva)
      stopTemp()
    }
  }
  const validarInputPlaca=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajePlaca(false)
        //setMensajePlaca(null)
      }
      return esInvalido;}
  const validarInputCi=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeCi(mostrar)
        setMensajeCi('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeCi(mostrar)
        setMensajeCi('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeCi(mostrar)
        setMensajeCi(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeCi(false)
        //setMensajeCi(null)
      }
      return esInvalido;}
  const validarInputCelular=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeCelular(false)
        //setMensajeCelular(null)
      }
      return esInvalido;
    }
  const validarInputMotivo=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+ 'carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeMotivo(false)
        //setMensajeMotivo(null)
      }
    return esInvalido;
  }
  const confirmarReserva = (estadoSitio, nuevoColor) => {
    let cad = props.nombre;
    let cadRecortada = cad.slice(1);
    const nuevaData = { nombre: props.nombre, estado: estadoSitio, color: nuevoColor };
    let fechaAhora=new Date()
    let hora=fechaAhora.getHours();let minutos=fechaAhora.getMinutes();
    let horaFin=hora+tarHora
    if(hora<10){
      hora='0'+hora
    }
    if(minutos<10){
      minutos='0'+minutos
    }
    let anio=fechaAhora.getFullYear();let mes=(fechaAhora.getMonth()+1);let dia=fechaAhora.getDate();
    let diaFin=fechaAhora.getDate()
    if(horaFin>23){
      horaFin=horaFin%24
      diaFin=diaFin+1
    }
    if(horaFin<10){
      horaFin='0'+horaFin
    }
    if(mes<10){
      mes='0'+mes
    }
    if(dia<10){
      dia='0'+dia
    }
    let horaExacta=hora+':'+minutos+':00'
    let fechaExacta=anio+'-'+mes+'-'+dia
    let horaExactaFin=horaFin+':'+minutos+':00'
    let fechaExactaFin=anio+'-'+mes+'-'+diaFin
    const nuevaReserva={nombreSitio:props.nombre,
      estado: "ocupado",
          color: nuevoColor,
          ciCliente: values.ci,
          nombreApellido: values.ci,
          celularCliente: values.celular,
          placaDelAuto: values.placa,
          periodo: 'corto',
          fechaIni: fechaExacta,
          fechaFin: fechaExactaFin,
          horaIni: horaExacta,
          horaFin: horaExactaFin,
    }
    console.log(nuevaReserva)
    let nuevosTiempos=[]
    if(fechaExacta===fechaExactaFin){
      const nuevoTiempo={
        fecha:fechaExacta,
        horasUsadas:parseInt(tarHora),
        minutosUsados:0,
        segundosUsados:0,
        sitioUsado:props.nombre
      }
      nuevosTiempos.push(nuevoTiempo)
    }else{
      const nuevoTiempo1={
        fecha:fechaExacta,
        horasUsadas:24-parseInt(hora),
        minutosUsados:0,
        segundosUsados:0,
        sitioUsado:props.nombre
      }
      const nuevoTiempo2={
        fecha:fechaExactaFin,
        horasUsadas:parseInt(horaFin),
        minutosUsados:0,
        segundosUsados:0,
        sitioUsado:props.nombre
      }
      nuevosTiempos.push(nuevoTiempo1)
      nuevosTiempos.push(nuevoTiempo2)
    }
    
    let fechaDividida=fechaExacta.split('-')
    const nuevoIngreso={
      anio: parseInt(fechaDividida[0]),
      mes: parseInt(fechaDividida[1]),
      fecha: parseInt(fechaDividida[2]),
      dia: parseInt(fechaDividida[2]),
      monto: tarHor,
      fechaActual: fechaAhora.toDateString(),
      ciCliente: values.ci,
      nombreApellido: values.ci,
      celularCliente: values.celular,
      placaDelAuto: values.placa,
      lugarUsado: props.nombre,
      tipo: "Ocupación",
    }
    console.log(nuevoIngreso)
    if (cad.includes('A')) {
      const dataRef = ref(database, 'sitiosAutos/' + cadRecortada);
      set(dataRef, nuevaData)
        .then(() => {
          console.log('Dato actualizado correctamente');
        })
        .catch((error) => {
          console.error('Error al actualizar el dato:', error);
        });
        const db = getDatabase(app);
        const collectionRef = ref(db, "ingresos");
        const newId = push(collectionRef).key;
        set(ref(database, 'reservas/'+newId),nuevaReserva)
        for(let i=0;i<nuevosTiempos.length;i++){
          console.log(nuevosTiempos[i])
          set(ref(database, 'tiempoUso/'+newId),nuevaReserva)
        }
        set(ref(database, 'ingresos/'+newId),nuevoIngreso)
    } else if (cad.includes('M')) {
      const dataRef = ref(database, 'sitiosMotos/' + cadRecortada);
      set(dataRef, nuevaData)
        .then(() => {
          console.log('Dato actualizado correctamente');
        })
        .catch((error) => {
          console.error('Error al actualizar el dato:', error);
        });
    }
  };
  
  const ejecutarAccion=(e)=>{
    //formato
    e.preventDefault()
    const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexNumber = /^[0-9]+$/;
    const regexPlaca = /^[0-9A-ZÑÁÉÍÓÚÜ\s]+$/;
    //mensajes alertas
    let alertaPlaca='Solo se permiten carácteres alfanuméricos y mayúsculas'
    let alertaCi='Solo se permiten carácteres numéricos'
    let alertaCelular='Solo se permiten carácteres numéricos'
    let alertaMotivo='Solo se permiten carácteres alfanuméricos'
    
    console.log(tarHor)
    console.log(tarHora)
    if(accSel==='ocupar'){
      let validarPlaca=!validarInputPlaca(values.placa,true,alertaPlaca,regexPlaca,6,8)
      let validarCi=!validarInputCi(values.ci,true,alertaCi,regexNumber,6,9)
      let validarCelular=!validarInputCelular(values.celular,true,alertaCelular,regexNumber,7,8)
      let validar=validarPlaca&&validarCi&&validarCelular
      if(validar===true){
        //setModalEstado(false)
        setEstado('ocupado')
        confirmarReserva('ocupado','#0050C8')
        //setCardColor(cardColors.completed)
        //setMostrarCronometro(true)
        //start()
      }
    }else if(accSel==='reservar'){
      let validarPlaca=!validarInputPlaca(values.placa,true,alertaPlaca,regexPlaca)
      let validarCi=!validarInputCi(values.ci,true,alertaCi,regexNumber)
      let validarCelular=!validarInputCelular(values.celular,true,alertaCelular,regexNumber)
      let validar=validarPlaca&&validarCi&&validarCelular
      if(validar===true){
        setModalEstado(false)
        setEstado('reservado')
        confirmarReserva('reservado','#FC6901')
        //setCardColor(cardColors.pending)
        clearInterval(intert);
        updatedS=10;updatedTM=0;
        setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
        startTemp()
      }
    }else if(accSel==='deshabilitar'){
      if(!validarInputMotivo(values.motivo,true,alertaMotivo,regexAll,3,50)){
        setModalEstado(false)
        setEstado('deshabilitado')
        confirmarReserva('deshabilitado','#BC0000')
        //setCardColor(cardColors.inactive)
      }
    }
  }
  const cancelarAccion=()=>{
    quitarMensajesError()
    setModalEstado(false)
  }
  const habilitarSitio=()=>{
    setModalHabilitar(!modalHabilitar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    confirmarReserva('disponible','#00FF38')
    //setCardColor(cardColors.active)
    setAccSel('ocupar')
  }
  const disponerSitio=()=>{
    setModalTerminar(!modalTerminar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    confirmarReserva('disponible','#00FF38')
    //setCardColor(cardColors.active)
    setMostrarCronometro(false)
    reset()
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
      monto:monto,
      fechaActual:fechaAct,
      ciCliente:values.ci,
      celularCliente:values.celular,
      placaDelAuto:values.placa,
      lugarUsado:props.nombre,
    tipo:'Ocupación'}
    const db=getDatabase(app)
    const collectionRef = ref(db,'ingresos');
    const newId = push(collectionRef).key;
    set(ref(database, "ingresos/"+(newId)), ingreso);
    let tiempoUso={
      sitioUsado:props.nombre,
      fecha:fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDay(),
      horasUsadas:time.h,
      minutosUsados:time.m,
      segundosUsados:time.s
    }
    set(ref(database, "tiempoUso/"+(newId)), tiempoUso);
  }
  
  const cancelarHabilitar=()=>{
    setModalHabilitar(!modalHabilitar)
  }
  const cancelarDisponer=()=>{
    resume()
    setModalTerminar(!modalTerminar)
  }
  //let accionSeleccionada='ocupar'
  const [accSel,setAccSel]=useState('ocupar')
  //quitar mensajes error
  const quitarMensajesError=()=>{
    setMostrarMensajePlaca(false)
    setMostrarMensajeCi(false)
    setMostrarMensajeCelular(false)
    setMostrarMensajeMotivo(false)
  }
  const registrarCambio=(e)=>{
    //accionSeleccionada=e.target.value;
    quitarMensajesError()
    setAccSel(e.target.value)
    if(e.target.value==='ocupar'){
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
    }else if(e.target.value==='reservar'){
      resetTemp()
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
    }else if(e.target.value==='deshabilitar'){
      setPlaca(false)
      setCi(false)
      setCelular(false)
      setMotivo(true)
    }
  }
  //Reservar
  const ocuparSitio=()=>{
    //setModalHabilitar(!modalHabilitar)
    resetTemp()
    setModalReserva(!modalReserva)
    setEstado('ocupado')
    confirmarReserva('ocupado','#0050C8')
    //setCardColor(cardColors.completed)
  }
  const cancelarReserva=()=>{
    resumeTemp()
    setModalReserva(!modalReserva)
  }
  const terminarReserva=()=>{
    setEstado('disponible')
    confirmarReserva('disponible','#00FF38')
    //setCardColor(cardColors.active)
  }
  //cronometro
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  //const [status, setStatus] = useState(0);
  const start = () => {
    run();
    //setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    //setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    //setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();
  const [monto,setMonto]=useState(0.0)
  const calcularMonto=()=>{
    if(time.m<=1){
      setMonto(3.0)
    }else if(time.m>1&&time.m<=4){
      setMonto(6.0)
    }else if(time.m>4){
      setMonto(10.0)
    }
  }
  //Temporizador
  const [timeTemp, setTimeTemp] = useState({tms:0, ts:10, tm:0, th:0});
  const [intert, setIntert] = useState();
  const startTemp = () => {
    //updatedTS = timeTemp.ts; updatedTM = timeTemp.tm;
    if(updatedTM === 0 && updatedTS === 0){
      console.log('verde')
      
      setIntert(clearInterval(intert));
      //console.log('verde')
    }else{
      runTemp();
      setIntert(setInterval(runTemp, 1000));
    }
   // let interval=setInterval()
  };
  var updatedTS = timeTemp.ts, updatedTM = timeTemp.tm;

  const runTemp = () => {
    //let continuar=true;
    if(updatedTM === 0 && updatedTS === 0){
      //clearInterval(intert);
      //setTimeTemp({ ts:0, tm:1});
      //continuar=false;
      stopTemp()
      resetTemp()
      
      console.log('verde')
      terminarReserva()
      setTimeTemp({ ts:10, tm:0});
      //stopTemp()
      clearInterval(intert)
    }else if(updatedTS === 0){
      updatedTM--;
      updatedTS = 60;
    }
    if(updatedTM >= 0 && updatedTS >= 0){
    updatedTS--;
  }
    return setTimeTemp({ ts:updatedTS, tm:updatedTM});
  
  };
  const stopTemp = () => {
    clearInterval(intert);
    setTimeTemp({tms:0, ts:updatedTS, tm:updatedTM, th:0})
  };

  const resetTemp = () => {
    clearInterval(intert);
    setTimeTemp({tms:0, ts:10, tm:0, th:0})
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
  /*const onChangeHoraInicioReserva=(e)=>{
    setHoraInicioReserva(e.target.value)
  }*/
  const resumeTemp = () => startTemp();
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
        if(arregloFiltrado.length!==0){
          let encontrado=false
          for(let i=0;i<arregloFiltrado.length&&encontrado===false;i++){
            if(arregloFiltrado[i].horaIni>arregloFiltrado[i].horaFin){
              //console.log('ehh')
              if(horaAct>=arregloFiltrado[i].horaIni||horaAct<=arregloFiltrado[i].horaFin){
                setColor(arregloFiltrado[i].color)
                setEstado(arregloFiltrado[i].estado)
                encontrado=true
              }else{
                setColor('#00FF38')
                setEstado('disponible')
              }
            }else if(arregloFiltrado[i].horaIni<arregloFiltrado[i].horaFin){
              //console.log('ehh')
              if(horaAct>=arregloFiltrado[i].horaIni&&horaAct<=arregloFiltrado[i].horaFin){
                setColor(arregloFiltrado[i].color)
                setEstado(arregloFiltrado[i].estado)
                encontrado=true
              }else{
                setColor('#00FF38')
                setEstado('disponible')
              }
            }
          }
        }else{
          //console.log('#00FF38')
        }/*
      let filtradoHora=arregloFiltrado.filter((reser)=>((horaAct >= reser.horaIni || horaAct<reser.horaFin)))
      //console.log(filtradoHora)
      //console.log(reservas)
      if(filtradoHora.length===0){
        setColor('#00FF38')
        setEstado('disponible')
      }else{
        setColor(filtradoHora[0].color)
        setEstado(filtradoHora[0].estado)
      }
      if(props.estado==='deshabilitado'){
        setEstado(props.estado)
        setColor(props.color)
      }*/if(props.estado==='deshabilitado'){
        setEstado(props.estado)
        setColor(props.color)
      }
    }, 1000); // Actualizar la hora cada segundo

    return () => {
      clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
    };
  }, [
    color,
    props.color,reservas,props.estado
  ]);
  return (
    
    <div>
      {false&&currentTime}
        <div  className={props.nombre.includes('A') ? 'sitio' : props.nombre.includes('M') ? 'sitioM' : 'sitio'} onClick={cambiarEstado} style={{ backgroundColor: color }}>
            <h2>{props.nombre}</h2>
            <p className='texto'>{estado}</p>
            {mostrarCronometro &&<div className='cronometroSitio'>
              <DisplayComponent time={time}/>
            </div>}
        </div>
        
        <Modal isOpen={modalEstado} centered={true}>
          <div className='modalHeader'>
          <ModalHeader >
            <p className='asig'>Asignar sitio</p>
            <p className='asig'>{props.nombre}</p>
          </ModalHeader>
          </div>
          <ModalBody>
            <select onChange={(e)=>registrarCambio(e)}>
              <option value='ocupar' selected>OCUPAR</option>
              <option value='reservar'>RESERVAR</option>
              <option value='deshabilitar'>DESHABILITAR</option>
            </select>
            {placa&&<EntradaInput
              titulo="Placa"
              nombre='placa'
              cambio={onChange}
              mostrarMensaje={mostrarMensajePlaca} 
              mensaje={mensajePlaca}
            /> }
              {ci&&<EntradaInput
              titulo="CI"
              nombre='ci'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCi} 
              mensaje={mensajeCi}
            />}
              {celular&&<EntradaInput
              titulo="Celular"
              nombre='celular'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCelular}
              mensaje={mensajeCelular} 
            />}
            {motivo&&<EntradaInput
              titulo="Motivo"
              nombre='motivo'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeMotivo}
              mensaje={mensajeMotivo}
            />}
            {celular&&<select onChange={(e) => tarifaHoraria(e.target.value)}> 
              <option value='3'>0 a 1 hora(3 Bs)</option>
              <option value='6'>1 a 4 horas(6 Bs)</option>
              <option value='10'>4 a 12 horas(10 Bs)</option>
              <option value='15'>12 a 24 horas(15 Bs)</option>
            </select>}
            
          </ModalBody>
          <div className='modalFooter'>
          <ModalFooter>
            <div className='botonesModalSitio'>
          <Button onClick={ejecutarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 26px',
            }}>Aplicar</Button>
            </div>
          <Button onClick={cancelarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 20px',
            }}>Cancelar</Button>
            
          </ModalFooter>
          </div>
        </Modal>
        <Modal isOpen={modalTerminar} centered={true}>
          <ModalHeader>
            <h2>Terminar</h2>
          </ModalHeader>
          <ModalBody>
            <h3>{props.nombre}</h3>
            <DisplayComponent time={time}/>
            <div>{monto} Bs.</div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={disponerSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
            <Button onClick={cancelarDisponer} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalHabilitar} centered={true}>
          <ModalHeader>
            <h2>Habilitar Sitio</h2>
          </ModalHeader>
          <ModalBody>
            <h3>{props.nombre}</h3>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={habilitarSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
            <Button onClick={cancelarHabilitar} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalReserva} >
          <ModalHeader>
            <h2>Ocupar</h2>
          </ModalHeader>
          <ModalBody>
            <h3>{props.nombre}</h3>
            </ModalBody>
          <ModalFooter>
            <Button onClick={ocuparSitio} style={{...StyleSheet.buttonModal,backgroundColor:"#00B9BC"}}>Aplicar</Button>
            
            <Button onClick={cancelarReserva} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default Sitio