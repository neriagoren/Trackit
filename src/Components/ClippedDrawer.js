import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import NavLink from "react-router-dom/es/NavLink";
import {useState} from "react";
import {Badge, Divider} from "@mui/material";
import MyAppBar from "./MyAppBar";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';

const drawerWidth = 240;

const SidebarData = [
    {
        id: "overview",
        title: "מבט כללי",
        path: "/overview",
        icon: <AssessmentIcon />,
    },
    {
        id: "reports",
        title: "דוחות",
        path: "/reports",
        icon: <SummarizeIcon />,
        subNav: [
            {
                title: "דיווח תקלה",
                path: "/reports/reportabug",

            },
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
        id: "department",
        title: "מחלקה שלי",
        path: "/department",
        icon: <GroupIcon />

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


export default function ClippedDrawer(props) {

    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return (
        <Box>
            <MyAppBar title = {SidebarData[selectedIndex].title} setL = {props.setL}/>
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
                                          sx = {{color: selectedIndex === index ? "#2596be" : "gray"}}
                                >
                                    <ListItemIcon sx = {{marginRight:"20px", color: selectedIndex === index ? "#2596be" : "gray"}}>
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


        </Box>
    );
}
