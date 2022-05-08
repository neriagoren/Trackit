import {Button, Container, Grow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useState,  useEffect } from "react";
import axios from 'axios';
import Day from "../Calendars/Day";
import {hours, minutes} from '../Resources/constants';
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import customParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(customParseFormat)


export default function CreateEvent() {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours using API

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState("");
    const [startHour, setStartHour] = useState(-1);
    const [startMinute, setStartMinute] = useState(-1);
    const [endHour, setEndHour] = useState(-1);
    const [endMinute, setEndMinute] = useState(-1);
    const [students, setStudents] = useState(["יוסף אמיתי", "ברוך בן ברוך", "מירב ציון", "רונטל צבי", "אסתי לוי", "מיכאל דנן"]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [date, setDate] = useState(null);
    const [location, setLocation] = useState("");

    const [dateParsed, setDateParsed] = useState("");


    const today = dayjs().get('year') + "-" + ((dayjs().get('month') + 1) < 10 ? "0" + (dayjs().get('month') + 1) : (dayjs().get('month') + 1) ) + "-" + ((dayjs().get('date') < 10) ? "0" + dayjs().get('date') : dayjs().get('date'));


    useEffect(()=> {
        if (date !== null) {
        setDateParsed(() => date.get('year') + "-" + ((date.get('month') + 1) < 10 ? "0" + (date.get('month') + 1) : (date.get('month') + 1) ) + "-" + ((date.get('date') < 10) ? "0" + date.get('date') : date.get('date')))
            
        }
    }, [date])

    

    const onLocationChange = (event) => {
        setLocation(() => event.target.value)
    }

    const onHourChange = (event) => {
        if (event.target.id === "start") {
            setStartHour(() => event.target.value)
        } else {
            setEndHour(() => event.target.value)
        }
    };

    const onMinuteChange = (event) => {
        if (event.target.id === "start") {
            setStartMinute(() => event.target.value)
        } else {
            setEndMinute(() => event.target.value)
        }
    };

    const handleCourse = (event) => {
        setCourse(event.target.value);
    };

    const handleStudent = (event) => {
        setSelectedStudents(oldArray => [...oldArray, event.target.value])
    }

    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
    }, [])

    
    const handleDate = (event) => {
        if (event.target.value == "") {
            setDate(() => null)
            setDateParsed(() => "")
        }
        else {
            setDate(() => dayjs(event.target.value, "YYYY-MM-DD"))
        }

    }

    

    useEffect(() => {

        if (startHour > endHour) {
            setEndHour(() => -1)
            setEndMinute(() => -1)
        }
        else if (startHour == endHour && startMinute >= endMinute) {
            setEndMinute(() => -1)
        }

    }, [startHour, startMinute])

    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={6}>

            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={500}>
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: "0px 0px 2px gray"
                }}>
                    <Typography color={"gray"} fontSize={"small"} p={1}>
                        צור אירוע
                    </Typography>
                    <Box sx={{overflowY :"auto" , height:"600px"}}>
                        <Box sx={{p:1}}>

                        <FormControl  sx={{direction:"ltr", width:"50%"}}>
                        <InputLabel   id="demo-simple-select-label">בחר קורס</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course}
                        label="בחר קורס"
                        onChange={handleCourse}
                        >

                        {
                            courses.map(c => {
                                return (
                                    <MenuItem  sx={{direction:"rtl"}} value={c.name } disabled={course === c.name}> {c.name}</MenuItem>
                                )
                            })
                        }

                        </Select>
                    </FormControl>


                           
                        </Box>
                        <Box>
                        <select name="students" id="students" required defaultValue={"desc"} className="select">
                                <option disabled={"true"} value="desc">בחר משתתפים בתגבור</option>
                                {
                                    students.map((student) => (
                                        <option onClick={handleStudent}  value={student }> {student}  </option>
                                    ))
                                }
                            </select>
                        </Box>
                        <Box>
                            <input value={dateParsed} onChange={handleDate} type={"date"} min={today} className="select"/>
                        </Box>
                        <Box>
                            <select required defaultValue={-1} className="select"
                                    disabled={startHour === -1}>
                                <option disabled={"true"} value={-1}> בחר דקות</option>
                                {
                                    minutes.map(minute => (
                                        <option onClick={onMinuteChange} id="start" value={(minute)}> {minute === 0 ? "00" : minute} </option>
                                    ))
                                }
                            </select>

                            <select  required defaultValue={-1} className="select" >
                                <option disabled={"true"} value={-1}> בחר שעה</option>

                                {
                                    hours.map(hour => (
                                        <option onClick={onHourChange} id="start" value={hour}>{hour}</option>
                                    ))
                                }
                            </select>
                        </Box>


                        <Box>
                            <select required defaultValue={-1} className="select" disabled={endHour === -1} >
                                <option selected={endMinute === -1} disabled={"true"} value={-1}> בחר דקות</option>
                                {
                                    minutes.map(minute => (
                                        <option
                                            onClick={onMinuteChange}
                                            id="end"
                                            disabled={startHour === endHour && (minute) <= startMinute}
                                            value={minute}> {minute === 0 ? "00" : minute} </option>
                                    ))
                                }
                            </select>
                            <select required defaultValue={-1} className="select" disabled={startMinute === -1}>
                                <option selected={endHour === -1} disabled={"true"} value={-1}> בחר שעה</option>
                                {
                                    hours.map(hour => (
                                        <option
                                            onClick={onHourChange}
                                            id="end"
                                            disabled={hour < startHour}
                                            value={hour}> {hour} </option>
                                    ))
                                }

                            </select>
                        </Box>

                        <Box>
                            <input type={"text"} onChange={onLocationChange} placeholder={"מיקום האירוע"} className={"select"} />
                        </Box>

                        <Box sx={{p:2}}>
                            <Button sx={{fontSize:"18px", color:"white" , backgroundColor:"#2596be", '&:hover': {
                                    color:"#2596be"
                                }}}>
                                צור אירוע
                            </Button>
                        </Box>
                        <Box dir={"ltr"}>
                            {startHour + ":" + ( startMinute === 0 ?  "00" : startMinute.toString())}
                            <br/>
                            {endHour + ":" + ( endMinute === 0 ?  "00" : endMinute.toString())}
                            <br/>
                            {
                                date != null &&
                                date.toString()
                            }
                            <br/>
                            {location}
                            <br/>
                            {"אחרי הזנת תאריך ושעות לבצע בדיקה אם זה פנוי!"}
                        </Box>
                    </Box>
                </Box>
            </Grow>
            </Grid>
            <Grid item xs={5}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={1000}>
            
                        <Box sx={{bgcolor: 'background.paper' , borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                        
                        

                            {
                           
                                date !== null ?
                               

                                 <Day date={date} setDate={setDate} from={"create"} />



                        :
                                <Box sx={{p:2}}>
                                     <Typography fontWeight={"bold"} color={"gray"}>
                                         בחר תאריך כדי לבדוק את האג'נדה היומית שלך
                                    </Typography>
                                </Box>
                                
                            }
                        </Box>
                    </Grow>
            </Grid>
            </Grid>
        </Container>
    )
}
