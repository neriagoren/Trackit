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

const event = [4,8];
const events = [[1,5], [6,9], [15,22]];

const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}

const indexes = [...range(0,33)];

const finalDayFunc = () => {
    let arr = [...range(0,(2*events.length)-1 )];
    let day = [];
    arr.map((index)=> (
            index % 2 === 0 ?
                day.push(events[index/2])
                :
                day.push([events[(index-1)/2][1],events[( index !== arr.length-1 ?  (index+1)/2 : events.length-1)][0]])
        ))

    return day;

}

const finalDay = finalDayFunc();


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
            {console.log(finalDay)}
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
                    indexes.slice(0,events[0][0]).map((index) => (
                        <ListItem key={index} sx={{height:"50px", p:0}}>
                            <Box sx={{width:"100%" , height:"100%"}}>
                                <Divider />
                            </Box>
                        </ListItem>))
                }

                {
                    finalDay.map((event,index) => (
                            index % 2 === 0
                                ?
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
                                :
                                    indexes.slice(event[0],event[1]).map((index) => (
                                    <ListItem  key={index} sx={{height:"50px", p:0}}>
                                        <Box sx={{width: "100%", height: "100%"}}>
                                            <Divider/>
                                        </Box>
                                    </ListItem>))

                        ))
                }

                {
                    indexes.slice(events[events.length - 1][1], 34).map((index) => (
                        <ListItem key={index} sx={{height: "50px", p: 0}}>
                            <Box sx={{width: "100%", height: "100%"}}>
                                <Divider/>
                            </Box>
                        </ListItem>))
                }
            </List>
        </Box>
        </Box>
    )
}
