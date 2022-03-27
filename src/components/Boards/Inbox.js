import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Avatar, Button, Checkbox, ListItem, ListItemIcon} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';

const colors = ["#2596be", "orange", "red", "green", "pink"]

export default function Inbox() {

    const msg = [
        {title: "הודעה", body: "היי אני צריך שתשלח לי דיווח עדכני", author:"נריה גורן"},
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

    const [checked, setChecked] = React.useState([]);

    const [selectSome, setSelectSome] = React.useState(false);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSelectSome = () => {
        setSelectedIndex(-1);
        setSelectSome(!selectSome);
        setChecked([]);
    }
    return (
        <List
            sx={{ bgcolor: 'background.paper'}}
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    רשימת שיחות
                </ListSubheader>
            }
        >

            {
                selectSome ?
                   <>
                    <Box>
                       <span> נבחרו {checked.length} הודעות  </span>
                       <Button onClick ={handleSelectSome}> סגור בחירה מרובה </Button>
                   </Box>
                    <Box>
                        <Button> העבר </Button>
                        <Button> מחק </Button>

                    </Box>
                    </>
                :
                    <Box>
                        <Button onClick ={handleSelectSome}> בחירה מרובה </Button>
                    </Box>

            }
            {
                msg.map((item,index) => {
                    return(
                        <>
                        <ListItem>
                            {
                                selectSome && <ListItemIcon onClick={handleToggle(index)}>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(index) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                            }

                            <ListItemButton selected={selectedIndex === index} onClick={(event) => handleClick(event,index)}  sx={{textAlign:"right"}}>
                                <Avatar sx = {{marginLeft:2, color:"white", backgroundColor:colors[index%5]}}>{item.author[0]}</Avatar>
                                <ListItemText primary={item.author} />
                                <ListItemText primary={item.body.slice(0,20) + "..."} />
                            </ListItemButton>
                        </ListItem>
                        </>
                    )
                })
            }
        </List>
    );
}
