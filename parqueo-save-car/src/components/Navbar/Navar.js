import React from 'react'
import "./estilos.css"
import logo from '../../Images/logo.png'
function Navar  ()  {
  return (
    <nav class="navbar">
    
    <section>
        <div>
        <a href='/'>
            <img className="image" src={logo} alt="logo"></img>
        </a>
        </div>
     </section>  
   
  </nav>
  )
}

export default Navar;