import React from "react";
import { useState } from "react";
import {Avatar, Badge, Container, Divider, Grid, Grow, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import DepartmentBoard from "../Components/DepartmentBoard";
import ScrollableFeed from "react-scrollable-feed";


                        
export default function Department() {


    const [messages, setMessages] = useState([  {author:1,message: "שלום בוקר טוב לכולם"},
    {author: 2, message: "היי מה קורה נריה?"},
    {author: 2, message: "היי מה קורה נריה?"},
    {author: 2, message: "היי מה קורה נריה?"},
    {author: 2, message: "היי מה קורה נריה?"},
    {author: 2, message: "היי מה קורה נריה?"}
    ]);


    /*
    useEffect

    axios.get("/department-messages", {params: {token:token}}).then( response =>
        {
            setMessages(() => response.data)

        })

    */

        return (
            <Container sx={{paddingBottom: 20, paddingTop: 2}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={5} >
                        <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            timeout={500}>
                        <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" sx={{position:"static",borderRadius:"10px"}}>
                               לוח עדכונים
                            </ListSubheader>

                            <DepartmentBoard />
                        </Box>
                        </Grow>
                    </Grid>

                    <Grid item xs={6} >
                        <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            timeout={1000}>
                        <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                שיחה קבוצתית של המחלקה
                            </ListSubheader>

                            <Box sx={{height:"300px", overflowY:"auto"}}>
                                <ScrollableFeed>
                                    <Box sx ={{p:2}}>
                                    <Divider sx ={{color:"gray"}}> יום רביעי 9 אפריל </Divider>

                                    </Box>
                                    {
                                        messages.map(msg =>  (
                                                msg.author === 1 ?
                                                    <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>
                                                        <Box sx={{m:1}}>
                                                            <Avatar sx={{height:20, width:20, backgroundColor:"green", fontSize:"small"}} > {msg.author[0]}  </Avatar>
                                                        </Box>
                                                        <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                                                            <Typography m={1} color={"white"}>
                                                                {msg.message}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                :
                                                <Box  sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>
                                                    <Box sx={{m:1}}>
                                                        <Avatar sx={{height:20, width:20, backgroundColor:"orange", fontSize:"small"}} > {msg.author[0]}  </Avatar>
                                                    </Box>
                                                    <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                                                        <Badge badgeContent={msg.author}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}>
                                                            <Typography m={1} color={"black"}>
                                                                {msg.message}
                                                            </Typography>
                                                        </Badge>
                                                    </Box>
                                                </Box>
                                        ))
                                    }     
                                     <Box sx ={{p:2}}>
                                    <Divider sx ={{color:"gray"}}> היום </Divider>

                                    </Box> 
                                </ScrollableFeed>
                            </Box>

                            <Box sx={{p:1}}>
                                <TextField placeholder={"שלח הודעה לכולם..."} sx ={{width:"100%"}}/>
                            </Box>
                        </Box>
                        </Grow>
                    </Grid>

                    <Grid item xs={5} >
                        <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            timeout={1500}>
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                נתונים
                            </ListSubheader>
                        </Box>
                        </Grow>
                    </Grid>

                    <Grid item xs={6} >
                        <Grow
                            in={true}
                            style={{transformOrigin: '0 0 0'}}
                            timeout={2000}>
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                רשימת העובדים במחלקה
                            </ListSubheader>
                        </Box>
                        </Grow>
                    </Grid>
                </Grid>
            </Container>
        )
    
}

