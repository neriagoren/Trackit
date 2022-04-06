import React from "react";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Day from "../Calendars/Day";
import Month from "../Calendars/Month";
import GlobalBoard from "../Components/GlobalBoard";



export default function Overview() {
    return (
        <Box sx={{paddingBottom: 20, paddingTop: 2, width:"100%", mr:"250px"}}>
            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} >
                <Grid item xs={5}>
                    <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                    <Typography color={"gray"} fontSize={"small"} p={1}>
                            יומן חודשי
                        </Typography>
                        <Month />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                    <Typography color={"gray"} fontSize={"small"} p={1}>
                            יומן יומי
                        </Typography>
                            <Day />
                    </Box>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={4}>
                    <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            לוח עדכונים כללי
                        </Typography>
                        <GlobalBoard />
                    </Box>
                </Grid>

                <Grid item xs={5}>
                    <Box sx={{bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            הודעות שלא נקראו
                        </Typography>
                        <Box sx={{height: "400px", overflowY: "auto", borderRadius: "10px"}}>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

