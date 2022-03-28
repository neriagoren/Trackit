import React from "react";
import {Container, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import ScrollableFeed from "react-scrollable-feed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

class Department extends React.Component {

    render() {
        return (
            <Container sx ={{height:"100%", overflowY:"auto", paddingBottom:20, paddingTop:1}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                               לוח עדכונים
                            </ListSubheader>
                        </Box>
                    </Grid>

                    <Grid item xs={5} >

                        <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                שיחה קבוצתית של המחלקה
                            </ListSubheader>

                            <Box sx={{height:"280px", overflowY:"scroll", borderRadius:"10px"}}>
                                <ScrollableFeed>
                                    <Box>
                                        <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                                                <Typography m={1} color={"white"}>
                                                    שלום בוקר טוב לכולם
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
                                        <Box sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                                                <Typography m={1} color={"black"}>
                                                    היי בוקר טוב בוס!
                                                </Typography>
                                            </Box>

                                        </Box>

                                        <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>

                                            <Box>
                                                <AccountCircleIcon />

                                            </Box>
                                            <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                                                <Typography m={1} color={"white"}>
                                                    אני צריך שתשלחו לי את הדוחות שלכם מ- 2021 לפני ארוחת צהריים
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
                                                עובד על זה עכשיו!
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>

                                        <Box>
                                            <AccountCircleIcon />

                                        </Box>
                                        <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                                            <Typography m={1} color={"black"} textAlign={"right"}>
                                                נשלח הרגע לאימייל שלך נריה
                                            </Typography>
                                        </Box>

                                    </Box>
                                </ScrollableFeed>
                            </Box>

                            <Box sx={{p:1}}>
                                <TextField placeholder={"שלח הודעה לכולם..."} sx ={{width:"100%"}}/>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                נתונים
                            </ListSubheader>
                        </Box>
                    </Grid>

                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <ListSubheader component="div" id="nested-list-subheader" sx={{position:"static",borderRadius:"10px"}}>
                                רשימת העובדים במחלקה
                            </ListSubheader>
                        </Box>
                    </Grid>


                </Grid>

            </Container>

        )
    }
}

export default Department;
