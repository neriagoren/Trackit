import React, {useEffect} from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
    Avatar,
    Button,
    Checkbox,
    Chip, Container,
    Grid, Grow,
    ListItem,
    ListItemIcon,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import ChatBubble from "./ChatBubble";


const msg = [
    { author:"גיא לשם"},
    { author:"מרדכי רייף"},
    { author:"אסתר בן דויד"},
    { author:"שי גבעתי"},
    { author:"אורנה"},
]
export default function Inbox() {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [checked, setChecked] = React.useState([]);
    const [selectSome, setSelectSome] = React.useState(false);

    const handleClick = (event, index) => {
        setSelectedIndex(index)
    };

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
        setSelectSome(!selectSome);
        setChecked([]);
    }

    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={4}>
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        timeout={500}>
                        <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                            <ListSubheader sx={{borderRadius: "10px"}} component="div" id="nested-list-subheader">
                                רשימת שיחות
                            </ListSubheader>
                            {
                                selectSome
                                    ?
                                    <Box>
                                        <span style={{marginRight: 15}}> נבחרו {checked.length} שיחות  </span>
                                        <Button onClick={handleSelectSome}> סגור בחירה מרובה </Button>
                                        {
                                            checked.length > 0 &&
                                            <Button> מחק </Button>
                                        }
                                    </Box>
                                    :
                                    <Box>
                                        <Button onClick={handleSelectSome}> בחירה מרובה </Button>
                                    </Box>
                            }
                            <Box sx={{height: "400px", overflowY: "scroll"}}>
                                <List component="nav">
                                    {
                                        msg.map((item, index) => {
                                            return (
                                                <ListItem sx={{p: 1}}>
                                                    {
                                                        selectSome &&
                                                        <ListItemIcon onClick={handleToggle(index)}>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={checked.indexOf(index) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                            />
                                                        </ListItemIcon>
                                                    }

                                                    <ListItemButton selected={selectedIndex === index}
                                                                    onClick={(event) => handleClick(event, index)}
                                                                    sx={{textAlign: "right"}}>
                                                        <Avatar sx={{
                                                            marginLeft: 2,
                                                            color: "white",
                                                            backgroundColor: "#2596be"
                                                        }}>{item.author[0]}</Avatar>
                                                        <ListItemText primary={item.author}/>

                                                        {
                                                            !selectSome &&
                                                            <Chip label={index + " הודעות חדשות"}/>
                                                        }

                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Box>
                        </Box>
                    </Grow>
                </Grid>
                <Grid item xs={6}>
                    {selectedIndex !== -1 &&
                        <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            timeout = {500}>
                            <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                                <ListSubheader component="div" id="nested-list-subheader" sx={{borderRadius: "10px"}}>
                                    השיחה שלך ושל {msg[selectedIndex].author}
                                </ListSubheader>
                                <Box sx={{height: "400px", overflowY: "auto"}}>
                                        <ChatBubble who={true} text={"שלום בוקר טוב"}/>
                                        <ChatBubble who={false} text={"היי מה קורה נריה?"}/>
                                        <ChatBubble  who={true} text={"אני צריך שתשלח לי את הדוחות הרבעוניים של 2021 לפני ארוחת צהריים, אגב איך האישה והילדים?"}/>
                                        <ChatBubble who={false} text={"אין בעיה בוס! האישה והילדים בסדר כרגיל..."}/>
                                </Box>
                                <Box sx={{p: 1}}>
                                    <TextField placeholder={"שלח הודעה..."} sx={{width: "100%"}}/>
                                </Box>
                            </Box>
                        </Grow>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}
