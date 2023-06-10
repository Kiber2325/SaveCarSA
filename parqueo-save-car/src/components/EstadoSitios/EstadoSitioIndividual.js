import React, { useEffect, useState } from 'react'

const EstadoSitioIndividual = (props) => {
    const [color, setColor] = useState(props.color);
    const [estadoSitio, setEstadoSitio] = useState(props.estado);
    const [currentTime, setCurrentTime] = useState(new Date());
    const reservas = props.horarioReserva;
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
          let hora = new Date();
          let horas = hora.getHours();
          if (horas < 10) {
            horas = "0" + horas;
          }
          let minutos = hora.getMinutes();
          if (minutos < 10) {
            minutos = "0" + hora.getMinutes();
          }
          let horaAct = horas + ":" + minutos + ":" + hora.getSeconds();
          let mes = hora.getMonth() + 1;
          if (mes < 10) {
            mes = "0" + mes;
          }
          let day = hora.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          let fechaAct = hora.getFullYear() + "-" + mes + "-" + day;
          let arregloFiltrado=reservas.filter((reser)=>(fechaAct >= reser.fechaIni &&
            fechaAct <= reser.fechaFin))
            //console.log(arregloFiltrado)
          //let filtradoHora=arregloFiltrado.filter((reser)=>((horaAct<reser.horaFin)))
          //console.log(filtradoHora)
          //console.log(reservas)
          if(arregloFiltrado.length!==0){
            let encontrado=false
            for(let i=0;i<arregloFiltrado.length&&encontrado===false;i++){
              //console.log(arregloFiltrado[i].horaIni)
              if(arregloFiltrado[i].horaIni>arregloFiltrado[i].horaFin){
                //console.log('ehh')
                if(horaAct>=arregloFiltrado[i].horaIni||horaAct<=arregloFiltrado[i].horaFin){
                  setColor(arregloFiltrado[i].color)
                  setEstadoSitio(arregloFiltrado[i].estado)
                  encontrado=true
                }else{
                  setColor('#00FF38')
                  setEstadoSitio('disponible')
                }
              }else if(arregloFiltrado[i].horaIni<arregloFiltrado[i].horaFin){
                //console.log('ehh')
                if(horaAct>=arregloFiltrado[i].horaIni&&horaAct<=arregloFiltrado[i].horaFin){
                  setColor(arregloFiltrado[i].color)
                  setEstadoSitio(arregloFiltrado[i].estado)
                  encontrado=true
                }else{
                  setColor('#00FF38')
                  setEstadoSitio('disponible')
                }
              }
            }
          }else{
            //console.log('#00FF38')
          }/*
          if(filtradoHora.length===0){
            setColor('#00FF38')
            setEstadoSitio('disponible')
          }else{
            setColor(filtradoHora[0].color)
            setEstadoSitio(filtradoHora[0].estado)
          }*/
          if(props.estado==='deshabilitado'){
            setEstadoSitio(props.estado)
            setColor(props.color)
          }
        }, 1000); // Actualizar la hora cada segundo
    
        return () => {
          clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
        };
      }, [
        color,
        props.color,
        props.periodo,reservas,props.estado
      ]);
  return (
    <div>
        {<div
        className="sitio"
        //onClick={cambiarEstado}
        style={{ backgroundColor: color }}
      >
        <h2>{props.nombre}</h2>
        <p className="texto">
          {//props.estado} {props.periodo
          }
          {estadoSitio}
        </p>
        {false && currentTime}
      </div>}
    </div>
  )
}

export default EstadoSitioIndividual