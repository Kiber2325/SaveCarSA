import React, { useEffect, useState } from "react";
// import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../../conexion/firebase";
import SitioReserva from "./SitioReservaMensual";
import './ReservaMensual.css';
import Navlading from "../landingPage/Navlading";
import Footers from "../Footer/Footer";
const ReservaMensualCliente = () => {
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
            <SitioReserva nombre={sitio.nombre} estado={sitio.estado} color={sitio.color}/>
          ))}
          </div>
        </div>
        <div className="botonesReservaCliente">
        <Link to='/' className="volverLanding">Volver</Link>
        </div> 
        <Footers/>
      </div>
    );
}

export default ReservaMensualCliente