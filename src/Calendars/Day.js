import * as React from "react";
import {Button, Divider, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";


const hours = [
   "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
    "20:00","21:00","22:00","23:00","00:00"
];


const eventsArray = {
        15: {
        "date":"",
        "start":15,
        "end":26,
        "title":"",
        "location":""
        },
        2: {
            "date":"",
            "start":2,
            "end":8,
            "title":"",
            "location":""
        },
};

const sortedEventsKeys = Object.keys(eventsArray).sort(function(a, b){return a - b});


// 0 and 34 indexes are out of selection
const events = [[1,5], [15,26]];

const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}

const indexes = [...range(0,33)];

const createAgenda = () => {
    let agenda = [];
    events.map((event,index)=> {
            index === 0 && agenda.unshift([0,events[0][0]])
            agenda.push(event)
            index < events.length-1 && agenda.push([events[index][1],events[index+1][0]])
            index === events.length-1 && agenda.push([events[events.length-1][1],34])
    })
    return agenda;
}

const agenda = createAgenda();


export default function Day() {
    return (
        <Box>
        <Box sx={{display:"flex", direction:"row", alignItems:"center", justifyContent:"center"}}>
            <Button>
                {"<"}
            </Button>
            <Typography textAlign={"center"}>
                יום ראשון 3 אפריל
            </Typography>
            <Button>
                {">"}
            </Button>
        </Box>
            <Box sx={{ height:"400px", overflowY:"auto", pr:3,pl:3, display:"flex", direction:"row" }}>
            <List sx = {{width:"20%"}}>
                {hours.map((hour,index) => (
                    <>
                        <ListItem sx={{height:"100px", p:0}}>
                            <Box sx={{ width:"25%", height:"100%", display: "flex",
                                flexDirection: "column",
                                mr:2,
                                justifyContent: "center"}}>
                                <Typography textAlign={"center"}>
                                    {hour}
                                </Typography>
                            </Box>
                        </ListItem>
                    </>
                ))}
            </List>

            <List sx = {{width:"80%"}}>
                {
                    agenda.map((event,index) => (
                            index % 2 === 0
                                ?
                                    indexes.slice(event[0],event[1]).map((index) => (
                                    <ListItem  key={index} sx={{height:"50px", p:0}}>
                                        <Box sx={{width: "100%", height: "100%"}}>
                                            <Divider/>
                                        </Box>
                                    </ListItem>))
                                :
                                indexes.slice(event[0],event[1]).map((index) => (
                                    <ListItem  key={index} sx={{height:"50px", p:0}}>
                                        <Box sx={{width:"100%", backgroundColor:  "#2596be" , height:"100%"}}>
                                            {
                                                index === event[0] &&
                                                <Typography color={"white"} textAlign={"right"} fontWeight={"bold"} mr={1}>
                                                    תגבור מבני נתונים
                                                </Typography>
                                            }
                                            {
                                                index+1 === event[1] &&
                                                <Typography color={"white"} textAlign={"left"} ml={1} mt={ event[1]-event[0] === 1 ? 0 : 2 }>
                                                    מיקום 6/210
                                                </Typography>
                                            }
                                        </Box>
                                    </ListItem>))

                        ))
                }
            </List>
        </Box>
        </Box>
    )
}
