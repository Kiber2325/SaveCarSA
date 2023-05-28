
import './AutoCompletado.css';
import Autosuggest from 'react-autosuggest';
import { useState } from 'react';
import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../../conexion/firebase';



function AutoCompletado(props) {
      const [dataArr, setDataArr] = useState([]);
  const [cis,setCis]=useState([])
useEffect(() => {
    getData();
  }, []);
function getData() {
    onValue(ref(database, "ingresos"), (snapshot) => {
      const dataObj = snapshot.val();
      const dataArr = Object.values(dataObj);
      setDataArr(dataArr);
      setCis(dataArr)
    });
  }
  const[presidentes, setPresidentes]= useState(cis);
  const[value, setValue]= useState(props.value);
  const[presidenteSeleccionado, setPresidenteSeleccionado]= useState({});
  
  const onSuggestionsFetchRequested=({value})=>{
    setPresidentes(filtrarPresidentes(value));
  }
  
  const filtrarPresidentes=(value)=>{
    const inputValue=value.trim().toLowerCase();
  const inputLength=inputValue.length;
  
    /*var filtrado=data.filter((presidente)=>{
      var textoCompleto=presidente.ciCliente //+ " - " +presidente.pais;
      if(textoCompleto.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(inputValue)){
        return presidente;
      }else{
        return ''
      }
    });*/
    var filtrado2=cis.filter((ciCl)=>{
      var textoCompleto1=ciCl.placaDelAuto //+ " - " +presidente.pais;
      if(textoCompleto1.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(inputValue)){
        return ciCl;
      }else{
        return ''
      }
    })
    console.log(filtrado2)
    return inputLength===0 ? [] : filtrado2;
  }
  
  const onSuggestionsClearRequested = () =>{
    setPresidentes([]);
  }
  
  const getSuggestionValue=(suggestion)=>{
    return `${suggestion.placaDelAuto}`// - ${suggestion.pais}`;
  }
  
  const renderSuggestion=(suggestion)=>(
    <div className='sugerencia' onClick={()=>seleccionarPresidente(suggestion)}>
      {`${suggestion.placaDelAuto}`// - ${suggestion.pais}`
      }
    </div>
  );
  
  const seleccionarPresidente=(presidente)=>{
    setPresidenteSeleccionado(presidente);
  }
  
  const onChange=(e, {newValue})=>{
    setValue(newValue);
    props.cambio(newValue)
  }
  
  const inputProps={
  placeholder:"Placa del auto del cliente",
  value,
  onChange
  };
  
  const eventEnter=(e)=>{
  if(e.key === "Enter"){
    var split = e.target.value.split('-');
    var presidente ={
      presidente: split[0].trim(),
      //pais: split[1].trim(),
    };
    seleccionarPresidente(presidente);
  }
  console.log(presidenteSeleccionado)
  console.log(dataArr)
}

  return (
    <div className="App">
     <Autosuggest 
      suggestions={presidentes}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={eventEnter}
     />
     <br />
    </div>
  );
}

export default AutoCompletado;