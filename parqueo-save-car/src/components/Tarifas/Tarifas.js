import React, { useEffect, useState } from 'react'
import Footers from '../Footer/Footer'
import Navlogin from '../Login/Navlogin'
import "./Tarifas.css"
import {  onValue, ref, remove, set, update } from "firebase/database";
import { database } from '../../conexion/firebase';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const Tarifas = () => {
    const [tarifa,settarifa] =useState("")
    const [monto, setmonto] =useState("") 
    const [dataArr, setDataArr] = useState([]);
    const [modalEditarTarifa,setModalEditarTarifa]=useState(false)
    const [nuevaTarifa,setNuevaTarifa]=useState('')
    const [nuevoMonto,setNuevoMonto]=useState('')
    const [idTarifa,setIdTarifa]=useState('')
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
    const editarTarifa=(id,tarifaEditable,montoEditable)=>{
      setIdTarifa(id)
      setNuevaTarifa(tarifaEditable)
      setNuevoMonto(montoEditable)
      setModalEditarTarifa(true)
    }
    const eliminarTarifa=(id)=>{
      remove(ref(database, `tarifas/${id}`));
    }
    const cerrarModal=()=>{
      setModalEditarTarifa(false)
      borrarValoresNuevos()
    }
    const getNuevaTarifa=(e)=>{
      setNuevaTarifa(e.target.value)
    }
    const getNuevoMonto=(e)=>{
      setNuevoMonto(e.target.value)
    }
    const guardarNuevo=()=>{
      update(ref(database, "tarifas/"+(idTarifa)),{tarifa:nuevaTarifa,monto:nuevoMonto})
      borrarValoresNuevos()
      setModalEditarTarifa(false)
    }
    const borrarValoresNuevos=()=>{
      setNuevaTarifa('')
      setNuevoMonto('')
    }
  return (
    <div>
        <Navlogin/>
          <h2 className='titulo'>Tarifas actuales</h2>
          <div className='general'>
            <div className='tarif'>
             {dataArr.map((cuota)=>(
              <div>               
              <div className='tarifas' key={cuota.id}>
                <p className='infoCuo'>
                    {cuota.tarifa}
                </p>
                <p className='infoCuo'>
                    {cuota.monto} Bs.
                </p>
                <button onClick={()=>editarTarifa(cuota.monto,cuota.tarifa,cuota.monto)}>Editar</button>
                <button onClick={()=>eliminarTarifa(cuota.monto)}>Eliminar</button>
                </div>
                
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
        <Modal isOpen={modalEditarTarifa} centered={true}>
          <ModalHeader>
            <h1>Modal Editar Tarifa</h1>
          </ModalHeader>
          <ModalBody>
            <div className='inputsEditarTarifas'>
                  {<input value={nuevaTarifa} type='text' onChange={getNuevaTarifa} placeholder='Nueva tarifa'/>}
                  {<input value={nuevoMonto} type='number' onChange={getNuevoMonto} placeholder='Nuevo monto'/>}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='btnsModalEditar'>
          <button className='btnModalEditar' onClick={cerrarModal}>Cancelar</button>
            <button className='btnModalEditar' onClick={guardarNuevo}>Guardar</button>
            </div>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default Tarifas
