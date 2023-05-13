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
      <div className="cuerpo">
        {dataArr.map((sitio) => (
          <SitioReserva nombre={sitio.nombre} estado={sitio.estado} color={sitio.color}/>
        ))}
      </div>
      <div className="botonesReservaCliente">
      <Link to='/' className="volverLanding">Volver</Link>
      </div> 
      <div className='footerReg'><p id='cont'>Contactos</p></div>
    </div>
  );
};

export default ReservasCliente;
