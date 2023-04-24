import React from 'react';

function DisplayComponent(props) {
  const h = () => {
     if(props.time.h === 0){
       return '';
     }else {
       return <span>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>;
     }
  }
  return (
    <div>
       {h()}&nbsp;&nbsp;
       <p>
       <>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</>&nbsp;:&nbsp;
       <>{(props.time.m >= 10)? props.time.m : "0"+ props.time.m}</>
       
       </p>
    </div>
  );
}

export default DisplayComponent;