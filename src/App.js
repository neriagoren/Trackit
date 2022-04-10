import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./Components/ClippedDrawer";
import {Redirect} from "react-router";
import Login from "./pages/Login";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";


const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: blueGrey[500],
        },
    },
});


export default function App() {

    const [isLogged, setLogin] = useState(true);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CssBaseline/>
                    {
                        isLogged ?
                            <ClippedDrawer setL={setLogin}/>
                            :
                            <>
                                <Redirect to={"/"}/>
                                <Route path={"/"} render={props => <Login  {...props} setL={setLogin}/>} exact={true}/>
                            </>
                    }
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

