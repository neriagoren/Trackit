import './App.css';
import * as React from "react";
import {useState, useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./Components/ClippedDrawer";
import {Redirect} from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import MyAppBar from "./Components/MyAppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Overview from "./pages/Overview";
import Create from "./pages/Create";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Inbox from "./ChatSystem/Inbox";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Cookies from "universal-cookie";
import useIsMounted from './hooks/useIsMounted';
import {theme, SidebarData} from './Resources/constants';
import {ThemeProvider} from '@mui/material/styles';



export default function App() {

    const [isLogged, setLogin] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [token, setToken] = useState("");

    const isMounted = useIsMounted();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        if (isMounted) {
            console.log("checking for cookies")
            const cookies = new Cookies();
            if (cookies.get("trackit_COOKIE")) {
                setLogin(() => true);
                setToken(() => cookies.get("trackit_COOKIE"));
            }
        }
    }, [isMounted]);


    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CssBaseline/>
                    {
                        isLogged ?
                            <Box sx={{display: 'flex', overflowY: "auto", height: "100vh"}}>
                                <MyAppBar setL={setLogin}/>
                                <ClippedDrawer SidebarData={SidebarData} selectedIndex={selectedIndex}
                                               handleListItemClick={handleListItemClick}/>
                                <Box width={"100%"}>

                                    <Toolbar/>
                                    <Redirect to={"/overview"}/>
                                    <Route path={"/overview"} component={Overview} exact={true}/>
                                    <Route path={"/createevent"} component={Create} exact={true}/>
                                    <Route path={"/reports"} component={Reports} exact={true}/>
                                    <Route path={"/profile"} component={Profile} exact={true}/>
                                    <Route path={"/inbox"} render={props => <Inbox  {...props} />} exact={true}/>
                                    <Route path={"/setting"} render={props => <Setting  {...props} />} exact={true}/>
                                </Box>
                            </Box>
                            :
                            <Box sx={{}}>
                                <Redirect to={"/"}/>
                                <Route path={"/"} render={props => <Login  {...props} setL={setLogin}/>} exact={true}/>
                            </Box>
                    }
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

