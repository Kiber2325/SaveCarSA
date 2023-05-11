import React, { useState } from 'react'
import "./consultas.css"
import Navlogin from '../Login/Navlogin';
import Footers from '../Footer/Footer';

import { ref, set } from "firebase/database";
import { database } from '../../conexion/firebase';
import { Navigate } from 'react-router-dom';

const Consultas = () => {
    // const navigate=useNavigate()
    
    const [titulo,setTitulo]=useState("");
    const [Consultas,setConsulta]=useState("")

    const guardarConsultas=()=>{
        ref(database, `consultas`);

        let agregarConsulta ={titulo, Consultas}
         set(ref(database, "consultas/"), agregarConsulta);
         Navigate('/Consultas')
        }
    
  return (
    <>
    <Navlogin/>
    
     <div className='container'>
        <div className="consultas">
       
				<p className="titulo" >
				 {titulo}
				</p>
				<p>{Consultas}</p>
	   </div>	

        <div className='formulario'>
        <div className="ConsultaForm">
				<input className="ConsultaInput"

					placeholder="Titulo de la consulta"
					type="text"
					value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    /> <br/>

                    <input className="ConsultaInput"

					placeholder="Respuesta"
					type="text"
					value={Consultas}
                    onChange={(e) => setConsulta(e.target.value)}
                    /> <br/>
				<button 
                     nClick={guardarConsultas}
					className=" btn btn-primary">
					Enviar
				</button>
			</div>
        </div>

		
     </div>

    <Footers/> 
    </>
  )
}

export default Consultas;