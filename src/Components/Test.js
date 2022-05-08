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


export default function Test() {

    return (
        <Box sx={{height: "495px",  overflowY: "auto"}}>
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button>
                    {"<"}
                </Button>
                <Button>
                    5 april tuesday
                </Button>
                <Button >
                    {">"}
                </Button>
            </Box>
    <Grid container>
         <Grid item xs={4}>

        <Stack>
            {hours.map((hour, index) => (
                
                        <Box sx={{
                            height:"80px"
                        }}>
                            <Typography textAlign={"center"}>
                                {hour}
                            </Typography>
                        </Box>
                
            ))}
        </Stack>
        </Grid>
        <Grid item xs={8} >

                   
                    {/* <Stack sx={{mt:"10px"}}>
                        {
                            hours.map((hour, index) => (
                            <Box sx={{height:"80px", backgroundColor: index===3 ? "blue": "transparent"}}>
                            </Box> 
                            ))
                        }
                    
                
                    
                    </Stack> */}
             
                    
           
                    <Stack sx={{mt:"10px"}}>
                        {
                            hours.map((hour, index) => (
                                <Box sx={{height:"80px"}}>
                                    <Divider />
                                    {
                                        (index === 3 || index === 8) &&
                                        <Box sx={{borderRadius:"10px", height:"140px", backgroundColor: (index===3 || index===8) && "#2596be"}}>
                                            <Typography color={"white"} textAlign={"right"} fontWeight={"bold"} mr={1}>
                                                תגבור במבני נתונים
                                            </Typography>
                                    
                                            <Typography color={"white"} textAlign={"right"}  mr={1}>
                                                מיקום אולם הגפן
                                            </Typography>
                                        </Box>
                                    }
                                </Box> 
                                ))
                        }
                    </Stack>
       
        
        </Grid>
        </Grid>
        </Box>

    )
}