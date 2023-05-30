import React, { useState, useEffect } from "react";
import "./Horarios.css";
import { update, ref, onValue } from 'firebase/database';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Navlogin from "../Login/Navlogin";
import Footers from "../Footer/Footer";
import { database } from "../../conexion/firebase";

const Horarios = () => {
  const [horarios, setHorarios] = useState([
    { dia: "Lunes", horaInicio: "", horaFin: "" },
    { dia: "Martes", horaInicio: "", horaFin: "" },
    { dia: "Miércoles", horaInicio: "", horaFin: "" },
    { dia: "Jueves", horaInicio: "", horaFin: "" },
    { dia: "Viernes", horaInicio: "", horaFin: "" },
    { dia: "Sábado", horaInicio: "", horaFin: "" },
    { dia: "Domingo", horaInicio: "", horaFin: "" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const horariosRef = ref(database, "horarios");
    onValue(horariosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const updatedHorarios = horarios.map((horario, index) => ({
          ...horario,
          horaInicio: data[index + 1].horaInicio,
          horaFin: data[index + 1].horaFin,
        }));
        setHorarios(updatedHorarios);
      }
    });
  }, [horarios]);

  const guardarHorarios = (e) => {
    e.preventDefault();

    const horariosData = horarios.reduce((data, horario, index) => {
      data[index + 1] = {
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      };
      return data;
    }, {});

    update(ref(database, "horarios"), horariosData);

    Swal.fire({
      title: 'Éxito',
      text: 'Enviado exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    navigate('/ConfigurarEstacionamiento');
  };

  const handleHorarioChange = (index, field, value) => {
    setHorarios(prevHorarios => {
      const updatedHorarios = [...prevHorarios];
      updatedHorarios[index][field] = value;
      return updatedHorarios;
    });
  };

  return (
    <div>
      <Navlogin />

      <div className="generalHorarios">
        <div className="titu">
          <h2>Horarios</h2>
        </div>

        <div>
          {horarios.map((horario, index) => (
            <div key={index}>
              <div className="tituloHora">
                <p>{horario.dia}</p>
              </div>
              <div className="definirHoras">
                <input
                  type="time"
                  className="timeInput"
                  value={horario.horaInicio}
                  onChange={(e) =>
                    handleHorarioChange(index, "horaInicio", e.target.value)
                  }
                />
                <input
                  type="time"
                  className="timeInput"
                  value={horario.horaFin}
                  onChange={(e) =>
                    handleHorarioChange(index, "horaFin", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="botonesHorarios">
        <Link className="canHor" to="/ConfigurarEstacionamiento">
          Cancelar
        </Link>
        <button className="guaHor" onClick={guardarHorarios}>
          Guardar
        </button>
      </div>
      <Footers />
    </div>
  );
};

export default Horarios;
