import * as React from "react";
import {Button, Divider, ListItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import arraySupport from 'dayjs/plugin/arraySupport';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { positions } from '@mui/system';

dayjs.extend(arraySupport)
dayjs.extend(customParseFormat)




const hours = ["08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
    "20:00","21:00","22:00","23:00","00:00"];

const range = (start, end) => {
        return Array(parseInt(end) - parseInt(start) + 1).fill().map((_, idx) => parseInt(start) + idx)
}

// indexes of hours splitted to 4 units e.g - 08:00, 08:15, 08:30, 08:45
const indexes = [...range(0,64)];
    

export default function Test() {

    return (
        <Box >
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button>
                    {"<"}
                </Button>
                <Button>
                   יום ראשון 8 מאי
                </Button>
                <Button >
                    {">"}
                </Button>
            </Box>
            <Box sx={{height: "460px", overflowY: "auto", pr: 3, pl: 3, display: "flex", direction: "row"}}>

            <Grid container>
                <Grid item xs={3}>
                    <Stack>
                        {hours.map((hour, index) => (
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