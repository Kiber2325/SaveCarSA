import React from "react";
import "./Horarios.css";
import Navlogin from "../Login/Navlogin";
import Footers from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const Horarios = () => {
    const navigate=useNavigate()
    const guardarHorarios=(e)=>{
        e.preventDefault()
        navigate('/ConfigurarEstacionamiento')
    }
  return (
    <div>
      <Navlogin />
      <div className="generalHorarios">
        <div className="tituloHorarios">
          <h2>Horarios</h2>
        </div>
        <div>
          <div>
            <div className="tituloHora">
              <p>Lunes</p>
            </div>
            <div className="definirHoras">
                <input type="time" className="timeInput" />
                <input type="time" className="timeInput" />
            </div>
          </div>
          <div>
            <div className="tituloHora">
              <p>Martes</p>
            </div>
            <div className="definirHoras">
                <input type="time" className="timeInput" />
                <input type="time" className="timeInput" />
            </div>
          </div>
          <div>
            <div className="tituloHora">
              <p>Miércoles</p>
            </div>
            <div className="definirHoras">
                <input type="time" className="timeInput" />
                <input type="time" className="timeInput" />
            </div>
          </div>
          <div>
            <div className="tituloHora">
              <p>Jueves</p>
            </div>
            <div className="definirHoras">
                <input type="time" className="timeInput" />
                <input type="time" className="timeInput" />
            </div>
          </div>
          <div>
            <div className="tituloHora">
              <p>Viernes</p>
            </div>
            <div className="definirHoras">
                <input type="time" className="timeInput" />
                <input type="time" className="timeInput" />
            </div>
          </div>
        </div>
      </div>
      <div className="botonesHorarios">
        <Link className="canHor" to='/ConfigurarEstacionamiento'>Cancelar</Link>
        <button className="guaHor" onClick={guardarHorarios}>Guardar</button>
      </div>
      <Footers />
    </div>
  );
};

export default Horarios;
