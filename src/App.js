import './App.css';
import * as React from "react";
import {useState, useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClippedDrawer from "./Components/ClippedDrawer";
import {Redirect} from "react-router";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import MyAppBar from "./Components/MyAppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Overview from "./pages/Overview";
import Create from "./pages/Create";
import Reports from "./pages/Reports";
import Department from "./pages/Department";
import Profile from "./pages/Profile";
import Inbox from "./ChatSystem/Inbox";
import Setting from "./pages/Setting";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import Login from "./pages/Login";
import Cookies from "universal-cookie";
import useIsMounted from './hooks/useIsMounted';

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: blueGrey[500],
        },
    },
});


const SidebarData = [
    {
        id: "overview",
        title: "מבט כללי",
        path: "/overview",
        icon: <AssessmentIcon />,
    },
    {
        id: "create",
        title: "צור אירוע",
        path: "/createevent",
        icon: <EventAvailableIcon />,
    },
    {
        id: "reports",
        title: "דוחות",
        path: "/reports",
        icon: <SummarizeIcon />,
        subNav: [
            {
                title: "מסד נתונים",
                path: "/reports/databases",
            }
        ]
    },
    {
        id: "messages",
        title: "הודעות",
        path: "/inbox",
        icon: <ChatIcon />,
    },
    {
        id: "profile",
        title: "פרופיל",
        path: "/profile",
        icon: <AssignmentIndIcon />,
        subNav: [
            {
                title: "משימות שלי",
                path: "/profile/tasks",

            }
        ]
    },
    {
        id:"setting",
        title: "הגדרות",
        path: "/setting",
        icon: <SettingsIcon />,
        subNav: [
            {
                title: "ערוך פרופיל",
                path: "/setting/edit",

            },
            {
                title: "תמיכה טכנית",
                path: "/setting/support",

            }
        ]
    }
]

// test

export default function App() {

    const [isLogged, setLogin] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [token, setToken] = useState("");
    const [state, stateUpdate] = useState(false);

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

