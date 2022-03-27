import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Button, Checkbox, Grid, ListItem, ListItemIcon, TextField} from "@mui/material";
import Box from "@mui/material/Box";

const colors = ["#2596be", "orange", "red", "green", "pink"]

const msg = [
    {title: "הודעה", body: "היי אני צריך שתשלח לי דיווח עדכני", author:"נריה גורן"},
    {title: "hi", body: "hello world", author:"מתן גורן"},
    {title: "hi", body: "hello world", author:"רות גורן"},
    {title: "hi", body: "hello world", author:"רות גורן"},
    {title: "hi", body: "hello world", author:"אבנר"},
    {title: "hi", body: "hello world", author:"אבנר"},
    {title: "hi", body: "hello world", author:"אבנר"},
    {title: "hi", body: "hello world", author:"אבנר"},
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
        setSelectedIndex(-1);
        setSelectSome(!selectSome);
        setChecked([]);
    }

    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={5} >
            <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                <ListSubheader sx={{borderRadius:"10px"}} component="div" id="nested-list-subheader">
                    רשימת שיחות
                </ListSubheader>
                {
                    selectSome ?
                        <>
                            <Box>
                                <span style={{marginRight:15}}> נבחרו {checked.length} שיחות  </span>
                                <Button onClick ={handleSelectSome}> סגור בחירה מרובה </Button>
                                {
                                    checked.length > 0 &&
                                    <Button> מחק </Button>
                                }

                            </Box>

                        </>
                        :
                        <Box>
                            <Button onClick ={handleSelectSome}> בחירה מרובה </Button>
                        </Box>

                }
            <Box sx={{height:"400px", overflowY:"scroll", borderRadius:"10px"}}>
            <List
                component="nav">
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
            </Box>
            </Box>
        </Grid>
            <Grid item xs={6}>
                        { selectedIndex !== -1 ?
                            <>
                            <Box sx={{  bgcolor: 'background.paper',height:"400px",overflowY:"scroll", overflowX:"hidden"}}>

                            <ListSubheader component="div" id="nested-list-subheader">
                                השיחה שלך ושל { msg[selectedIndex].author}
                            </ListSubheader>

                            <Box>

                                    TEXT
                                </Box>
                                </Box>

                            <Box sx={{bgcolor: 'background.paper', width:"100%" }}>
                                    <TextField id="outlined-basic"   variant={"filled"} sx={{width:"100%", padding:1}} />

                                </Box>
                            </>
                            :
                            <h3 style={{textAlign:"center"}}> מערכת מסרים 2022 </h3>
                        }
            </Grid>
        </Grid>
    );
}
