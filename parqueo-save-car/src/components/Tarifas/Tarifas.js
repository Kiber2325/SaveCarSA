import React, { useEffect, useState } from 'react'
import Footers from '../Footer/Footer'
import Navlogin from '../Login/Navlogin'
import "./Tarifas.css"
import {  onValue, ref, set } from "firebase/database";
import { database } from '../../conexion/firebase';
import { Link } from 'react-router-dom';


const Tarifas = () => {
    const [tarifa,settarifa] =useState("")
    const [monto, setmonto] =useState("") 
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
    const gettarifa =(e) =>{
        settarifa(e.target.value)
    }
    const getmonto =(e) =>{
        setmonto(e.target.value)
    }
    const guardar = ()=>{
        //console.log(tarifa+monto)
        let dinero={
            tarifa:tarifa,monto:monto
        }
        //console.log(dinero)
        set(ref(database, "tarifas/"+(monto)), dinero);
    }
  return (
    <div>
        <Navlogin/>
          <h2 className='titulo'>Tarifas actuales</h2>
          <div className='general'>
            <div className='tarif'>
             {dataArr.map((cuota)=>(
                <div className='tarifas'>
                <p className='infoCuo'>
                    {cuota.tarifa}
                </p>
                <p className='infoCuo'>
                    {cuota.monto} Bs.
                </p>
                </div>
             ))}
            </div>
            <div className='anadir'>
                <input className='an' onChange={gettarifa} placeholder='Escriba aqui la Tarifa que desea añadir' type="text"/> <br></br>
                <input className='an' onChange={getmonto} placeholder='Escriba aqui el monto de la Tarifa' type="number" min={1} max={1000} /> <br></br>
                <button className='botonConfigurar' onClick={guardar} >Añadir</button> 
            </div>
          </div>
          <div className="botonesHorarios">
        <Link className="canHor" to='/ConfigurarEstacionamiento'>Volver</Link>
      </div>
        <Footers/>
    </div>
  )
}

export default Tarifas
