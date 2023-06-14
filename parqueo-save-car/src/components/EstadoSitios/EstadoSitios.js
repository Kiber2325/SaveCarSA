import React, { useEffect, useState } from 'react';
import Navlogin from '../Login/Navlogin';
import Footers from '../Footer/Footer';
import EstadoSitioIndividual from './EstadoSitioIndividual';
import { onValue, ref } from 'firebase/database';
import { database } from '../../conexion/firebase';

const EstadoSitios = () => {
  const [dataArr, setDataArr] = useState([]);
  const [dataReserva, setDataReserva] = useState([]);

  useEffect(() => {
    getData();
    getDataReserva();
  }, []);

  function getData() {
    onValue(ref(database, "sitiosAutos"), (snapshot) => {
      const dataObj = snapshot.val();
      if (dataObj) {
        const dataArr = Object.values(dataObj);
        setDataArr(dataArr);
      } else {
        setDataArr([]);
      }
    });
  }

  function getDataReserva() {
    onValue(ref(database, "reservas"), (snapshot) => {
      const dataObj = snapshot.val();
      if (dataObj) {
        const dataReserva = Object.values(dataObj);
        setDataReserva(dataReserva);
      } else {
        setDataReserva([]);
      }
    });
  }

  const horariosReserva = (sitioDesignado) => {
    let dataReservaFiltrada = dataReserva.filter((datRes) => (datRes.nombreSitio === sitioDesignado));
    return dataReservaFiltrada;
  };

  return (
    <div>
      <Navlogin/>
      <div>
        <h2 className="titu">Estado de los sitios del Parqueo</h2>
        <div className="color-palette">
          <div className="color" style={{ backgroundColor: '#00FF38' }}>Disponible</div>
          <div className="color" style={{ backgroundColor: '#0050C8' }}>Ocupado</div>
          <div className="color" style={{ backgroundColor: '#BC0000' }}>Deshabilitado</div>
          <div className="color" style={{ backgroundColor: '#FC6901' }}>ReservadoDia</div>
          <div className="color" style={{ backgroundColor: '#808080' }}>ReservadoMes</div>
        </div>
        <div className='cuerpo'>
          {dataArr.map((sitio) => (
            <EstadoSitioIndividual
              key={sitio.nombre} // Agrega una clave única (por ejemplo, sitio.nombre) para cada elemento en el mapeo
              nombre={sitio.nombre}
              estado={sitio.estado}
              color={sitio.color}
              timeIni={sitio.horaIni}
              timeFin={sitio.horaFin}
              dateIni={sitio.fechaIni}
              dateFin={sitio.fechaFin}
              periodo={sitio.periodo}
              horarioReserva={horariosReserva(sitio.nombre)}
            />
          ))}
        </div>
      </div>
      <Footers/>
    </div>
  );
};

export default EstadoSitios;
