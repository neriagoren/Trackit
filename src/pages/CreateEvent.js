import {Button, Container, Grow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {memo, useCallback, useEffect, useState } from "react";
import Day from "../Calendars/Day";
import dayjs from "dayjs";
import { Grid } from "@mui/material";

import axios from 'axios';

import customParseFormat from 'dayjs/plugin/customParseFormat'


import {Counter} from "../hooks/Counter";
import CreateEventForm from "../Components/CreateEventForm";



function CreateEvent() {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours using API

    
    const [date, setDate] = useState(null);

   
   //get time from database - TEST
    const [time, setTime] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8989/time").then((response) => {
            setTime(()=> response.data)
        })
    })

    
    // modify date and insert time into database
    const modifyDate = () => {

    }
  
    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={5}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={500}>
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: "0px 0px 2px gray"}}>
                    <Typography color={"gray"} fontSize={"small"} p={1}>
                        צור תגבור
                    </Typography>  
                       {/* { date != null && date.toISOString()}
                       <br/>
                       {time} */}
                        <CreateEventForm date={date} setDate={setDate}/>
                        <Counter />       
                </Box> 
            </Grow>
            </Grid>
            <Grid item xs={5}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={1000}>
                        <Box sx={{bgcolor: 'background.paper' , borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>                   
                            {
                                date !== null ?
                                <Day date={date} setDate={setDate} from={"create"} />
                            :
                                <Box sx={{p:2}}>
                                     <Typography fontWeight={"bold"} color={"gray"}>
                                         בחר תאריך כדי לבדוק את האג'נדה היומית שלך
                                    </Typography>
                                </Box>   
                            }
                        </Box>
                    </Grow>
            </Grid>
            </Grid>
        </Container>
    )
}

export default memo(CreateEvent);