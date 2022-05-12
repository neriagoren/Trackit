import * as React from "react";
import {Button, Grid, Typography, Box} from "@mui/material";
import dayjs from "dayjs";
import arraySupport from 'dayjs/plugin/arraySupport';
import {useState, useEffect} from "react";
import {months, abbDays} from "../Resources/constants";
import DayGrid from "./DayGrid";


dayjs.extend(arraySupport)


// props.date for selected date...
//  like Day - it renders a given date
function Month(props) {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours


    const [datesOfEvents, setDatesOfEvents] = useState([4,9,12,27]);

    const [currentDay, setCurrentDay] = useState(dayjs())

    // const [selectedDay, setSelectedDay] = useState(currentDay)

    // the number of day of first day of month (0-6)
    const [firstDay, setFirstDay] = useState(currentDay.date(1).day())


    const onClickNext = () => {
        let d = dayjs([props.date.get('year'),props.date.get('month')+1,1])
        props.setDate(() => d);
        setFirstDay(d.date(1).day())
    }

    const onClickBefore = () => {
        let d = dayjs([props.date.get('year'),props.date.get('month')-1,1])
        props.setDate(() => d);
        setFirstDay(d.date(1).day())
    }

    const handleDayClick = (date) => {
        let d = dayjs([props.date.get('year'), props.date.get('month'), date]);
        props.setDate(() => d);
    }



    return (
        <Box>
            <Box sx={{display: "flex", direction: "row", alignItems: "center", justifyContent: "center"}}>
                <Button onClick={onClickBefore}>
                    {"<"}
                </Button>
                <Button>
                        { months[props.date.get('month')] + " " + props.date.get('year').toString() }
                </Button>
              
                <Button onClick={onClickNext}>
                    {">"}
                </Button>
            </Box>
            <Box sx={{height: "460px", overflowY: "hidden", pr: 3, pl: 3, pb:2}}>
                <Grid container spacing={2} columns={7} >
                    {
                        abbDays.map(day => {
                           return (
                            <DayGrid day={day}/>
                           )
                        })
                    }
                    {[...Array(firstDay + props.date.daysInMonth())].map((i,index) => (
                        <Grid item xs={1}>
                            {
                                index >= firstDay &&
                                <Box 
                                    onClick ={() => handleDayClick(index - firstDay + 1)}
                                    sx={{
                                    backgroundColor:((index-firstDay+1)===currentDay.get('date') && props.date.get('month') === currentDay.get('month'))? "lightblue":   index-firstDay + 1 === props.date.get('date') ? "yellow" : "#f5f5f5",
                                    height:"50px",
                                    borderRadius:"10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    border: (datesOfEvents.includes(index-firstDay+1) && dayjs().get('month') === props.date.get('month'))  && "2px solid #2596be" }}>

                                    <Typography textAlign={"center"} color={((index-firstDay+1)===currentDay.get('date') && props.date.get('month') === currentDay.get('month')) && "white"}  fontWeight={((index-firstDay+1)===currentDay.get('date') && props.date.get('month') === currentDay.get('month') || index-firstDay + 1 === props.date.get('date')) ? "bold" : ""}>
                                        {index-firstDay+1}
                                    </Typography>
                                </Box>
                            }
                        </Grid>))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default React.memo(Month);