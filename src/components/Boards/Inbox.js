import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
    Avatar,
    Badge,
    Button,
    Checkbox,
    Chip,
    Divider,
    Grid,
    InputAdornment,
    ListItem,
    ListItemIcon,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScrollableFeed from 'react-scrollable-feed'
import {AccountCircle} from "@mui/icons-material";



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
        setSelectSome(!selectSome);
        setChecked([]);
    }

    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={4} >
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
                        <ListItem sx={{p:1}}>
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

                            <ListItemButton selected={selectedIndex === index} onClick={(event) => handleClick(event,index)}  sx={{textAlign:"right"}}>
                                <Avatar sx = {{marginLeft:2, color:"white", backgroundColor:colors[index%5]}}>{item.author[0]}</Avatar>
                                <ListItemText primary={item.author}/>

                                {
                                    !selectSome &&
                                    <Chip  label={ index + " הודעות חדשות" } />

                                }

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
                        { selectedIndex !== -1 &&
                            <>
                            <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>


                            <ListSubheader component="div" id="nested-list-subheader" sx={{borderRadius:"10px"}}>
                                השיחה שלך ושל { msg[selectedIndex].author}
                            </ListSubheader>

                                <Box sx={{height:"400px", overflowY:"scroll", borderRadius:"10px"}}>
                                    <ScrollableFeed>
                                <Box>
                                        <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                                                <Typography m={1} color={"white"}>
                                                    שלום בוקר טוב
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                                                <Typography m={1} color={"black"}>
                                                    היי מה קורה נריה?
                                                </Typography>
                                            </Box>

                                        </Box>

                                        <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                                                <Typography m={1} color={"white"}>
                                                        אני צריך שתשלח לי את הדוחות הרבעוניים של 2021 לפני ארוחת צהריים, אגב איך האישה והילדים?
                                                </Typography>
                                            </Box>

                                        </Box>



                                    </Box>

                                    <Box sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>

                                        <Box>
                                            <AccountCircleIcon />

                                        </Box>
                                        <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                                            <Typography m={1} color={"black"} textAlign={"right"}>
                                                 אין בעיה בוס! האישה והילדים בסדר כרגיל...
                                            </Typography>
                                        </Box>

                                    </Box>
                                    </ScrollableFeed>
                                </Box>

                                <Box sx={{p:1}}>
                                    <TextField placeholder={"שלח הודעה..."} sx ={{width:"100%"}}/>
                                </Box>
                            </Box>


                            </>
                        }
            </Grid>
        </Grid>
    );
}
