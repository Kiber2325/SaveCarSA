import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LadingPage from "../components/landingPage/LadingPage";
import Iniciosesion from "../components/Login/Iniciosesion";
import Home from "../components/homePage/Home";
import RegistrarCliente from "../components/RegistrarCliente/RegistrarCliente";

//import ladingPage from "../pages/ladingpage";


const Redipath =() =>{
    return(
    <Router>
        <Switch>
            <Route exact path="/" component={LadingPage}/>
            <Route exact path="/Iniciosesion" component={Iniciosesion}/>
            <Route exact path="/Home*" component={Home}/>
            <Route exact path="/RegistrarCliente" component={RegistrarCliente}/>

        </Switch>
    </Router>
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