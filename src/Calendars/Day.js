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
            "title":"מבוא למדעי המחשב 1",
            "location":"אולם הגפן"
        },
};


const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}
// 0 and 66 indexes are out of selection
const indexes = [...range(0,65)];

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

    const [todayEvents, setTodayEvents] = useState({})
    const [day, setDay] = useState(props.date)

    useEffect(() => {
        
            setDay(() => props.date)
        
    }, [props.date])

    // useEffect(() => {
    //     {
    //         axios.get("http://worldtimeapi.org/api/timezone/Asia/Jerusalem").then((response) => {
    //             console.log(response.data.utc_offset === "+03:00")
    //         })
    //     }
    // }, [])

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
                <Button onClick={onClickBefore}>
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
                <List sx={{width: "20%"}}>
                    {hoursAgenda.map((hour, index) => (
                        <>
                            <ListItem key= {index} sx={{height: "100px", p: 0}}>
                                <Box sx={{
                                    width: "25%", height: "100%", display: "flex",
                                    flexDirection: "column",
                                    mr: 2,
                                    justifyContent: "center"
                                }}>
                                    <Typography textAlign={"center"}>
                                        {hour}
                                    </Typography>
                                </Box>
                            </ListItem>
                        </>
                    ))}
                </List>

                <List sx={{width: "80%"}}>
                    {agenda.map((event) => (
                        
                        Object.keys(eventsArray).includes(event[0].toString())
                        ?
                        indexes.slice(event[0], event[1]).map((index) => (
                            <ListItem key={index} sx={{height: "25px", p: 0}}>
                                <Box sx={{
                                    width: "100%", backgroundColor: "#2596be", height: "100%",
                                    borderRadius: index === event[0] && index + 1 === event[1]
                                        ? "10px 10px 10px 10px" : index === event[0]
                                            ? "10px 10px 0px 0px" : index + 1 === event[1]
                                                ? "0px 0px 10px 10px" : "0px 0px 0px 0px"
                                }}>
                                    {index === event[0] &&
                                        <Typography color={"white"} textAlign={"right"} fontWeight={"bold"}
                                                    mr={1}>
                                            {eventsArray[event[0].toString()].title}
                                        </Typography>}
                                    
                                    {index + 1=== event[1] &&
                                        <Typography color={"white"} textAlign={"left"} ml={1}
                                                    >
                                            {"מיקום " + eventsArray[event[0].toString()].location}
                                        </Typography>}
                                </Box>
                            </ListItem>))
                        :
                        indexes.slice(event[0], event[1]).map((index) => (
                            <ListItem key={index} sx={{height: "25px", p: 0}}>
                                <Box sx={{width: "100%", height: "100%"}}>
                                    <Divider/>
                                </Box>
                            </ListItem>))))}
                </List>
            </Box>
        </Box>
    )
}
