import './App.css';
import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import axios from 'axios';
import Cookies from "universal-cookie";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import useIsMounted from './hooks/useIsMounted';
import MyAppBar from "./Components/MyAppBar";
import ClippedDrawer from "./Components/ClippedDrawer";
import SearchTutor from './pages/SearchTutor';
import Signup from './pages/Signup';
import CreateEvent from './pages/CreateEvent';
import CreateTutor from './pages/CreateTutor';
import Overview from "./pages/Overview";
import AdminReports from "./pages/AdminReports";
import TutorReports from "./pages/TutorReports";

import Profile from "./pages/Profile";
import Inbox from "./ChatSystem/Inbox";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import { theme, adminSidebarData, tutorSidebarData, studentSidebarData } from './Resources/constants';



export default function App() {

    const [isLogged, setLogin] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [userType, setUserType] = useState("");
    const [token, setToken] = useState("");

    const isMounted = useIsMounted();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        if (!isLogged) {
            setSelectedIndex(() => 0)

        }
    }, [isLogged])
    useEffect(() => {
        if (isMounted) {
            console.log("checking for cookies")
            const cookies = new Cookies();
            if (cookies.get("trackit_COOKIE")) {
                axios.get("http://localhost:8989/login/type", {
                    params: {
                        token: cookies.get("trackit_COOKIE")
                    }
                }).then(type => {
                    setUserType(() => type.data)
                    console.log(type.data)
                    setLogin(() => true);
                    setToken(() => cookies.get("trackit_COOKIE"));
                })
            }
        }
    }, [isMounted]);


    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CssBaseline />
                    {
                        isLogged ?
                            <Box sx={{ display: 'flex', overflowY: "auto", height: "100vh", direction: "rtl" }}>
                                <MyAppBar setL={setLogin} setT={setUserType} />
                                <ClippedDrawer SidebarData={userType === "admin" ? adminSidebarData : userType === "tutor" ? tutorSidebarData : studentSidebarData} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
                                <Box width={"100%"}>
                                    <Toolbar />
                                    <Redirect to={userType === "admin" ? "/admin/reports" : userType === "tutor" ? "/tutor/overview" : "/student/overview"} />
                                    <Route path={"/admin/reports"} render={props => <AdminReports  {...props} />} exact={true} />
                                    <Route path={"/admin/inbox"} render={props => <Inbox  {...props} type={userType} />} exact={true} />
                                    <Route path={"/admin/create-tutor"} render={props => <CreateTutor  {...props} />} exact={true} />
                                    <Route path={"/tutor/overview"} render={props => <Overview  {...props} />} exact={true} />
                                    <Route path={"/tutor/createevent"} render={props => <CreateEvent  {...props} />} exact={true} />
                                    <Route path={"/tutor/reports"} render={props => <TutorReports  {...props} />} exact={true} />
                                    <Route path={"/tutor/profile"} render={props => <Profile  {...props} />} exact={true} />
                                    <Route path={"/tutor/inbox"} render={props => <Inbox  {...props} />} exact={true} />
                                    <Route path={"/tutor/setting"} render={props => <Setting  {...props} />} exact={true} />
                                    <Route path={"/student/overview"} render={props => <Overview  {...props} />} exact={true} />
                                    <Route path={"/student/inbox"} render={props => <Inbox  {...props} />} exact={true} />
                                    <Route path={"/student/search-tutor"} render={props => <SearchTutor  {...props} />} exact={true} />
                                    <Route path={"/student/setting"} render={props => <Setting  {...props} />} exact={true} />
                                    <Route path={"/student/profile"} render={props => <Profile  {...props} />} exact={true} />
                                </Box>
                            </Box>
                            :


                            <Box sx={{ direction: "rtl" }}>
                                <Redirect to={"/"} />
                                <Route path={"/"} render={props => <Login  {...props} setL={setLogin} setType={setUserType} />} exact={true} />
                                <Route path={"/signup"} render={props => <Signup  {...props} />} exact={true} />
                            </Box>
                    }
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

