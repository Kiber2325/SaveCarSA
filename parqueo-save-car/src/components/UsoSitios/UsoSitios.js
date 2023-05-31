import React, { useEffect, useState } from "react";
import "./UsoSitios.css";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../../conexion/firebase";
import Navlogin from "../Login/Navlogin";
const UsoSitios = () => {
  const [dataArr, setDataArr] = useState([]);
  const [dataSitios, setDataSitios] = useState([]);
  const [filtrado, setFiltrado] = useState({
    fechaIni: "",
    fechaFin: "",
  });
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const meses=[31,28,31,30,31,30,31,31,30,31,30,31]
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getDataSitios();
  }, []);
  function getData() {
    onValue(ref(database, "tiempoUso"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
    });
  }
  function getDataSitios() {
    onValue(ref(database, "sitiosAutos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataSitios = Object.values(dataObj);
      setDataSitios(dataSitios);
    });
  }  /*const calcularUso = (horas, minutos, segundos) => {
    let horasUs = horas;
    let minutosUs = minutos;
    let segundosUs = segundos;
    let usoPorcentaje =
      (100 * (horasUs * 3600 + minutosUs * 60 + segundosUs)) / 86400;
    return usoPorcentaje;
  };*/
  const handleChange = (e) => {
    setFiltrado({ ...filtrado, [e.target.name]: e.target.value });
  };
  const obtenerDatosInput = (e) => {
    e.preventDefault();
    //console.log(presidenteSeleccionado)
    /*let bigCities = dataArr.filter(city => city.ciCliente === value && city.lugarUsado==='A2'&&(
      city.anio>=anio&&city.mes>=mes&&city.fecha>=dia
    ));*/
    
    let tiemposFiltrado = dataArr.filter(
      (city) =>
        filtrado.fechaIni <= city.fecha && filtrado.fechaFin >= city.fecha
    );
    //setDatosFiltrados(tiemposFiltrado);
    let datosFinales=[]
    for(let i=0;i<dataSitios.length;i++){
      let nombreSitio=dataSitios[i].nombre
      let dias=calcularCantidadDias(filtrado.fechaIni,filtrado.fechaFin)
      let tiempoTotal=dias*84600
      let tiempoUsadoSitio=calcularTiempoUso(nombreSitio,tiemposFiltrado)

      let datoFiltrado={
        nombreSitio:nombreSitio,
        cantidadDias:dias,
        tiempoUsado:((tiempoUsadoSitio*100.0)/tiempoTotal)
      }
      datosFinales.push(datoFiltrado)
    }
    console.log(datosFinales)
    setDatosFiltrados(datosFinales)
  };
  const calcularCantidadDias=(fechaInicio,fechaFinal)=>{
    let cantidadDias=0
    let fechaInicioDividido=fechaInicio.split('-')
    let fechaFinalDividido=fechaFinal.split('-')
    let anioIni=parseInt(fechaInicioDividido[0]);let mesIni=parseInt(fechaInicioDividido[1]);let diaIni=parseInt(fechaInicioDividido[2]);
    let anioFin=parseInt(fechaFinalDividido[0]);let mesFin=parseInt(fechaFinalDividido[1]);let diaFin=parseInt(fechaFinalDividido[2]);
    if(anioIni===anioFin){
      if(mesIni===mesFin){
        cantidadDias=diaFin-diaIni
      }else if(mesIni<mesFin){
        let restaIni=meses[mesIni-1]-diaIni
        cantidadDias=restaIni+diaFin
      }
    }/*if(anioIni<anioFin){
      let restaIni=meses[mesIni-1]-diaIni
      cantidadDias=restaIni+diaFin
    }*/
    return cantidadDias+1
  }
  const calcularTiempoUso=(sitio,dataFil)=>{
    let tiempoTotal=0
    let dataFil2=dataFil.filter((datFil)=>(datFil.sitioUsado===sitio))
    dataFil2.map((datFil2)=>(tiempoTotal=tiempoTotal+datFil2.segundosUsados+datFil2.minutosUsados*60+datFil2.horasUsadas*3600))
    return tiempoTotal
  }
  return (
    <div>
      <Navlogin />

      <input
        type="date"
        value={filtrado.fechaIni}
        onChange={handleChange}
        name="fechaIni"
      />
      <input
        type="date"
        value={filtrado.fechaFin}
        onChange={handleChange}
        name="fechaFin"
      />
      <div>
        <br />
        <button className="btn btn-primary" onClick={obtenerDatosInput}>
          Checar Estado
        </button>
      </div>
      <div className="tiempoDetalle">
        <table class="table table-bordered ">
          <thead>
            <tr className="cabeceraTiempo">
              <th className="cabeceraTiempoSitio" scope="col">
                Sitio
              </th>
              <th className="cabeceraTiempoSitio" scope="col">
                Días
              </th>
              <th className="cabeceraTiempoSitio" scope="col">
                Tiempo de ocupación
              </th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((uso) => (
              <tr>
                <td className="datoIngreso">{uso.nombreSitio}</td>
                <td className="datoIngreso">{uso.cantidadDias}</td>
                <td className="datoIngreso">
                  {uso.tiempoUsado} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="botonesReservaCliente">
        <Link to="/Home" className="volverLanding">
          Volver
        </Link>
      </div>
      <div className="footerReg">
        <p id="cont">Contactos</p>
      </div>
    </div>
  );
};

export default UsoSitios;
