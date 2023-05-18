import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EntradaInput from '../Sitio/EntradasModal/EntradaInput';
import QrCodigo from '../QRCodigo/QrCodigo';
import { ref, set } from "firebase/database";
import { database } from '../../conexion/firebase';
const SitioReserva = (props) => {
    const [estadoSitio,setEstadoSitio]=useState(props.estado)
    
    /*const cardColors ={
        disponible: '#00FF38',
        deshabilitado: '#BC0000',
        reservado: '#FC6901',
        ocupado: '#0050C8',
        ocupadoMensual: 'violet'
    };*/
    /*const escogerColor=()=>{
        let colorElegido=''
        if(estadoSitio==='disponible'){
        colorElegido=cardColors.disponible
        }else if(estadoSitio==='ocupado'){
        colorElegido=cardColors.ocupado
        }else if(estadoSitio==='deshabilitado'){
            colorElegido=cardColors.deshabilitado
        }else if(estadoSitio==='reservado'){
            colorElegido=cardColors.reservado
        }else if(estadoSitio==='reservadoMensual'){
            colorElegido=cardColors.ocupadoMensual
        }
        return colorElegido;
    }*/
    //const [cardColor,setCardColor] = useState(escogerColor());

    const cambiarEstado=()=>{
      let estadoSitio2=props.estado
        if(estadoSitio2==='disponible'){
            setModalEstado(true)
            console.log(estadoSitio)
        }
    }
    //Modal
    const [modalEstado,setModalEstado]=useState(false)

    const [mostrarMensajePlaca,setMostrarMensajePlaca]=useState(false);
    const [mostrarMensajeCi,setMostrarMensajeCi]=useState(false);
    const [mostrarMensajeCelular,setMostrarMensajeCelular]=useState(false);
    const [mensajePlaca,setMensajePlaca]=useState('');
    const [mensajeCi,setMensajeCi]=useState('');
    const [mensajeCelular,setMensajeCelular]=useState('');

    const [values, setValues] = useState({
        placa:'',
        ci:'',
        celular:''
    });
    const onChange = (e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const cancelarAccion=()=>{
        quitarMensajesError()
        setModalEstado(false)
    }
    const quitarMensajesError=()=>{
        setMostrarMensajePlaca(false)
        setMostrarMensajeCi(false)
        setMostrarMensajeCelular(false)
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
    const ejecutarAccion=()=>{
        //formato
        //const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        const regexNumber = /^[0-9]+$/;
        const regexPlaca = /^[0-9A-ZÑÁÉÍÓÚÜ\s]+$/;
        //mensajes alertas
        let alertaPlaca='Solo se permiten carácteres alfanuméricos y mayúsculas'
        let alertaCi='Solo se permiten carácteres numéricos'
        let alertaCelular='Solo se permiten carácteres numéricos'
        
          let validarPlaca=!validarInputPlaca(values.placa,true,alertaPlaca,regexPlaca)
          let validarCi=!validarInputCi(values.ci,true,alertaCi,regexNumber)
          let validarCelular=!validarInputCelular(values.celular,true,alertaCelular,regexNumber)
          let validar=validarPlaca&&validarCi&&validarCelular
          if(validar===true){
            setModalEstado(false)
            setEstadoSitio('reservado')
            //setCardColor(cardColors.reservado)
            let fecha=new Date()
            let hora=fecha.getTime()
            const comprobanteData={
              sitio:props.nombre,
              placa:values.placa,
              ciCliente:values.ci,
              celular:values.celular,
              fecha:fecha.toDateString(),
              hora:fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds(),
              monto:3.0
            }
            let idUnico=values.placa+values.ci+hora+fecha.getHours()+'-'+fecha.getMinutes()+'-'+fecha.getSeconds()
            console.log(idUnico)
            console.log(comprobanteData)
            set(ref(database, "comprobantes/"+idUnico), comprobanteData);
            setUrl(url+idUnico)
            setModalQr(true)
            /*clearInterval(intert);
            updatedS=10;updatedTM=0;
            setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
            startTemp()*/
          }
        
      }
      //QR
      const [modalQr,setModalQr]=useState(false)
      const cerrarModalQR=()=>{
        setModalQr(false)
      }
      const [url,setUrl]=useState('https://cosmic-queijadas-061ac9.netlify.app/comprobante/')
  return (
    <div>
        <div className='sitio' onClick={cambiarEstado} style={{ backgroundColor: props.color}}>
            <h2>{props.nombre}</h2>
            <p className='texto'>{props.estado}</p>
        </div>
        <Modal isOpen={modalEstado} centered={true}>
          <div className='modalHeader'>
          <ModalHeader >
            <p className='asig'>Asignar sitio</p>
            <p className='asig'>{props.nombre}</p>
          </ModalHeader>
          </div>
          <ModalBody>
            <EntradaInput
              titulo="Placa"
              nombre='placa'
              cambio={onChange}
              mostrarMensaje={mostrarMensajePlaca} 
              mensaje={mensajePlaca}
            /> 
            <EntradaInput
              titulo="CI"
              nombre='ci'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCi} 
              mensaje={mensajeCi}
            />
            <EntradaInput
              titulo="Celular"
              nombre='celular'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCelular}
              mensaje={mensajeCelular} 
            />
          </ModalBody>
          <div className='modalFooter'>
          <ModalFooter>
            <div className='botonesModalSitio'>
            <Button onClick={cancelarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 20px',
            }}>Cancelar</Button>
          <Button onClick={ejecutarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 26px',
            }}>Aplicar</Button>
            </div>
          </ModalFooter>
          </div>
        </Modal>
        <Modal isOpen={modalQr} centered={true}>
        <div className='modalHeader'>
          <ModalHeader >
            <p className='asig'>Escanear Código QR</p>
            <p className='asig'>{props.nombre}</p>
          </ModalHeader>
          </div>
          <ModalBody>
            <QrCodigo
              datos={url}
            />
          </ModalBody>
          <div className='modalFooter'>
          <ModalFooter>
            <div className='botonesModalSitio'>
            <Button onClick={cerrarModalQR} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 20px',
            }}>Cerrar</Button>
          <Button onClick={cerrarModalQR} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 26px',
            }}>Guardar</Button>
            </div>
          </ModalFooter>
          </div>
        </Modal>
    </div>
  )
}

export default SitioReserva