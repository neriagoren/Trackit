import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import {Avatar, Button, Grow, TextField} from "@mui/material";


export default function UnreadMessages() {

    const [unreadMessages, setMessages] = React.useState([
        {sender:"מארק קליין",body:"היי נריה אני חייב שתתקשר אליי בהקדם"},
        {sender:"אורי רוזנברג",body:"אתה עסוק היום?"},
        {sender:"קארל ליברמן",body:"רוצה ללכת בצהריים לאכול בורגר אחי?"},
    ])
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [reply, setReply] = React.useState(false)

    const handleClick = (event, index) => {
        index === selectedIndex
            ?
             setSelectedIndex( - 1)
            :
            setSelectedIndex(index)
    };

    const handleReply = () => {
        setReply(!reply)
    }

    const handleRead = () => {
        unreadMessages.splice(selectedIndex, 1) &&  setSelectedIndex( - 1)
    }
    return (
        <Box sx={{height: "400px", overflowY: "auto", borderRadius: "10px"}}>
            <List
                sx={{width: '100%'}}
                component="nav"
                aria-labelledby="nested-list-subheader">
                {
                    unreadMessages.map((message, index) => (
                        <>
                            <ListItemButton onClick={(event) => handleClick(event, index)} sx={{textAlign: "right"}}>
                                <Avatar sx={{ml: 1, backgroundColor: "#2596be"}}> {message.sender[0]} </Avatar>
                                <Box width={"100%"}>


                                    <ListItemText primary={<Typography fontWeight="bold">
                                        {message.sender}
                                    </Typography>}/>

                                    {
                                        selectedIndex !== index &&
                                        <ListItemText primary={<Typography color={"gray"}>
                                            {message.body.slice(0, 50) + "..."}
                                        </Typography>}/>
                                    }

                                </Box>

                                {selectedIndex === index ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>

                            <Collapse in={selectedIndex === index} timeout="auto" unmountOnExit>
                                <Typography p={2}>
                                    {message.body}
                                </Typography>
                                {
                                    !reply ?
                                    <Box>
                                    <Button onClick={handleReply}>
                                    השב
                                    </Button>
                                        <Button>
                                            לצ'אט עם {message.sender}
                                        </Button>
                                        <Button onClick={handleRead}> סמן כנקרא  </Button>
                                    </Box>
                                        :
                                        <Box sx={{p:2}}>
                                            <TextField size={"small"} placeholder={"כתוב הודעה..."} />
                                            <Button> שלח  </Button>
                                            <Button onClick={handleReply}> סגור  </Button>
                                        </Box>
                                }
                            </Collapse>
                        </>
                    ))
                }

            </List>
        </Box>
    )
}
