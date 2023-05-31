import React, { useEffect, useState } from "react";
// import logo from '../../Images/logo.png'
import { Link } from "react-router-dom";
import {  ref, onValue } from "firebase/database";
import { database } from "../../conexion/firebase";
import "./IngresosAnio.css";
import Navlogin from "../Login/Navlogin";
import Footers from "../Footer/Footer";
import Autosuggest from "react-autosuggest";
import AutoCompletado from "../AutoCompletado/AutoCompletado";
/*
const data = [
  {  ciCliente: "15252545" },
  {  ciCliente: "12345678" },
  {  ciCliente: "12345679" },
  {  ciCliente: "12345679" },
  {  ciCliente: "7894561" },
  {  ciCliente: "9856824" },
  {  ciCliente: "65498758" },
  {  ciCliente: "9854856" },
  {  ciCliente: "9874562" },
  {  ciCliente: "7895821" },
]*/
const IngresosAnio = () => {
  /*const data = [
    {  ciCliente: "15252545" },
    {  ciCliente: "12345678" },
    {  ciCliente: "12345679" },
    {  ciCliente: "12345679" },
    {  ciCliente: "7894561" },
    {  ciCliente: "9856824" },
    {  ciCliente: "65498758" },
    {  ciCliente: "9854856" },
    {  ciCliente: "9874562" },
    {  ciCliente: "7895821" },
  ]*/
  const [dataArr, setDataArr] = useState([]);
  const [cis,setCis]=useState([])
  //const [montoTotal,setMontoTotal]=useState(0.0);
  useEffect(() => {
    getData();
  }, []); /*
  useEffect(()=>{
    dataArr.map((ingreso)=>(
      setMontoTotal(montoTotal+ingreso.monto)
  ))
  },[dataArr,montoTotal])*/
  function getData() {
    onValue(ref(database, "ingresos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
      setCis(dataArr)
    });
  }
  const calcularMonto = () => {
    let montoCalculado = 0.0;
    dataArr.map((ingreso) => (montoCalculado = montoCalculado + ingreso.monto));
    return montoCalculado;
  };
  const dias = {
    sun: "domingo",
    mon: "lunes",
    thu: "martes",
    wed: "miércoles",
    tue: "jueves",
    fri: "viernes",
    sat: "sábado",
  };
  const calcularDia = (dia) => {
    let diaAEvaluar = dia[0] + dia[1] + dia[2];
    //console.log(diaAEvaluar);
    if (diaAEvaluar === "Sun") {
      dia = dias.sun;
    } else if (diaAEvaluar === "Mon") {
      dia = dias.mon;
    } else if (diaAEvaluar === "Thu") {
      dia = dias.thu;
    } else if (diaAEvaluar === "Wed") {
      dia = dias.wed;
    } else if (diaAEvaluar === "Tue") {
      dia = dias.tue;
    } else if (diaAEvaluar === "Fri") {
      dia = dias.fri;
    } else if (diaAEvaluar === "Sat") {
      dia = dias.sat;
    }
    return dia;
  };
  //sugerencias
  const[presidentes, setPresidentes]= useState(cis);
const[value, setValue]= useState("");
const[presidenteSeleccionado, setPresidenteSeleccionado]= useState({});

const onSuggestionsFetchRequested=({value})=>{
  setPresidentes(filtrarPresidentes(value));
}

const filtrarPresidentes=(value)=>{
  const inputValue=value.trim().toLowerCase();
const inputLength=inputValue.length;

  /*var filtrado=data.filter((presidente)=>{
    var textoCompleto=presidente.ciCliente //+ " - " +presidente.pais;
    if(textoCompleto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(inputValue)){
      return presidente;
    }else{
      return ''
    }
  });*/
  var filtrado2=cis.filter((ciCl)=>{
    var textoCompleto1=ciCl.ciCliente //+ " - " +presidente.pais;
    if(textoCompleto1.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(inputValue)){
      return ciCl;
    }else{
      return ''
    }
  })
  console.log(filtrado2)
  return inputLength===0 ? [] : filtrado2;
}

const onSuggestionsClearRequested = () =>{
  setPresidentes([]);
}

const getSuggestionValue=(suggestion)=>{
  return `${suggestion.ciCliente}`// - ${suggestion.pais}`;
}

const renderSuggestion=(suggestion)=>(
  <div className='sugerencia' onClick={()=>seleccionarPresidente(suggestion)}>
    {`${suggestion.ciCliente}`// - ${suggestion.pais}`
    }
  </div>
);

const seleccionarPresidente=(presidente)=>{
  setPresidenteSeleccionado(presidente);
}

const onChange=(e, {newValue})=>{
  setValue(newValue);
}

const inputProps={
placeholder:"CI del cliente",
value,
onChange
};

const eventEnter=(e)=>{
if(e.key === "Enter"){
  var split = e.target.value.split('-');
  var presidente ={
    presidente: split[0].trim(),
    //pais: split[1].trim(),
  };
  seleccionarPresidente(presidente);
}
}
  //boton checar
  
  const [placaCl, setPlacaCl]=useState('')
  const [datosFiltrados,setDatosFiltrados]=useState([])
  const [filtrado,setFiltrado]=useState({
    fechaIni:'',
    fechaFin:''
  })
  const handleChange=(e)=>{
    setFiltrado({ ...filtrado, [e.target.name]: e.target.value });
  }
  const obtenerDatosInput = (e) => {
    e.preventDefault()
    //console.log(presidenteSeleccionado)
    let filtradoSepIni=filtrado.fechaIni.split('-')
    console.log(filtrado);
    let anioIni=filtradoSepIni[0]
    let mesIni=filtradoSepIni[1]
    let diaIni=filtradoSepIni[2]
    let filtradoSepFin=filtrado.fechaFin.split('-')
    let anioFin=filtradoSepFin[0]
    let mesFin=filtradoSepFin[1]
    let diaFin=filtradoSepFin[2]
    /*let bigCities = dataArr.filter(city => city.ciCliente === value && city.lugarUsado==='A2'&&(
      city.anio>=anio&&city.mes>=mes&&city.fecha>=dia
    ));*/
    
    let bigCities = dataArr.filter(city => (
      city.anio>=anioIni&&city.mes>=mesIni&&city.fecha>=diaIni
    )&&(city.anio<=anioFin&&city.mes<=mesFin&&city.fecha<=diaFin));
    console.log(bigCities);
    if(value.length!==0){
      bigCities=bigCities.filter(city=>value===city.ciCliente)
    }
    if(placaCl.length!==0){
      bigCities=bigCities.filter(city=>placaCl===city.placaDelAuto)
    }
    console.log(bigCities);
    setDatosFiltrados(bigCities)
    console.log(presidenteSeleccionado)
    console.log(cis)
    console.log(value)
    console.log(placaCl)
  };
  return (
    <div>
      <Navlogin />
      
      <input type="date" value={filtrado.fechaIni} onChange={handleChange} name="fechaIni"/>
      <input type="date" value={filtrado.fechaFin} onChange={handleChange} name="fechaFin"/>
      {<Autosuggest 
      suggestions={presidentes}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={eventEnter}
     />
      }
     { <AutoCompletado
        value={placaCl}
        cambio={setPlacaCl}
     />
     }
      <div>
        <br />
        <button className="btn btn-primary" onClick={obtenerDatosInput}>
          Checar Estado
        </button>
      </div>
      {/*<div className="ingresosDetalle">
        <table class="table table-bordered">
          <thead>
            <tr className="cabeceraClientes">
              <th className="cabeceraTablaClientes" scope="col">
                Año
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Mes
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Fecha
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Día
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                CI
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Celular
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Placa
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Lugar
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Tipo
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((ingreso) => (
              <tr>
                <td className="datoIngreso">{ingreso.anio}</td>
                <td className="datoIngreso">{ingreso.mes}</td>
                <td className="datoIngreso">{ingreso.fecha}</td>
                <td className="datoIngreso">
                  {calcularDia(ingreso.fechaActual)}
                </td>
                <td className="datoIngreso">{ingreso.ciCliente}</td>
                <td className="datoIngreso">{ingreso.celularCliente}</td>
                <td className="datoIngreso">{ingreso.placaDelAuto}</td>
                <td className="datoIngreso">{ingreso.lugarUsado}</td>
                <td className="datoIngreso">{ingreso.tipo}</td>
                <td className="datoIngreso">{ingreso.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>*/}
      <div className="ingresosDetalle">
        <table class="table table-bordered">
          <thead>
            <tr className="cabeceraClientes">
              <th className="cabeceraTablaClientes" scope="col">
                Año
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Mes
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Fecha
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Día
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                CI
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Celular
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Placa
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Lugar
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Tipo
              </th>
              <th className="cabeceraTablaClientes" scope="col">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((ingresoFiltrado) => (
              <tr>
                <td className="datoIngreso">{ingresoFiltrado.anio}</td>
                <td className="datoIngreso">{ingresoFiltrado.mes}</td>
                <td className="datoIngreso">{ingresoFiltrado.fecha}</td>
                <td className="datoIngreso">
                  {calcularDia(ingresoFiltrado.fechaActual)}
                </td>
                <td className="datoIngreso">{ingresoFiltrado.ciCliente}</td>
                <td className="datoIngreso">{ingresoFiltrado.celularCliente}</td>
                <td className="datoIngreso">{ingresoFiltrado.placaDelAuto}</td>
                <td className="datoIngreso">{ingresoFiltrado.lugarUsado}</td>
                <td className="datoIngreso">{ingresoFiltrado.tipo}</td>
                <td className="datoIngreso">{ingresoFiltrado.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="montoTotal">
        <h3>Monto total: {calcularMonto()} Bs.</h3>
      </div>
      <div className="botonesReservaCliente">
        <Link to="/Home" className="volverLanding">
          Volver
        </Link>
      </div>
      <Footers />
    </div>
  );
};

export default IngresosAnio;
