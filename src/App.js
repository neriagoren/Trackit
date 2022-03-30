import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./components/ClippedDrawer";
import {Redirect} from "react-router";
import Login from "./pages/Login";
import SpeedDialComponent from "./components/SpeedDialComponent";

function App(){

    const [isLogged, setLogin] = useState(true);

    return (
        <BrowserRouter>
            <div className="App" dir={"rtl"}>
                {
                    isLogged ?
                        <>
                            <ClippedDrawer setL = {setLogin} />
                            <SpeedDialComponent />
                        </>
                            :
                        <>
                            <Redirect to={"/"}/>
                            <Route path={"/"}  render={props => <Login  {...props} setL={setLogin} />} exact={true}/>
                        </>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;


