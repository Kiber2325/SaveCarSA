import React, { useEffect, useState } from "react";
// import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../../conexion/firebase";
import SitioReserva from "./SitioReserva";
import './ReservasCliente.css';
import Navlading from "../landingPage/Navlading";
const ReservasCliente = () => {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    onValue(ref(database, "sitiosAutos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
    });
  }
  return (
    <div>
      <Navlading/>
      <div>
        <h2 className="titu">Sitios Disponobles</h2>
      <div className="color-palette">
        <div className="color" style={{ backgroundColor: '#00FF38' }}>Disponoble</div>
        <div className="color" style={{ backgroundColor: '#0050C8' }}>Ocupado</div>
        <div className="color" style={{ backgroundColor: '#BC0000' }}>Deshabilitado</div>
        <div className="color" style={{ backgroundColor: '#FC6901' }}>Reservado</div>
      </div>

        <div className="cuerpo">
        {dataArr.map((sitio) => (
          <SitioReserva nombre={sitio.nombre} estado={sitio.estado} color={sitio.color}/>
        ))}
        </div>
      </div>
      <div className="botonesReservaCliente">
      <Link to='/' className="volverLanding">Volver</Link>
      </div> 
      <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  );
};

export default ReservasCliente;
