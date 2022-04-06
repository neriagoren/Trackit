import * as React from "react";
import {Badge, Button, Divider, Grid, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import arraySupport from 'dayjs/plugin/arraySupport';
import {useState} from "react";


const datesOfEvents = [4,9,12,27];

const months = ["ינואר", "פברואר", "מרץ", "אפריל","מאי","יוני",
    "יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

dayjs.extend(arraySupport)

export default function Month() {


    const [day, setDay] = useState(dayjs())
    const [firstDay, setFirstDay] = useState(day.date(1).day())


    const onClickNext = () => {
        let d = dayjs([day.get('year'),day.get('month')+1,1])
        setDay(d)
        setFirstDay(d.date(1).day())
    }

    const onClickBefore = () => {
        let d = dayjs([day.get('year'),day.get('month')-1,1])
        setDay(d)
        setFirstDay(d.date(1).day())
    }

    return (
        <Box>
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button onClick={onClickBefore}>
                    {"<"}
                </Button>
                <Typography textAlign={"center"}>
                    { months[day.get('month')] + " " + day.get('year').toString() }
                </Typography>
                <Button onClick={onClickNext}>
                    {">"}
                </Button>
            </Box>
            <Box sx={{height: "auto", overflowY: "auto", pr: 3, pl: 3, pb:2}}>
                <Grid container spacing={2} columns={7} >
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                א
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                               ב
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                ג
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                ד
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                ה
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                ו
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"}}>
                            <Typography textAlign={"center"} color={"white"}>
                                ש
                            </Typography>
                        </Box>
                    </Grid>

                    { [...Array(firstDay + day.daysInMonth())].map((i,index) => (
                        <Grid item xs={1}>
                            {
                                index >= firstDay &&
                                <Box sx={{
                                    backgroundColor:(index-firstDay+1)===day.get('date') ? "lightblue": "#f5f5f5",
                                    height:"50px",
                                    borderRadius:"10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    border: (datesOfEvents.includes(index-firstDay+1) && dayjs().get('month') === day.get('month'))  && "2px solid #2596be" }}>

                                    <Typography textAlign={"center"} color={(index-firstDay+1)===day.get('date') && "white"}  fontWeight={(index-firstDay+1===day.get('date')) ? "bold" : ""}>
                                        {index-firstDay+1}
                                    </Typography>
                                </Box>
                            }

                        </Grid>
                    )) }



                </Grid>
            </Box>
        </Box>
    )
}
