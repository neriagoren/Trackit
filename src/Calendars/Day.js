import * as React from "react";
import {Button, Divider, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import dayjs from "dayjs";
import {useState} from "react";


const hours = ["08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
    "20:00","21:00","22:00","23:00","00:00"];
const months = ["ינואר", "פברואר", "מרץ", "אפריל","מאי","יוני",
"יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי" , "יום חמישי", "יום שישי" , "שבת"];

const eventsArray = {
        "1": {
        "date":"",
        "start":1,
        "end":2,
        "title":"תגבור במבני נתונים",
        "location":"4/203"
        },
        "4": {
            "date":"",
            "start":4,
            "end":6,
            "title":"תגבור באלגוריתמים 1",
            "location":"6/210"
        },
        "7": {
            "date":"",
            "start":7,
            "end":11,
            "title":"מבוא למדעי המחשב 1",
            "location":"אולם הגפן"
        },
};


const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}
// 0 and 34 indexes are out of selection
const indexes = [...range(0,33)];

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
    agenda.push([events[events.length-1][1],34]);
    return agenda;
}

const agenda = createAgenda();

export default function Day() {

    const [todayEvents, setTodayEvents] = useState({})

    return (
        <Box>
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button>
                    {"<"}
                </Button>
                <Typography textAlign={"center"}>
                    {days[dayjs().get('day')] + " "}
                    {dayjs().get('date') + " "}
                    {months[dayjs().get('month')]}

                </Typography>
                <Button>
                    {">"}
                </Button>
            </Box>
            <Box sx={{height: "400px", overflowY: "auto", pr: 3, pl: 3, display: "flex", direction: "row"}}>
                <List sx={{width: "20%"}}>
                    {hours.map((hour, index) => (
                        <>
                            <ListItem sx={{height: "100px", p: 0}}>
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
                    {
                        agenda.map((event) => (
                            Object.keys(eventsArray).includes(event[0].toString())
                                ?
                                indexes.slice(event[0], event[1]).map((index) => (
                                    <ListItem key={index} sx={{height: "50px", p: 0}}>
                                        <Box sx={{width: "100%", backgroundColor: "#2596be", height: "100%"}}>
                                            {
                                                index === event[0] &&
                                                <Typography color={"white"} textAlign={"right"} fontWeight={"bold"}
                                                            mr={1}>
                                                    {eventsArray[event[0].toString()].title}
                                                </Typography>
                                            }
                                            {
                                                index + 1 === event[1] &&
                                                <Typography color={"white"} textAlign={"left"} ml={1}
                                                            mt={event[1] - event[0] === 1 ? 0 : 2}>
                                                    {"מיקום " + eventsArray[event[0].toString()].location}
                                                </Typography>
                                            }
                                        </Box>
                                    </ListItem>))
                                :
                                indexes.slice(event[0], event[1]).map((index) => (
                                    <ListItem key={index} sx={{height: "50px", p: 0}}>
                                        <Box sx={{width: "100%", height: "100%"}}>
                                            <Divider/>
                                        </Box>
                                    </ListItem>))
                        ))
                    }
                </List>
            </Box>
        </Box>
    )
}
