import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {FaBook, FaBug, FaListUl, FaRegChartBar, FaRegEnvelope, FaRegListAlt, FaUser, FaUsers} from "react-icons/fa";
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {FiEdit, FiSettings} from "react-icons/fi";
import {MdOutlineHeadsetMic} from "react-icons/md";
import NavLink from "react-router-dom/es/NavLink";
import {useState} from "react";
import {Redirect} from "react-router";
import {Route} from "react-router-dom";
import Overview from "../pages/Overview";
import Department from "../pages/Department";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";
import Report from "../pages/Report";
import Databases from "../pages/Databases";
import Support from "../pages/Support";
import {Badge, Divider} from "@mui/material";
import MyAppBar from "./MyAppBar";
import Inbox from "./Boards/Inbox";
import Setting from "../pages/Setting";


const drawerWidth = 240;

const SidebarData = [
    {
        id: "overview",
        title: "מבט כללי",
        path: "/overview",
        icon: <FaRegChartBar />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        id: "reports",
        title: "דוחות",
        path: "/reports",
        icon: <HiOutlineDocumentReport />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "דיווח תקלה",
                path: "/reports/reportabug",
                icon: <FaBug />
            },
            {
                title: "מסד נתונים",
                path: "/reports/databases",
                icon: <FaRegListAlt />
            }
        ]
    },
    {
        id: "messages",
        title: "הודעות",
        path: "/inbox",
        icon: <FaRegEnvelope />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        id: "department",
        title: "מחלקה שלי",
        path: "/department",
        icon: <FaUsers />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        id: "profile",
        title: "פרופיל",
        path: "/profile",
        icon: <FaUser />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "משימות שלי",
                path: "/profile/tasks",
                icon: <FaListUl />
            }
        ]
    },
    {
        id: "book",
        title: "Trackers Book",
        path: "/book",
        icon: <FaBook />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />
    },
    {
        id:"setting",
        title: "הגדרות",
        path: "/setting",
        icon: <FiSettings />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "ערוך פרופיל",
                path: "/setting/edit",
                icon: <FiEdit />
            },
            {
                title: "תמיכה טכנית",
                path: "/setting/support",
                icon: <MdOutlineHeadsetMic />
            }
        ]
    }
]


export default function ClippedDrawer() {

    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <MyAppBar title = {SidebarData[selectedIndex].title}/>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto'}}>
                    <List>
                        {SidebarData.map((item, index) => (
                            <NavLink to = {item.path}  key = {index}  style={{textDecoration:"none"}}  >
                                <ListItem button key={item.title}
                                          selected={selectedIndex === index}
                                          onClick={(event) => handleListItemClick(event, index)}
                                          sx = {{color: selectedIndex === index ? "#2596be" : "black"}}
                                >
                                    <ListItemIcon sx = {{marginRight:"20px", color: selectedIndex === index ? "#2596be" : "black"}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{textAlign:"right"}}/>

                                    {
                                        item.id === "messages" &&
                                        <Badge badgeContent={4} color={"error"} />

                                    }

                                    {
                                        item.id === "reports" &&
                                        <Badge badgeContent={2} color={"error"} />

                                    }
                                </ListItem>
                            </NavLink>

                        ))}
                    </List>
                    <Divider />

                </Box>
            </Drawer>

            <Box sx={{  width:"100%" ,mt:2, backgroundColor:"#f5f5f5", height:"100vh", marginRight:"10px"}}>
                <Toolbar />
                <Redirect to={"/overview"}/>
                <Route path={"/overview"} component={Overview} exact={true}/>
                <Route path={"/department"} component={Department} exact={true}/>
                <Route path={"/profile"} component={Profile} exact={true}/>
                <Route path={"/inbox"} render={props => <Inbox  {...props} />} exact={true}/>
                <Route path={"/reports"} component={Reports} exact={true}/>
                <Route path={"/reports/reportabug"} component={Report} exact={true}/>
                <Route path={"/reports/databases"} component={Databases} exact={true}/>
                <Route path={"/setting"} render={props => <Setting  {...props} />} exact={true}/>

            </Box>

        </Box>
    );
}
