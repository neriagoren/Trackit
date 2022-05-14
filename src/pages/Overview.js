import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Grow } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Day from "../Calendars/Day";
import Month from "../Calendars/Month";
import GlobalBoard from "../Components/GlobalBoard";
import UnreadMessages from "../Components/UnreadMessages";
import dayjs from "dayjs";

import Agenda from "../Components/Agneda";


export default function Overview() {


    return (
        <Container sx={{ paddingBottom: 20, paddingTop: 2 }}>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                {/* 
                    in Agenda Component, we have 2 components - Day, Month
                    they share same state - date object
                    thats why i excluded them from overview so that
                    whenever date changes it wont re-render the unrelated
                    components - unread messages and global board
                */}
                <Agenda />

                <Grid item xs={6}>
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        {...({ timeout: 1500 })}>
                        <Box sx={{ bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray" }}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                לוח עדכונים כללי
                            </Typography>
                            <GlobalBoard />
                        </Box>
                    </Grow>
                </Grid>

                <Grid item xs={5}>
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        {...({ timeout: 2000 })}>
                        <Box sx={{ bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray" }}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                הודעות שלא נקראו
                            </Typography>
                            <UnreadMessages />
                        </Box>
                    </Grow>
                </Grid>
            </Grid>
        </Container>
    )
}

