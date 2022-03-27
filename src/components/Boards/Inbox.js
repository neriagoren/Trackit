import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Avatar} from "@mui/material";
import Box from "@mui/material/Box";


const colors = ["#2596be", "orange", "red", "green", "pink"]

export default function Inbox() {

    const msg = [
        {title: "הודעה חשובה", body: "שלום מה נשמע?", author:"נריה גורן"},
        {title: "hi", body: "hello world", author:"מתן גורן"},
        {title: "hi", body: "hello world", author:"רות גורן"},
        {title: "hi", body: "hello world", author:"אבנר"},
        {title: "hi", body: "hello world", author:"אבנר"},
    ]

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleClick = (event, index) => {
        if (index !== selectedIndex) {
            setSelectedIndex(index)
        }
        else {
            setSelectedIndex(-1)
        }
    };


    return (
        <List
            sx={{ bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    דואר נכנס
                </ListSubheader>
            }
        >

            {
                msg.map((item,index) => {
                    return(
                        <>
                        <ListItemButton  onClick={(event) => handleClick(event,index)}  sx={{textAlign:"right"}}>
                            <Avatar sx = {{marginLeft:2, color:"white", backgroundColor:colors[index%5]}}>{item.author[0]}</Avatar>
                            <ListItemText primary={item.author} />
                            <ListItemText primary="10/10/21" sx={{textAlign:"left", marginLeft:2}}/>
                            {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}

                        </ListItemButton>
                        <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 , textAlign:"right"}}>
                                    <ListItemText primary={item.body} />
                                </ListItemButton>
                            </List>
                       </Collapse>
                        </>
                    )
                })
            }
        </List>
    );
}
