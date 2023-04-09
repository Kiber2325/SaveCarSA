import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LadingPage from "../components/landingPage/LadingPage";
import Iniciosesion from "../components/Login/Iniciosesion";
import Home from "../components/homePage/Home";
import FormGuardia from "../components/FormGuardia/formGuardia";
import RegistroGuardia from "../Vistas/RegistroGuardia";

//import ladingPage from "../pages/ladingpage";


const Redipath =() =>{
    return(
    <Router>
        <Switch>
            <Route exact path="/" component={LadingPage}/>
            <Route exact path="/Iniciosesion" component={Iniciosesion}/>
            <Route exact path="/Home*" component={Home}/>
            <Route exact path="/FormGuardia" component={FormGuardia}/>
            <Route exact path="/FormGuardia" component={RegistroGuardia}/>
        </Switch>
    </Router>
    );
};
export default Redipath;
