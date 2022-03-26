import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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


const drawerWidth = 240;

const SidebarData = [
    {
        title: "מבט כללי",
        path: "/overview",
        icon: <FaRegChartBar />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
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
        title: "הודעות",
        path: "/messages",
        icon: <FaRegEnvelope />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "מחלקה שלי",
        path: "/department",
        icon: <FaUsers />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
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
        title: "Trackers Book",
        path: "/book",
        icon: <FaBook />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />
    },
    {
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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#2596be" }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{marginRight:"50px"}}>

                        Track Kit
                    </Typography>



                    <Typography
                        variant="h6"
                        component="div"
                        sx={{marginRight:"125px"}}>

                        {SidebarData[selectedIndex].title}
                    </Typography>
                </Toolbar>
            </AppBar>

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

                                </ListItem>
                            </NavLink>

                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
