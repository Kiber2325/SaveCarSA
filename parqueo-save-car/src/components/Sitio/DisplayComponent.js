import React from 'react'
import './DisplayComponent.css'
function DisplayComponent(props) {
  const h = () => {
     if(props.time.h === 0){
       return '';
     }else {
       return <span>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>;
     }
  }
  return (
    <div className='tiempoUso'>
       <h6 className='time'>&nbsp;Tiempo :</h6>
       <p className='time'>
       {h()}&nbsp;&nbsp;
       <>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</>&nbsp;:&nbsp;
       <>{(props.time.m >= 10)? props.time.m : "0"+ props.time.m}</>&nbsp;:&nbsp;
       <>{(props.time.s >= 10)? props.time.s : "0"+ props.time.s}</>
       </p>
    </div>
  );
}

export default DisplayComponent;