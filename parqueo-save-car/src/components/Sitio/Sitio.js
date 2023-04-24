import React, { useState } from 'react'
import './Sitio.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EntradaInput from './EntradasModal/EntradaInput';
import DisplayComponent from './DisplayComponent';
//import BtnComponent from './BtnComponent';


const Sitio = (props) => {
  const [estado,setEstado]=useState('disponible')

  const [modalEstado,setModalEstado]= useState(false);
  const [modalTerminar,setModalTerminar]= useState(false);
  const [modalHabilitar,setModalHabilitar]= useState(false);
  const [modalReserva,setModalReserva]= useState(false);
  //colores
  const cardColors ={
    active: '#00FF38',
    inactive: '#BC0000',
    pending: '#FC6901',
    completed: '#0050C8'
  };
  const [cardColor,setCardColor] = useState(cardColors.active);
  //const [color, setColor] = useState('#00FF38');
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
    //console.log(estado)
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
    }else if(estado==='reservar'){
      setModalReserva(!modalReserva)
      stopTemp()
    }
  }
  const ejecutarAccion=()=>{
    //console.log(accionSeleccionada)
    
    
    if(accSel==='ocupar'){
      //cambiarColor('#0050C8')
      setModalEstado(false)
      setEstado('ocupado')
      setCardColor(cardColors.completed)
      start()
      
    }else if(accSel==='reservar'){
      //cambiarColor('#BC0000')
      setModalEstado(false)
      setEstado('reservar')
      setCardColor(cardColors.pending)
      //stopTemp()
      //resetTemp()
      
      clearInterval(intert);
      updatedS=10;updatedTM=0;
    setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
    startTemp()
    
    }else if(accSel==='deshabilitar'){
      //cambiarColor('#BC0000')
      setModalEstado(false)
      setEstado('deshabilitado')
      setCardColor(cardColors.inactive)
    }
    //console.log(estado)
  }
  const cancelarAccion=()=>{
    
    setModalEstado(false)
  }
  const habilitarSitio=()=>{
    setModalHabilitar(!modalHabilitar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    setCardColor(cardColors.active)
    setAccSel('ocupar')
  }
  const disponerSitio=()=>{
    setModalTerminar(!modalTerminar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    setCardColor(cardColors.active)
    reset()
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
  const registrarCambio=(e)=>{
    //accionSeleccionada=e.target.value;
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
    setCardColor(cardColors.completed)

  }
  const cancelarReserva=()=>{
    resumeTemp()
    setModalReserva(!modalReserva)
  }
  const terminarReserva=()=>{
    setEstado('disponible')
    setCardColor(cardColors.active)
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

  const resumeTemp = () => startTemp();
  
  return (
    
    <div>
        <div className='sitio' onClick={cambiarEstado} style={{ backgroundColor: cardColor}}>
            <h2>{props.nombre}</h2>
        </div>
        <div>{updatedTM}:{updatedTS}</div>
        <button onClick={startTemp}>Iniciar</button>
        <button onClick={stopTemp}>Parar</button>
        <button onClick={resumeTemp}>Continuar</button>
        <button onClick={resetTemp}>Reset</button>
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
            /> }
              {ci&&<EntradaInput
              titulo="CI" 
            />}
              {celular&&<EntradaInput
              titulo="Celular" 
            />}
            {motivo&&<EntradaInput
              titulo="Motivo" 
            />}
          </ModalBody>
          <div className='modalFooter'>
          <ModalFooter>
          <Button onClick={ejecutarAccion} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
          <Button onClick={cancelarAccion} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
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
            <h3>A3</h3>
          </ModalBody>
          <ModalFooter>
            <Button onClick={ocuparSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
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