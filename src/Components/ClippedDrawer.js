import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Badge, Divider } from "@mui/material";
import { NavLink } from 'react-router-dom';

import Typography from "@mui/material/Typography";

const drawerWidth = 240;

export default function ClippedDrawer(props) {

    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}>
            <Toolbar />
            <List>
                {props.SidebarData.map((item, index) => (
                    <NavLink to={item.path} key={index} style={{ textDecoration: "none" }}>
                        <ListItem button key={item.title}
                            selected={props.selectedIndex === index}
                            onClick={(event) => props.handleListItemClick(event, index)}
                            sx={{ color: props.selectedIndex === index ? "#2596be" : "gray" }}>
                            <ListItemIcon
                                sx={{ marginRight: "20px", color: props.selectedIndex === index ? "#2596be" : "gray" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} sx={{ textAlign: "right" }} />
                            {
                                item.id === "messages" &&
                                <Badge badgeContent={4} color={"error"} />
                            }

                            {
                                item.id === "reports" &&
                                <Badge badgeContent={2} color={"error"} />

                            }
                        </ListItem>
                    </NavLink>))}
            </List>
            <Divider />
            <Typography fontWeight={"bold"} color={"gray"} sx={{ position: "absolute", bottom: 0, right: 10 }}>
                פיתוח מערכת נריה גורן
            </Typography>
        </Drawer>
    );
}
