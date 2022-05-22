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

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [userType, setUserType] = useState("");
    const [token, setToken] = useState("");


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        if (token === "") {
            setSelectedIndex(() => 0)

        }
    }, [token])

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get("ACC_COOKIE")) {
            axios.get("http://localhost:8989/login/type", {
                params: {
                    token: cookies.get("ACC_COOKIE")
                }
            }).then(res => {
                setToken(() => cookies.get("ACC_COOKIE"))
                setUserType(() => res.data[0].type)
            })
        }

    }, []);


    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CssBaseline />
                    {
                        token !== "" ?
                            <Box sx={{ display: 'flex', overflowY: "auto", height: "100vh", direction: "rtl" }}>
                                <MyAppBar setToken={setToken} setUserType={setUserType} />
                                <ClippedDrawer SidebarData={userType === "ADMIN" ? adminSidebarData : userType === "TUTOR" ? tutorSidebarData : studentSidebarData} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
                                <Box width={"100%"}>
                                    <Toolbar />
                                    <Redirect to={userType === "ADMIN" ? "/admin/reports" : userType === "TUTOR" ? "/tutor/overview" : "/student/overview"} />

                                    <Route path={"/admin/reports"} render={props => <AdminReports  {...props} />} exact={true} />
                                    <Route path={"/admin/inbox"} render={props => <Inbox  {...props} />} exact={true} />
                                    <Route path={"/admin/create-tutor"} render={props => <CreateTutor  {...props} />} exact={true} />
                                    <Route path={"/tutor/overview"} render={props => <Overview  {...props} />} exact={true} />
                                    <Route path={"/tutor/createevent"} render={props => <CreateEvent  {...props} />} exact={true} />
                                    <Route path={"/tutor/reports"} render={props => <TutorReports  {...props} token={token} />} exact={true} />
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
                                <Route path={"/"} render={props => <Login  {...props} setToken={setToken} setUserType={setUserType} />} exact={true} />
                                <Route path={"/signup"} render={props => <Signup  {...props} />} exact={true} />
                            </Box>
                    }
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

