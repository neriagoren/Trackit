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
import Create from "./pages/CreateEvent";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Inbox from "./ChatSystem/Inbox";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Cookies from "universal-cookie";
import useIsMounted from './hooks/useIsMounted';
import {theme, adminSidebarData, tutorSidebarData, studentSidebarData} from './Resources/constants';
import {ThemeProvider} from '@mui/material/styles';
import Signup from './pages/Signup';
import CreateEvent from './pages/CreateEvent';
import CreateTutor from './pages/CreateTutor';

import axios from 'axios';
import SearchTutor from './pages/SearchTutor';
export default function App() {

    const [isLogged, setLogin] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [userType, setUserType] = useState("");
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
                axios.get("http://localhost:8989/login/type", {
                params: {
                    token:cookies.get("trackit_COOKIE")
                }
                }).then(type => {
                    setUserType(() => type.data)
                    console.log(type.data)
                    setLogin(() => true);
                })
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
                            userType === "admin" ?
                            <Box sx={{display: 'flex', overflowY: "auto", height: "100vh"}}>
                                <MyAppBar setL={setLogin} setT={setUserType}/>
                                <ClippedDrawer SidebarData={adminSidebarData} selectedIndex={selectedIndex}
                                            handleListItemClick={handleListItemClick}/>
                                <Box width={"100%"}>
                                    <Toolbar/>
                                    <Redirect to={"/admin/reports"}/>
                                    <Route path={"/admin/reports"} render={props => <Reports  {...props} />} exact={true}/>
                                    <Route path={"/admin/create-tutor"} render={props => <CreateTutor  {...props} />} exact={true}/>

                                </Box>
                            </Box>
                            :
                            userType === "tutor" ?
                                <Box sx={{display: 'flex', overflowY: "auto", height: "100vh"}}>
                                    <MyAppBar setL={setLogin}/>
                                    <ClippedDrawer SidebarData={tutorSidebarData} selectedIndex={selectedIndex}
                                                handleListItemClick={handleListItemClick}/>
                                    <Box width={"100%"}>

                                        <Toolbar/>
                                        <Redirect to={"/tutor/overview"}/>
                                        <Route path={"/tutor/overview"} render={props => <Overview  {...props} />} exact={true}/>
                                        <Route path={"/tutor/createevent"} render={props => <CreateEvent  {...props} />} exact={true}/>
                                        <Route path={"/tutor/reports"} component={Reports} exact={true}/>
                                        <Route path={"/tutor/profile"} component={Profile} exact={true}/>
                                        <Route path={"/tutor/inbox"} render={props => <Inbox  {...props} />} exact={true}/>
                                        <Route path={"/tutor/setting"} render={props => <Setting  {...props} />} exact={true}/>

                                    </Box>
                                </Box>
                            :
                            userType === "student" ?
                            <Box sx={{display: 'flex', overflowY: "auto", height: "100vh"}}>
                            <MyAppBar setL={setLogin}/>
                            <ClippedDrawer SidebarData={studentSidebarData} selectedIndex={selectedIndex}
                                        handleListItemClick={handleListItemClick}/>
                            <Box width={"100%"}>

                                <Toolbar/>
                                <Redirect to={"/student/overview"}/>
                                <Route path={"/student/overview"} render={props => <Overview  {...props} />} exact={true}/>
                                <Route path={"/student/inbox"} render={props => <Inbox  {...props} />} exact={true}/>
                                <Route path={"/student/search-tutor"} render={props => <SearchTutor  {...props} />} exact={true}/>
                                

                            </Box>
                            </Box>
                            :
                            <Box sx={{}}>
                            <Redirect to={"/"}/>
                            <Route path={"/"} render={props => <Login  {...props} setIndex={setSelectedIndex} setL={setLogin} setType={setUserType}/>} exact={true}/>
                            <Route path={"/signup"} render={props => <Signup  {...props} />} exact={true}/>
                            </Box>
                            :
                            <Box sx={{}}>
                                <Redirect to={"/"}/>
                                <Route path={"/"} render={props => <Login  {...props} setIndex={setSelectedIndex} setL={setLogin} setType={setUserType}/>} exact={true}/>
                                <Route path={"/signup"} render={props => <Signup  {...props} />} exact={true}/>
                            </Box>
                    }
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

