import {BrowserRouter, Route, Routes  } from "react-router-dom";
import LadingPage from "../components/landingPage/LadingPage";
import Iniciosesion from "../components/Login/Iniciosesion";
import Home from "../components/homePage/Home";

import FormGuardia from "../components/FormGuardia/formGuardia";
import RegistrarCliente from "../components/RegistrarCliente/RegistrarCliente";

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

