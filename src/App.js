import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./components/ClippedDrawer";
import {Redirect} from "react-router";
import {Fab} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import Login from "./pages/Login";
import SpeedDialComponent from "./components/SpeedDialComponent";

function App(){

    const [isLogged, setLogin] = useState(true);


    return (
        <BrowserRouter>
            <div className="App" dir={"rtl"}>
                <SpeedDialComponent />
                {
                    isLogged ?
                        <>
                            <ClippedDrawer setL = {setLogin} />

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


