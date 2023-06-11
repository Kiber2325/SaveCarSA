import '../../App.css';
import React, { useEffect, useState } from "react";
import { ref, onValue } from 'firebase/database';
import { database } from "../../conexion/firebase";
import Footers from '../Footer/Footer';
import Navlading from '../landingPage/Navlading';

import './AcercaDe.css'


function AcercaDe() {
  const [horarios, setHorarios] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  useEffect(()=>{
      getData()
    },[]);
    function getData() {
      onValue(ref(database, 'tarifas'), (snapshot) => {
        const dataObj = snapshot.val();
        const dataArr = Object.values(dataObj);
        setDataArr(dataArr);
      });
    }
 
  

  useEffect(() => {
    const obtenerHorarios = () => {
      const horariosRef = ref(database, 'horarios');
      onValue(horariosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const horariosArray = Object.values(data).map((horario) => ({
            dia: horario.dia,
            horaInicio: horario.horaInicio,
            horaFin: horario.horaFin,
          }));
          setHorarios(horariosArray);
        }
      });
    };

    obtenerHorarios();
  }, []);

  return (
    <>
     <Navlading/>
        <div className='contenidoAcercaDe'>
        <center>
        <div>
        <center>
        <br></br>
        <h1>Misión</h1>
        </center>
        <h4>Nuestra misión es proporcionar un servicio de estacionamiento confiable, conveniente y seguro para nuestros clientes. Nos comprometemos a garantizar que cada cliente experimente un
           proceso de estacionamiento eficiente y sin complicaciones, brindando comodidad y tranquilidad mientras confían en nosotros para el cuidado de sus vehículos.</h4>

        </div>


        <div>        
          <center>
        <h1>Visión</h1>
        </center>
        <h4>Nuestra visión es convertirnos en el referente y líder indiscutible en la industria de estacionamiento, 
        reconocidos por nuestra excelencia en el servicio, innovación y compromiso con la satisfacción del cliente.</h4>
        </div>


        <div>
        <center>
        <h1>Horarios de Atención</h1>
      
      <table  className="tablaXD">
        <thead>
          <tr>
            <th><h3>Día</h3></th>
            <th><h3>Apertura del parqueo</h3></th>
            <th><h3>Cierre del parqueo</h3></th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td><h4>{horario.dia}</h4></td>
              <td><h5>{horario.horaInicio}</h5></td> 
              <td><h5>{horario.horaFin}</h5> </td>
            </tr>
          ))}
        </tbody>
      </table>
        </center>
        </div>

{/* precio */}
        <div>
          <center>
            <h1>Precios</h1>
            <div className='tarif'>
             {dataArr.map((cuota)=>(
                <div className='tarifas'>
                <b><p className='infoCuo'>
                    {cuota.tarifa}
                </p></b>
                <p className='infoCuo'>
                    {cuota.monto} Bs.
                </p>
                </div>
             ))}
            </div>
          </center>
        </div>
{/* .------------ */}

        <div>
        <center>
        <h1>Sitio Web</h1>
        </center>
        <h4>
        Brindamos la información sobre los lugares disponibles de nuestro parqueo, para que usted pueda hacer su reserva anticipada, brindandole la comodidad y tranquilidad de guardar un sitio para su vehículo
        </h4>
        <br></br>
        </div>
        </center>
        
      </div>
      <div>
        <center>
        <a href='/' className='atras btn' >Atras</a>
        </center>

      </div>
     <Footers/>
  
    </>


  );
}
export default AcercaDe;
