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
import QuejasAdmin from "../components/QuejasAdmin/QuejasAdmin";
import ConsultasAdmin from "../components/ConsultasAdmin/ConsultasAdmin";
import HomeGuardia from "../components/HomeGuardia/HomeGuardia";
import Anuncio from "../components/Anuncios/Anuncio";
import Anuncios from "../components/AnunciosAdmin/Anuncios";
import Tarifas from "../components/Tarifas/Tarifas";
import Horarios from "../components/Horarios/Horarios";
import Solicitud from "../components/Solicitud/Solicitud";
import Solicitudes from "../components/Solicitud/Solicitudes/Solicitudes";
import ReservaMensualCliente from "../components/ReservaMensualCliente/ReservaMensualCliente";
import AcercaDe from "../components/AcercaDeNosotros/acercaDe";
import SitiosMotos from "../components/SitiosMotos/SitiosMotos";
import EstadoSitios from "../components/EstadoSitios/EstadoSitios";
import AutosMotos from "../components/SitioAutosMotos/AutosMotos";
import EstadoSitiosMotos from "../components/EstadoSitios/EstadoSitiosMotos";
import AutosMotosAdmin from "../components/EstadoSitios/AutosMotosAdmin";


//import ladingPage from "../pages/ladingpage";

const Redipath =() =>{
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LadingPage/>}/>
            <Route path="/Iniciosesion" element={<Iniciosesion/>}/>
            <Route path="/Home*" element={<Home/>}/>
            <Route path="/HomeGuardia*" element={<HomeGuardia/>}/>
            <Route path="/AutosMotos" element={<AutosMotos/>}/>

            <Route path="/FormGuardia" element={<FormGuardia/>}/>
            <Route path="/RegistrarCliente" element={<RegistrarCliente/>}/>

            <Route path="/ConfigurarEstacionamiento" element={<ConfiguracionEstacionamiento/>}/>
            <Route path="/ConfigurarAuto" element={<ConfiguracionAuto/>}/>
            <Route path="/ConfigurarMoto" element={<ConfiguracionMoto/>}/>
            <Route path="/ConfigurarTarifas" element={<Tarifas/>}/>
            <Route path="/ConfigurarHorarios" element={<Horarios/>}/>

            <Route path="/Nosotros" element={<AcercaDe/>}/>


            <Route path="/Consultas" element={<Consultas/>}/>
            <Route path="/ConsultasAdmin" element={<ConsultasAdmin/>}/>

            <Route path="/Observaciones" element={<Quejas/>}/>
            <Route path="/QuejasAdmin" element={<QuejasAdmin/>}/>

            <Route path="/Anuncios" element={<Anuncio/>}/>
            <Route path="/AnunciosAdmin" element={<Anuncios/>}/>
            

            <Route path="/Clientes" element={<Clientes/>}/>
            <Route path="/ReservasCliente" element={<ReservasCliente/>}/>
            <Route path="/ReservasClienteMensual" element={<ReservaMensualCliente/>}/>
            <Route path="/comprobante/:comprobanteId" element={<Comprobante/>}/>
            
            <Route path="/Solicitud" element={<Solicitud/>}/>
            <Route path="/Solicitudes" element={<Solicitudes/>}/>

            <Route path="/SitiosAutos" element={<SitiosAutos/>}/>
            <Route path="/SitiosMotos" element={<SitiosMotos/>}/>

            <Route path="/Ingresos" element={<IngresosAnio/>}/>
            <Route path="/UsoSitios" element={<UsoSitios/>}/>
            <Route path="/EstadoDelParqueo" element={<EstadoSitios/>}/>
            
            <Route path="/EstadoDeMotos" element={<EstadoSitiosMotos/>}/>
            <Route path="/AutosMotosAdmin" element={<AutosMotosAdmin/>}/>
        
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

