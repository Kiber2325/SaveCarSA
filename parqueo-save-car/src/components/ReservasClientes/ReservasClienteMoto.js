import React, { useEffect, useState } from "react";
// import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../../conexion/firebase";
import './ReservasCliente.css';
import Navlading from "../landingPage/Navlading";
import Footers from "../Footer/Footer";
import SitioRerservaMoto from "./SitioRerservaMoto";
const ReservasClienteMoto = () => {
  const [dataArr, setDataArr] = useState([]);
  const [dataReserva, setDataReserva] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    onValue(ref(database, "sitiosMotos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
    });
  }
  useEffect(() => {
    getDataReserva();
  }, []);
  function getDataReserva() {
    onValue(ref(database, "reservasMotos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataReserva = Object.values(dataObj);
      setDataReserva(dataReserva);
    });
  }
  const horariosReserva=(sitioDesignado)=>{
    let dataReservaFiltrada=dataReserva.filter((datRes)=>(datRes.nombreSitio===sitioDesignado))
    return dataReservaFiltrada
  }
  return (
    <div>
      <Navlading/>
      <div>
        <h2 className="titu">Sitios Disponibles</h2>
      <div className="color-palette">
        <div className="color" style={{ backgroundColor: '#00FF38' }}>Disponible</div>
        <div className="color" style={{ backgroundColor: '#0050C8' }}>Ocupado</div>
        <div className="color" style={{ backgroundColor: '#BC0000' }}>Deshabilitado</div>
        <div className="color" style={{ backgroundColor: '#FC6901' }}>ReservadoDia</div>
        <div className="color" style={{ backgroundColor: '#808080' }}>ReservadoMes</div>
      </div>

        <div className="cuerpo">
        {dataArr.map((sitio) => (
          <SitioRerservaMoto nombre={sitio.nombre} estado={sitio.estado} color={sitio.color} 
          timeIni={sitio.horaIni} timeFin={sitio.horaFin} dateIni={sitio.fechaIni} dateFin={sitio.fechaFin} periodo={sitio.periodo}
          horarioReserva={horariosReserva(sitio.nombre)}/>
        ))}
        </div>
      </div>
      <div className="botonesReservaCliente">
      <Link to='/AutosMotos' className="volverLanding">Volver</Link>
      </div> 
      <Footers/>
    </div>
  );
};

export default ReservasClienteMoto;
