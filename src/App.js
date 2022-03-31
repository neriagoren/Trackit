import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./components/ClippedDrawer";
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


function App(){

    const [isLogged, setLogin] = useState(true);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <div className="App" dir={"rtl"}>
                <CssBaseline />
                {
                    isLogged ?
                        <Box sx={{display:"flex"}}>
                            <ClippedDrawer setL = {setLogin} />
                            <Box sx={{  width:"100%" ,pt:2, backgroundColor:"#f5f5f5", height:"100vh", marginRight:"10px"}}>
                                <Toolbar />
                                <Redirect to={"/overview"}/>
                                <Route path={"/overview"} component={Overview} exact={true}/>
                                <Route path={"/department"} component={Department} exact={true}/>
                                <Route path={"/profile"} component={Profile} exact={true}/>
                                <Route path={"/inbox"} render={props => <Inbox  {...props} />} exact={true}/>
                                <Route path={"/setting"} render={props => <Setting  {...props} />} exact={true}/>
                            </Box>
                        </Box>
                            :
                        <>
                            <Redirect to={"/"}/>
                            <Route path={"/"}  render={props => <Login  {...props} setL={setLogin} />} exact={true}/>
                        </>
                }
            </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;


