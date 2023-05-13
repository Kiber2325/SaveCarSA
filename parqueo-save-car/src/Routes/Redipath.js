import {BrowserRouter, Route, Routes  } from "react-router-dom";
import LadingPage from "../components/landingPage/LadingPage";
import Iniciosesion from "../components/Login/Iniciosesion";
import Home from "../components/homePage/Home";

import FormGuardia from "../components/FormGuardia/formGuardia";
import RegistrarCliente from "../components/RegistrarCliente/RegistrarCliente";
import ConfiguracionEstacionamiento from "../components/ConfiguracionParqueo/ConfiguracionEstacionamiento";
import ConfiguracionAuto from "../components/ConfiguracionParqueo/ConfiguracionAutos/ConfiguracionAuto";
import ConfiguracionMoto from "../components/ConfiguracionParqueo/ConfiguracionMotos/ConfiguracionMoto";
import SitiosAutos from "../components/SitiosAutos/SitiosAutos";
import Clientes from "../components/Clientes/Clientes";
import IngresosAnio from "../components/IngresosReportes/IngresosAnio";
import ReservasCliente from "../components/ReservasClientes/ReservasCliente";
import Comprobante from "../components/QRCodigo/Comprobante";

import Consultas from "../components/Consultas/Consultas";
import Quejas from "../components/Quejas/Quejas";


import UsoSitios from "../components/UsoSitios/UsoSitios";

//import ladingPage from "../pages/ladingpage";

const Redipath =() =>{
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LadingPage/>}/>
            <Route path="/Iniciosesion" element={<Iniciosesion/>}/>
            <Route path="/Home*" element={<Home/>}/>

            <Route path="/FormGuardia" element={<FormGuardia/>}/>
            <Route path="/RegistrarCliente" element={<RegistrarCliente/>}/>

            <Route path="/ConfigurarEstacionamiento" element={<ConfiguracionEstacionamiento/>}/>
            <Route path="/ConfigurarAuto" element={<ConfiguracionAuto/>}/>
            <Route path="/ConfigurarMoto" element={<ConfiguracionMoto/>}/>

            <Route path="/Consultas" element={<Consultas/>}/>
            <Route path="/Quejas" element={<Quejas/>}/>


            <Route path="/Clientes" element={<Clientes/>}/>
            <Route path="/ReservasCliente" element={<ReservasCliente/>}/>
            <Route path="/comprobante/:comprobanteId" element={<Comprobante/>}/>


            <Route path="/SitiosAutos" element={<SitiosAutos/>}/>

            <Route path="/Ingresos" element={<IngresosAnio/>}/>
            <Route path="/UsoSitios" element={<UsoSitios/>}/>
        
        </Routes>
    </BrowserRouter>
    );
};

export default Redipath;

/*<Router>
        <Switch>

            <Route exact path="/" component={home}/>
            <Route exact path="/ladingPage" component={ladingPage}/>
            <Route exact path="/iniciosesion" component={iniciosesion}/>
        </Switch>
    </Router> */

