import * as React from "react";
import {Button, Divider, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import arraySupport from 'dayjs/plugin/arraySupport';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import axios from "axios";
import {hoursAgenda, months, days} from  '../Resources/constants'

import {Grid, Stack} from "@mui/material";

dayjs.extend(arraySupport)
dayjs.extend(customParseFormat)

const eventsArray = {
        "2": {
        "date":[2022,6],
        "start":2,
        "end":4,
        "title":"תגבור במבני נתונים",
        "location":"4/203"
        },
        "8": {
            "date":[2022,4],
            "start":8,
            "end":12,
            "title":"תגבור באלגוריתמים 1",
            "location":"6/210"
        },
        "14": {
            "date":[2022,4,23],
            "start":14,
            "end":22,
            "title":"תגבור במבוא למדעי המחשב 1",
            "location":"אולם הגפן"
        },
};


const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}
// 0 and 66 indexes are out of selection

const indexes = [...range(0,64)];


const createAgenda = () => {
    let sortedEventsKeys = Object.keys(eventsArray).sort(function(a, b){return a - b});
    let events = []
    sortedEventsKeys.map((key) => {
        events.push([parseInt(key),eventsArray[key].end])
    })
    let agenda = [];
    events.map((event,index)=> {
            agenda.push(event)
            index < events.length-1 && agenda.push([events[index][1],events[index+1][0]])

    })
    agenda.unshift([0,events[0][0]]);
    agenda.push([events[events.length-1][1],66]);
    return agenda;
}

const agenda = createAgenda();


// Rendering a given date...

export default function Day(props) {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours

    
    const [todayEvents, setTodayEvents] = useState({})
    const [day, setDay] = useState(props.date)

    useEffect(() => {
        
            setDay(() => props.date)
        
    }, [props.date])

    useEffect(() => {
        {
            axios.get("http://worldtimeapi.org/api/timezone/Asia/Jerusalem").then((response) => {
                console.log(response.data.utc_offset)
            })
        }
    }, [])

    const onClickNext = () => {
        let d = day.add(1, 'days')
        props.setDate(() => d)
    }

    const onClickBefore = () => {
        let d = day.subtract(1, 'days')
        props.setDate(() => d)
    }

    return (
        <Box>
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button onClick={onClickBefore} disabled={props.from === "create" && day.isBefore(dayjs())}>
                    {"<"}
                </Button>
                <Button>
                    {days[day.get('day')] + " "}
                    {day.get('date') + " "}
                    {months[day.get('month')]}
                </Button>
                <Button onClick={onClickNext}>
                    {">"}
                </Button>
            </Box>
            <Box sx={{height: "460px", overflowY: "auto", pr: 3, pl: 3, display: "flex", direction: "row"}}>
            <Grid container>
                <Grid item xs={3}>
                    <Stack>
                        {hoursAgenda.map((hour, index) => (
                            <Box sx={{height:"100px"}}>
                                <Typography textAlign={"center"}>
                                    {hour}
                                </Typography>
                            </Box>   
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={9} >
                    <Stack sx={{mt:"10px"}}>
                        {
                            indexes.map((index) => (
                                <Box sx={{height:"25px"}}>
                                    <Divider />
                                    {
                                        // if event occur here - render the box
                                        // calculate the size of box - 25px per 15min
                                        (index === 6) &&
                                        <Box sx={{borderRadius:"10px", height:"125px", backgroundColor: "#2596be", opacity:0.7}}>
                                            <Typography color={"white"} textAlign={"right"} fontWeight={"bold"} mr={1}>
                                                תגבור במבני נתונים
                                            </Typography>
                                            <Typography color={"white"} textAlign={"right"}  mr={1}>
                                                מיקום אולם הגפן
                                            </Typography>
                                        </Box>
                                    }
                                </Box>))
                        }     
                    </Stack>
                </Grid>
            </Grid>
 

            </Box>
        </Box>
    )
}
