import React from "react";
import {Container, Grid, Grow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Day from "../Calendars/Day";
import Month from "../Calendars/Month";
import GlobalBoard from "../Components/GlobalBoard";



export default function Overview() {
    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>

            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={5}>
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        {...( {timeout: 500 })}>
                        <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                יומן יומי
                            </Typography>
                            <Day/>
                        </Box>
                    </Grow>
                </Grid>

                <Grid item xs={6}>
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        {...( {timeout: 1000 })}>
                        <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                יומן חודשי
                            </Typography>
                            <Month/>
                        </Box>
                    </Grow>
                </Grid>


                <Grid item xs={6}>
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        {...( {timeout: 1500 })}>
                        <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                לוח עדכונים כללי
                            </Typography>
                            <GlobalBoard/>
                        </Box>
                    </Grow>
                </Grid>

                <Grid item xs={5}>
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        {...( {timeout: 2000 })}>
                        <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                הודעות שלא נקראו
                            </Typography>
                            <Box sx={{height: "400px", overflowY: "auto", borderRadius: "10px"}}>
                            </Box>
                        </Box>
                    </Grow>
                </Grid>
            </Grid>
        </Container>
    )
}

