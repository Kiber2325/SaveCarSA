import React,{useState} from 'react'
import Entrada from './Entrada/Entrada';
import './RegistrarCliente.css';
//import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FormInput from './InputFormAgregarVehiculo/FormInput';
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
//const conexionCliente='http://127.0.0.1:8000/api/cliente';
import {  ref, set } from "firebase/database";
import { database} from '../../conexion/firebase';
import Footers from '../Footer/Footer';
import Navlogin from '../Login/Navlogin'
const RegistrarCliente = () => {
  //constante para navegar
  const navigate=useNavigate();
  //guardar estado de inputs 
  const [ci,setCi]=useState('');
  const [nombre,setNombre]=useState('');
  const [apellido,setApellido]=useState('');
  const [correo,setCorreo]=useState('');
  const [celular,setCelular]=useState('');
  const [lugar,setLugar]=useState('');
  const [cantidadMeses,setCantidadMeses]=useState('1');
/*validaciones hook useState
verificacion  de errores  */
  const [errorCI,setErrorCI]=useState(false);
  const [errorNombre,setErrorNombre]=useState(false);
  const [errorApellidos,setErrorApellidos]=useState(false);
  const [errorCorreo,setErrorCorreo]=useState(false);
  const [errorCelular,setErrorCelular]=useState(false);
  const [errorLugar,setErrorLugar]=useState(false);
  const [errorCantidadMeses,setErrorCantidadMeses]=useState(false);
//mensajes de error
  const [mensajeErrorCI,setMensajeErrorCI]=useState(null);
  const [mensajeErrorNombre,setMensajeErrorNombre]=useState(null);
  const [mensajeErrorApellidos,setMensajeErrorApellidos]=useState(null);
  const [mensajeErrorCorreo,setMensajeErrorCorreo]=useState(null);
  const [mensajeErrorCelular,setMensajeErrorCelular]=useState(null);
  const [mensajeErrorLugar,setMensajeErrorLugar]=useState(null);
  const [mensajeErrorCantidadMeses,setMensajeErrorCantidadMeses]=useState(null);
  //puntos de control
  var errorCi2=false;
  var errorNombre2=false;
  var errorApellidos2=false;
  var errorCorreo2=false;
  var errorCelular2=false;
  var errorLugar2=false;
  var errorCantidadMeses2=false;

  //tamaños de los inputs variables
  let tamCi=false;
  let tamNombre=false;
  let tamApellido=false;
  let tamCorreo=false;
  let tamCelular=false;
  let tamLugar=false;
  let tamCanMes=false;
  //llenado y validacion de los inputs
  const manejarCi=e=>{
    setCi(e.target.value);
    onValidateCI(e.target.value);
    if(errorCi2===false&&tamCi===true){
      comprobarTamCi(e.target.value);
    }
  }
  const manejarNombre=e=>{
    setNombre(e.target.value);
    onValidateNombre(e.target.value);
    if(errorNombre2===false&&tamNombre===true){
      comprobarTamNombre(e.target.value);
    }
  }
  const manejarApellido=e=>{
    setApellido(e.target.value);
    onValidateApellidos(e.target.value);
    if(errorApellidos2===false&&tamApellido===true){
      comprobarTamApellido(e.target.value);
    }
  }
  const manejarCorreo=e=>{
    setCorreo(e.target.value);
    onValidateCorreo(e.target.value);
    if(errorCorreo2===false&&tamCorreo===true){
      comprobarTamCorreo(e.target.value);
    }
  }
  const manejarCelular=e=>{
    setCelular(e.target.value);
    onValidateCelular(e.target.value);
    if(errorCelular2===false&&tamCelular===true){
      comprobarTamCelular(e.target.value);
    }
  }
  const manejarLugar=e=>{
    setLugar(e.target.value);
    onValidateLugar(e.target.value);
    if(errorLugar2===false&&tamLugar===true){
      comprobarTamLugar(e.target.value);
    }
  }
  const manejarCantidadMeses=e=>{
    setCantidadMeses(e.target.value);
    onValidateCantidadMeses(e.target.value);
    if(errorCantidadMeses2===false&&tamCanMes===true){
      comprobarTamCantidadMes(e.target.value);
    }
  }
  //formatos para inputs
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  const regexNumber = /^[0-9]+$/;
  const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexMonth= /^[0-9]+$/;
  const regexCel = /^[0-9]+$/;
  //validaciones textos
  const onValidateCI=(ciCapturado)=>{
    if(!ciCapturado.trim()){
      setErrorCI(true);
      errorCi2=true;
      setMensajeErrorCI('El campo "CI" no debe ser vacio.');
    }else if(!regexNumber.test(ciCapturado)){
      setErrorCI(true);
      errorCi2=true;
      setMensajeErrorCI('El campo "CI" solo acepta números positivos.');
    }else{
      setErrorCI(false);
      errorCi2=false;
      setMensajeErrorCI(null);
    }  
  }
  const onValidateNombre=(nombreCapturado)=>{
    if(!nombreCapturado.trim()){
      setErrorNombre(true);
      errorNombre2=true;
      setMensajeErrorNombre('El campo "Nombre" no debe ser vacio.');
    } else if(!regexName.test(nombreCapturado)){
      setErrorNombre(true);
      errorNombre2=true;
      setMensajeErrorNombre('El campo "Nombre" solo acepta letras.');
    }else{
      setErrorNombre(false);
      errorNombre2=false;
      setMensajeErrorNombre(null);
    }
  }
  const onValidateApellidos=(apellidoCapturado)=>{
    if(!apellidoCapturado.trim()){
      setErrorApellidos(true);
      errorApellidos2=true;
      setMensajeErrorApellidos('El campo "Apellidos" no debe ser vacio.');
    } else if(!regexName.test(apellidoCapturado)){
      setErrorApellidos(true);
      errorApellidos2=true;
      setMensajeErrorApellidos('El campo "Apellidos" solo acepta letras.');
    }else{
      setErrorApellidos(false);
      errorApellidos2=false;
      setMensajeErrorApellidos(null);
    }
  }
  const onValidateCorreo=(correoCapturado)=>{
    if(!correoCapturado.trim()){
      setErrorCorreo(true);
      errorCorreo2=true;
      setMensajeErrorCorreo('El campo "Correo" no debe ser vacio.');
    } else if(!regexEmail.test(correoCapturado)){
      setErrorCorreo(true);
      errorCorreo2=true;
      setMensajeErrorCorreo('El formato del campo "Correo" es: ejemplo1@gmail.com');
    }else{
      setErrorCorreo(false);
      errorCorreo2=false;
      setMensajeErrorCorreo(null);
    }
  }
  const onValidateCelular=(celularCapturado)=>{
    if(!celularCapturado.trim()){
      setErrorCelular(true);
      errorCelular2=true;
      setMensajeErrorCelular('El campo "Celular" no debe ser vacio.');
    } else if(!regexCel.test(celularCapturado)){
      setErrorCelular(true);
      errorCelular2=true;
      setMensajeErrorCelular('El campo "Celular" tiene un formato incorrecto.');
    }else{
      setErrorCelular(false);
      errorCelular2=false;
      setMensajeErrorCelular(null);
    }
  }
  const onValidateLugar=(lugarCapturado)=>{
    if(!lugarCapturado.trim()){
      setErrorLugar(true);
      errorLugar2=true;
      setMensajeErrorLugar('El campo "Aparcamiento asignado" no debe ser vacio.');
    } else if(!regexAll.test(lugarCapturado)){
      setErrorLugar(true);
      errorLugar2=true;
      setMensajeErrorLugar('El campo "Aparcamiento asignado" solo acepta letras.');
    }else{
      setErrorLugar(false);
      errorLugar2=false;
      setMensajeErrorLugar(null);
    }
  }
  const onValidateCantidadMeses=(cantMesCapturado)=>{
    if(!cantMesCapturado.trim()){
      setErrorCantidadMeses(true);
      errorCantidadMeses2=true;
      setMensajeErrorCantidadMeses('El campo "Cantidad de meses" no debe ser vacio.');
    } else if(!regexMonth.test(cantMesCapturado)){
      setErrorCantidadMeses(true);
      errorCantidadMeses2=true;
      if(cantMesCapturado==='0'||cantMesCapturado==='e'){
        setMensajeErrorCantidadMeses('El campo "Cantidad de meses" no puede ser 0.');
      }else{
        setMensajeErrorCantidadMeses('El campo "Cantidad de meses" solo acepta números positivos.');
      }
    }else{
      setErrorCantidadMeses(false);
      errorCantidadMeses2=false;
      setMensajeErrorCantidadMeses(null);
    }
  }
  //comprobar tamaños de los inputs(en proceso)
  const comprobarTamCi=(compCi)=>{
    if(compCi.length>4&&compCi.length<9){
      tamCi=false;
      setErrorCI(false);
      setMensajeErrorCI(null);
    }else{
      tamCi=true;
      setErrorCI(true);
      setMensajeErrorCI('La cantidad mínima es de 5 dígitos y la máxima es de 8 dígitos');
    }
  }
  const comprobarTamNombre=(compNombre)=>{
    if(compNombre.length>2&&compNombre.length<51){
      tamNombre=false;
      setErrorNombre(false);
      setMensajeErrorNombre(null);
    }else{
      tamNombre=true;
      setErrorNombre(true);
      setMensajeErrorNombre('La cantidad mínima es de tres letras y la máxima es de 50 letras');
    }
  }
  const comprobarTamApellido=(compApellido)=>{
    if(compApellido.length>2&&compApellido.length<51){
      tamApellido=false;
      setErrorApellidos(false);
      setMensajeErrorApellidos(null);
    }else{
      tamApellido=true;
      setErrorApellidos(true);
      setMensajeErrorApellidos('La cantidad mínima es de tres letras y la máxima es de 50 letras');
    }
  }
  const comprobarTamCorreo=(compCorreo)=>{
    if(compCorreo.length>2&&compCorreo.length<51){
      tamCorreo=false;
      setErrorCorreo(false);
      setMensajeErrorCorreo(null);
    }else{
      tamCorreo=true;
      setErrorCorreo(true);
      setMensajeErrorCorreo('La cantidad mínima es de tres letras y la máxima es de 50 letras');
    }
  }
  const comprobarTamCelular=(compCelular)=>{
    if(compCelular.length>7&&compCelular.length<9){
      tamCelular=false;
      setErrorCelular(false);
      setMensajeErrorCelular(null);
    }else{
      tamCelular=true;
      setErrorCelular(true);
      setMensajeErrorCelular('Debe ser un número con 8 dígitos');
    }
  }
  const comprobarTamLugar=(compLugar)=>{
    if(compLugar.length>0&&compLugar.length<10){
      tamLugar=false;
      setErrorLugar(false);
      setMensajeErrorLugar(null);
    }else{
      tamLugar=true;
      setErrorLugar(true);
      setMensajeErrorLugar('La cantidad máxima es de 10 letras');
    }
  }
  const comprobarTamCantidadMes=(compCantMes)=>{
    if(compCantMes==='1'||compCantMes==='2'||compCantMes==='3'||compCantMes==='4'||
    compCantMes==='5'||compCantMes==='6'||compCantMes==='7'||compCantMes==='8'||
    compCantMes==='9'||compCantMes==='10'||compCantMes==='11'||compCantMes==='12'){
      tamCanMes=false;
      setErrorCantidadMeses(false);
      setMensajeErrorCantidadMeses(null);
    }else{
      tamCanMes=true;
      setErrorCantidadMeses(true);
      setMensajeErrorCantidadMeses('El rango aceptado es de 1 al 12');
    }
  }
  let listaAutoEstaVacio=false;
  const [listaAuto,setListaAuto]=useState(false);
  const [mensajeListaAuto,setMensajeListaAuto]=useState('');
  //verificar todos los campos
  const comprobarCampos=()=>{
    //console.log(ci+'\n'+nombre+'\n'+apellido+'\n'+correo+'\n'+celular+'\n'+lugar+'\n'+cantidadMeses);
    onValidateCI(ci);
    if(errorCi2===false){
      comprobarTamCi(ci);
    }
    onValidateNombre(nombre);
    if(errorNombre2===false){
      comprobarTamNombre(nombre);
    }
    onValidateApellidos(apellido);
    if(errorApellidos2===false){
      comprobarTamApellido(apellido);
    }
    onValidateCorreo(correo);
    if(errorCorreo2===false){
      comprobarTamCorreo(correo);
    }
    onValidateCelular(celular);
    if(errorCelular2===false){
      comprobarTamCelular(celular);
    }
    onValidateLugar(lugar);
    if(errorLugar2===false){
      comprobarTamLugar(lugar);
    }
    onValidateCantidadMeses(cantidadMeses);
    if(errorCantidadMeses2===false){
      comprobarTamCantidadMes(cantidadMeses);
    }
    if(data.length===0){
      listaAutoEstaVacio=true;
      setListaAuto(true)
      setMensajeListaAuto('Debe agregar al menos un auto')
    }
    return tamCi||tamNombre||tamApellido||tamCorreo||tamCelular||tamLugar||tamCanMes||listaAutoEstaVacio;
  }
  //registra cliente/ redireccionar
  const registrarCliente=async(e)=>{
    e.preventDefault();
    if(comprobarCampos()===false){
      //console.log(ci+'\n'+nombre+'\n'+apellido+'\n'+correo+'\n'+celular+'\n'+lugar+'\n'+cantidadMeses);
      /*await axios.post(conexionCliente,{CI:ci,
      nombre:nombre,
      apellido:apellido,
      correo:correo,
      celular:celular,
      cantidad_meses:cantidadMeses});*/
      //redireccion
      //navigate('/Home');
      //window.location.reload();
      const values={
        ciCliente:ci,
        nombre:nombre,
        apellido:apellido,
        celular:celular,
        estado:'activo'
      }
      set(ref(database, "clientesMensuales/"+(ci)), values);
      let fecha=new Date()
      let anio=fecha.getFullYear()
      let mes=fecha.getMonth()+1
      let dia=fecha.getDate()
      let mesFinal=mes+1
if(mes<10){
  mes='0'+mes
}
if(dia<10){
  dia='0'+dia
}
if(mesFinal<10){
  mesFinal='0'+mesFinal
}
let fechaIni=anio+'-'+mes+'-'+dia
let fechaFin=anio+'-'+mesFinal+'-'+dia
const nuevaReserva = {
  
  nombreSitio: lugar,
  estado: 'reserva mes completo',
  color: '#808080',
  ciCliente: values.ciCliente,
  nombreApellido: values.nombre+values.apellido,
  celularCliente: values.celular,
  placaDelAuto: "AAAA123",
  periodo: 'completo',
  fechaIni: fechaIni,
  fechaFin: fechaFin,
  horaIni: '00:00:00',
  horaFin: '23:59:00',
};
console.log(nuevaReserva);
set(ref(database, "reservas/" + values.ciCliente+values.nombre),nuevaReserva)
    }
  }
  //cancelar con sweet alert
  const cancelarRegistroCliente=async(e)=>{
    e.preventDefault();
    Swal.fire({

      title: 'Advertencia',
      text:'Esta seguro que desea cancelar el registro',
      icon:'warning',
      showDenyButton: true,
      
    }).then(response=>{
      if(response.isConfirmed){
        navigate('/Home');
        //window.location.reload();
      }
    })
  }
  //añadir auto
  const dataAutos=[];
  const [data, setData]=useState(dataAutos);
  const [values, setValues] = useState({
    id:'',
    matricula:"",
    tipo:"",
    marca:"",
    soat:"",
  });

  const inputs = [
    {
    id:1,
    name:"matricula",
    type:"text",
    placeholder:"Escriba la matricula del vehículo",
    errorMessage:"Escribir números, letras de 6-8 caracteres y sin caracteres especiales!",
    label:"Matricula",
    pattern: "^[A-Z0-9]{6,8}",
    required: true
  },

  {
    id:2,
    name:"tipo",
    type:"text",
    placeholder:"Selecione tipo de vehiculo",
    errorMessage:"Debe seleccionar un tipo de vehículo",
    label:"Tipo de vehículo",
    pattern: "^[A-Za-z0-9]{4,20}",
    required: true
  },
  {
    id:3,
    name:"marca",
    type:"text",
    placeholder:"Escriba la marca del vehículo",
    errorMessage:"Espacio de llenado obligatorio",
    label:"Marca",
    pattern: "^[A-Za-z]{3,20}",
    required: true
  },
  {
    id:4,
    name:"soat",
    type:"text",
    placeholder:"Escriba número de contacto",
    errorMessage:"Espacio de llenado obligatorio",
    label:"SOAT",
    pattern: "^[0-9]{7,8}",
    required: true
  }
]

  const seleccionarAuto=(e,elemento, caso)=>{
    e.preventDefault();
    setValues(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const onChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const [stateInsertar,setStateInsertar]= useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const cerrarModalEditarCancelar=()=>{
    setModalEditar(!modalEditar);
    let valoresCero={
      id:'',
      matricula:"",
      tipo:"",
      marca:"",
      soat:"",
    };
    setValues(valoresCero)
  }
  const abrirModal=(e)=>{
    e.preventDefault();
    setStateInsertar(!stateInsertar);
  }
  const [typeOp, setTypeOp] = React.useState('');
  const captureType = (e) => {
    setTypeOp(e.target.value);
  }
  const insertarVehiculo=(e)=>{
    e.preventDefault();
    
    if(typeOp!==''){
      values.tipo=typeOp;
    }
    if(values.matricula!==''&&values.tipo!==''&&values.marca!==''&&values.soat!==''){
    listaAutoEstaVacio=false;
      setListaAuto(false)
      setMensajeListaAuto(null)
    let valorInsertar=values;
    var dataNueva = data;
    valorInsertar.id=valorInsertar.matricula;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setStateInsertar(!stateInsertar);
    let valoresCero={
      id:'',
      matricula:"",
      tipo:"",
      marca:"",
      soat:"",
    };
    setValues(valoresCero)

    }
  }
  const editar=()=>{
    values.tipo=typeOp;
    console.log(values)
    if(values.matricula!==''&&values.tipo!==''&&values.marca!==''&&values.soat!==''){
    var dataNueva=data;
    /*dataNueva.map(auto=>{
      if(auto.id===values.id){
        auto.matricula=values.matricula;
        auto.tipo=values.tipo;
        auto.marca=values.marca;
        auto.soat=values.soat;
      }
    });*/
    for(let i=0;i<dataNueva.length;i++){
      let auto=dataNueva[i];
      auto.matricula=values.matricula;
      auto.tipo=values.tipo;
      auto.marca=values.marca;
      auto.soat=values.soat;
    }
    setData(dataNueva);
    setModalEditar(false);
    let valoresCero={
      id:'',
      matricula:"",
      tipo:"",
      marca:"",
      soat:"",
    };
    setValues(valoresCero)
    console.log(values)
  }
  }
  const eliminar=(e)=>{
    
    setData(data.filter(auto=>auto.id!==values.id));
    setModalEliminar(!modalEliminar);
  }
  //html
  return (
    <div className='registrarCliente'>
      <Navlogin/>
    <h1 className='title'><b>Registrar cliente</b></h1>
    <form className='container'>
      <div className='row'>
    <div className='col'>
      <label className='tit'><b>Registro datos del cliente</b></label>
      <Entrada
        tituloEntrada='CI' 
        tipo='text'
        valor={ci}
        contenido='Escriba aqui el número CI del cliente'
        cambio={manejarCi}
        
        mostrarAlerta={errorCI}
       mensajeAlerta={mensajeErrorCI}
      />
      <Entrada
       tituloEntrada='Nombre'
       tipo='text'
       valor={nombre}
       contenido='Escriba aqui el nombre del cliente'
       cambio={manejarNombre}
       
       mostrarAlerta={errorNombre}
       mensajeAlerta={mensajeErrorNombre}
      />
      <Entrada
       tituloEntrada='Apellidos'
       tipo='text'
       valor={apellido}
       contenido='Escriba aqui los apellidos del cliente'
       cambio={manejarApellido}
       //capturar={(e)=>onValidateApellidos()}
       mostrarAlerta={errorApellidos}
       mensajeAlerta={mensajeErrorApellidos}
      />
      <Entrada
       tituloEntrada='Correo'
       tipo='email'
       valor={correo}
       contenido='Escriba aqui el correo del cliente'
       cambio={manejarCorreo}
       //capturar={(e)=>onValidateCorreo()}
       mostrarAlerta={errorCorreo}
       mensajeAlerta={mensajeErrorCorreo}
      />
      <Entrada
      tituloEntrada='Celular'
      tipo='tel'
      valor={celular}
      contenido='Escriba aqui el número celular del cliente'
      cambio={manejarCelular}
      //capturar={(e)=>onValidateCelular()}
      mostrarAlerta={errorCelular}
      mensajeAlerta={mensajeErrorCelular}
      //formato='[0-8]{3}-[2-9]{4}'
      />
    </div>
    <div className='col'>
    <label className='tit'> <b>Registro datos respecto a la reserva</b></label>
    <Entrada
    tituloEntrada='Aparcamiento asignado'
    tipo='text'
    valor={lugar}
    contenido='Escriba aqui el aparcamiento asignado del cliente'
    cambio={manejarLugar}
    //capturar={(e)=>onValidateLugar()}
    mostrarAlerta={errorLugar}
    mensajeAlerta={mensajeErrorLugar} 
    />
    <Entrada
    tituloEntrada='Cantidad de meses'
    tipo='number'
    valor={cantidadMeses}
    cambio={manejarCantidadMeses}
    min={1}
    max={12}
    //capturar={(e)=>onValidateCantidadMeses()}
    mostrarAlerta={errorCantidadMeses}
    mensajeAlerta={mensajeErrorCantidadMeses}
    />
    </div> 
    <div className='col'>
    <label className='tit'> <b>Registro vehiculos del cliente</b></label> <br/>
    <div className='botonAgregarVehiculo'>
    <button className='agregarVehiculo' onClick={(e)=>abrirModal(e)}>Añadir Vehiculo</button>
    </div>
    
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Matrícula</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(elemento=>(
          <tr>
            <td>{elemento.marca}</td>
            <td>{elemento.matricula}</td>
            <td><button className="btn btn-warning botonModalEliminar" onClick={(e)=>seleccionarAuto(e,elemento, 'Editar')}><i className="bi bi-pencil-fill"></i></button> {"   "} 
              <button className="btn btn-danger botonModalEliminar" onClick={(e)=>seleccionarAuto(e,elemento, 'Eliminar')}><i className="bi bi-trash-fill"></i></button></td>
          </tr>
        ))}
      </tbody>
    </table>
    { listaAuto &&<div className='alert alert-danger p-1' >
        {mensajeListaAuto}
       </div>}
    </div>
    </div>
    </form>
    <div className='row'>
      <div className='botones'>
      <button className='re' type='submit' onClick={registrarCliente}>Registrar</button>
      <button className='can' onClick={(e)=>cancelarRegistroCliente(e)}>Cancelar</button>
      </div>
    </div>
    <Footers/>

    
    <Modal isOpen={stateInsertar} >
        <div className='headerModal'>
        <ModalHeader>
          <p  className='tituloModal'>Registro de vehículos</p>
        </ModalHeader>
        </div>
        <form>
        <ModalBody>
        
          
            <FormInput key={inputs[0].id} 
            {...inputs[0]} value={values[inputs[0].name]} 
            onChange={onChange} />
            <label>{inputs[1].label}</label><br/>
            <div className='select'>
              <select name='tipo' id='format' onChange={captureType}>
                <option selected disabled value=''>Seleccione el tipo de vehículo</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
              </select>
            </div>
            <FormInput key={inputs[2].id} 
            {...inputs[2]} value={values[inputs[2].name]} 
            onChange={onChange} />
            <FormInput key={inputs[3].id} 
            {...inputs[3]} value={values[inputs[3].name]} 
            onChange={onChange} />
          
        </ModalBody>
        <div className='footerModal'>
        <ModalFooter>
          <div>
            <Button className='botonesModal' botonModal onClick={insertarVehiculo} style={{
              ...StyleSheet.buttonModal,
              boder:'none'
            }}>Registrar</Button>
            </div>
            <Button className='botonesModal' botonModal onClick={
              ()=>setStateInsertar(!stateInsertar)} style={{
              ...StyleSheet.buttonModal,
              boder:'none'
            }}>Cancelar</Button>
        </ModalFooter>
        </div>
        </form>
      </Modal>
      <Modal isOpen={modalEditar} >
        <div className='headerModal'>
        <ModalHeader>
          <p  className='tituloModal'>Editar Vehículo</p>
        </ModalHeader>
        </div>
        <form>
        <ModalBody>
          <FormInput key={inputs[0].id} 
            {...inputs[0]} name="matricula" value={values&&values.matricula} 
            onChange={onChange} />
          <label>{inputs[1].label}</label><br/>
          <div className='select'>
              <select name='tipo' id='format' onChange={captureType}>
                <option selected disabled value={values&&values.tipo}>{values&&values.tipo}</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
              </select>
            </div>
          <FormInput key={inputs[2].id} 
            {...inputs[2]} name="marca" value={values&&values.marca} 
            onChange={onChange} />
          <FormInput key={inputs[3].id} 
            {...inputs[3]} value={values&&values.soat} 
            onChange={onChange} />
        </ModalBody>
        <div className='footerModal'>
        <ModalFooter>
          <div className='botonesModalAlinear'>
            <Button className='botonesModal' onClick={editar} style={{
              ...StyleSheet.buttonModal,
              border:'none',
            }}>Registrar</Button>
            </div>
            <Button className='botonesModal' onClick={
              ()=>cerrarModalEditarCancelar()} style={{
              ...StyleSheet.buttonModal,
              border:'none',
            }}>Cancelar</Button>
        </ModalFooter>
        </div>
        </form>
      </Modal>
      <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás Seguro que deseas eliminar el auto?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger botonModalEliminar" onClick={eliminar}>
            Sí
          </button>
          <button
            className="btn btn-secondary botonModalEliminar"
            onClick={()=>setModalEliminar(!modalEliminar)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default RegistrarCliente;