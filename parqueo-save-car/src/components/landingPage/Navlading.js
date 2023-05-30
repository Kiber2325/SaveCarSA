//import React, {useState}  from "react";
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';


//import{Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import '../landingPage/lading.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { useState } from "react";
const Navlading = () => {
    const [dropdown, setDropdown] = useState (false);
    
    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown);
    }

  return (
    <div>

      <header className="Encabezado">
    
      <section>
            <div>
            <Link to="/">
                <img className="image" src={logo} alt="logo"/>
            </Link>
            </div>
        </section>

        <section className="navegar">
            <div className="d-flex justify-content-end">
        
  
            <div>
            <Link to='/Anuncios' class="btn btn-link"><i class="fa-regular fa-bell fa-shake"></i></Link>
            </div> 
            
            <div>
            <Link to='/' class="btn btn-link">Inicio</Link>
            </div>

            <div>
            
            <Link to='/ReservasCliente' class="btn btn-link">Sitios Disponibles</Link>
            </div>
            <div>
            
            <Link to='/Iniciosesion' class="btn btn-link">Iniciar Sesión</Link>
            
            </div>
            <div>
                <Dropdown isOpen ={dropdown} toggle={abrirCerrarDropdown}>
                    <DropdownToggle caret className="btndesplegable">
                    Ayuda
                    </DropdownToggle>
                    <DropdownMenu className="menuops">
                        <DropdownItem className="op1"><Link to='/Consultas' class="btn btn-link">consultas</Link></DropdownItem>
                        <DropdownItem className="op2"><Link to='/Observaciones' class="btn btn-link">Observaciones</Link></DropdownItem>
                        <DropdownItem className="op2"><Link to='/Nosotros' class="btn btn-link">Sobre Nosotros</Link></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {/* <div>
            
            <Link to='/Solicitud' class="btn btn-link">Solicitar</Link>
            
            </div> */}
            
            </div>

        </section>        
        </header>
    </div>
  );
}
/*Menú de reserva
            <div>
                <Dropdown isOpen ={dropdown} toggle={abrirCerrarDropdown}>
                    <DropdownToggle caret className="btndesplegable">
                    Reserva
                    </DropdownToggle>
                    <DropdownMenu className="menuops">
                        <DropdownItem className="op1">POR HORA</DropdownItem>
                        <DropdownItem className="op2">MENSUAL</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>*/
/*<a className="inicio" href="/iniciosesion">Iniciar Sesión</a> */
export default Navlading;