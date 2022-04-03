import * as React from "react";
import TableRow from "@mui/material/TableRow";
import {Button, Divider, ListItem, TableCell, Tooltip} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Unit from "./Unit";
import Event from "./Event";
import List from "@mui/material/List";


const hours = [
   "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
    "20:00","21:00","22:00","23:00","00:00"
];



const range = (start, end) => {
    return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}
const agenda = [0,2];
const arr = [...range(agenda[0],agenda[1])];



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
        <Box sx={{ height:"400px", overflowY:"auto", p:2, display:"flex", direction:"row"}}>
            <List sx = {{width:"20%"}}>
                {hours.map((hour,index) => (
                    <>
                        <ListItem sx={{height:"50px", p:0}}>
                            <Box sx={{ width:"25%", height:"100%", display: "flex",
                                flexDirection: "column",
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
                {hours.map((hour,index) => (

                    <ListItem sx={{height:"50px", p:0}}>
                        <Box sx={{width:"100%"}}>
                            <Box sx={{backgroundColor:  "lightblue" , height:"25px"}}>
                            </Box>

                            <Divider/>

                            <Box sx={{backgroundColor: "lightblue" , height:"25px"}}>

                            </Box>
                        </Box>

                    </ListItem>

                ))}
            </List>



        </Box>
        </Box>
    )
}
