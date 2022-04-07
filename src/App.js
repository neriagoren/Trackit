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
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Overview from "./pages/Overview";
import Department from "./pages/Department";
import Profile from "./pages/Profile";
import Inbox from "./ChatSystem/Inbox";
import Setting from "./pages/Setting";


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
                <div className="App" dir={"rtl"}>
                    <CssBaseline/>
                    {
                        isLogged ?
                            <Box sx={{overflowY:"auto", height:"100vh"}}>
                                <ClippedDrawer setL={setLogin}/>
                            </Box>

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

