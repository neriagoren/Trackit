import {Button, Container, Grow} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useState,  useEffect } from "react";
import axios from 'axios';
import {hours, minutes} from '../Resources/constants';
import dayjs from "dayjs";

export default function Create() {

    const [courses, setCourses] = useState(["אלגברה לינארית", "חשבון דיפרנציאלי ואינטגרלי", "מתמטיקה בדידה", "מבוא למדעי המחשב"]);
    const [course, setCourse] = useState(-1);
    const [startHour, setStartHour] = useState(-1);
    const [startMinute, setStartMinute] = useState(-1);
    const [endHour, setEndHour] = useState(-1);
    const [endMinute, setEndMinute] = useState(-1);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [date, setDate] = useState("");
    const today =dayjs().get('year') + "-" + ((dayjs().get('month') + 1) < 10 ? "0" + (dayjs().get('month') + 1) : (dayjs().get('month') + 1) ) + "-" + dayjs().get('date');

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


    // useEffect(() => {
    //     axios.get("http://localhost:8989/courses").then(response => {
    //         setCourses(() => response.data)
    //     })
    // }, [])

    useEffect(() => {
        if (startHour > endHour && endHour !== -1) {
            setEndHour(() => -1);
            setEndMinute(() => -1);
        }
        else {
            if (startHour === endHour && startMinute >= endMinute) {
                setEndMinute(() => -1)
            }
        }
    }, [startHour])

    const handleDate = (event) => {
        setDate(() => event.target.value )
    }
    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={500}>
                <Box sx={{
                    height: "600px",
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: "0px 0px 2px gray"
                }}>
                    <Typography color={"gray"} fontSize={"small"} p={1}>
                        צור אירוע
                    </Typography>
                    <Box>
                        <Box>
                            <select name="courses" id="courses" required defaultValue={"desc"} className="select">
                                <option disabled={"true"} value="desc">בחר קורס</option>
                                {
                                    courses.map((course) => (
                                        <option onClick={handleCourse}  value={/* course.name*/ course }> {/*course.name*/ course} </option>
                                    ))
                                }
                            </select>
                        </Box>
                        <Box>
                            <input onChange={handleDate} type={"date"} min={today} className="select"/>
                        </Box>

                        <Box>
                            <select name="minutes" id="minutes" required defaultValue={-1} className="select"
                                    disabled={startHour === -1}>
                                <option disabled={"true"} value={-1}> בחר דקות</option>
                                {
                                    minutes.map(minute => (
                                        <option onClick={onMinuteChange} id="start" value={(minute)}> {minute} </option>
                                    ))
                                }
                            </select>

                            <select  name="hours" id="hours" required defaultValue={-1} className="select" >
                                <option disabled={"true"} value={-1}> בחר שעה</option>

                                {
                                    hours.map(hour => (
                                        <option onClick={onHourChange} id="start" value={(hour)}>{hour}</option>
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
                                            value={(minute)}> {minute} </option>
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
                                            value={(hour)}> {hour} </option>
                                    ))
                                }

                            </select>
                        </Box>

                        <Box sx={{p:2}}>
                            <Button sx={{fontSize:"18px", color:"white" , backgroundColor:"#2596be", '&:hover': {
                                    color:"#2596be"
                                }}}>
                                צור אירוע
                            </Button>
                        </Box>
                        <Box dir={"ltr"}>
                            {
                                startHour + ":" + ( startMinute === 0 ?  "00" : startMinute)
                            }
                            <br/>
                            {
                                endHour + ":" + ( endMinute === 0 ?  "00" : endMinute)
                            }
                        </Box>
                        {date}
                    </Box>
                </Box>
            </Grow>
        </Container>
    )
}
