import {Container, Grow} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useState,  useEffect } from "react";
import axios from 'axios';


const hours = ["08","09","10","11","12","13","14",
                "15","16","17","18","19","20","21","22","23"];

const minutes = ["00", "15", "30", "45"];

export default function Create() {

    const [courses, setCourses]         = useState([]);
    const [course, setCourse]           = useState("");
    const [startTime , setStartTime]    = useState("");
    const [startHour, setStartHour]     = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [endHour, setEndHour]         = useState("");
    const [endMinute, setEndMinute]     = useState("");

    const onHourChange = (event) => {
        if (event.target.id === "start") {
            setStartHour(()=> event.target.value)
        }
        else {
            setEndHour(() => event.target.value)
        }
    }

    const onMinuteChange = (event) => {
        if (event.target.id === "start") {
            setStartMinute(()=> event.target.value)
        }
        else {
            setEndMinute(() => event.target.value)
        }
    }

    const handleCourse = (event) => {
        setCourse(event.target.value);
    };

    
    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
    },[])



    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={500}>
            <Box sx={{height:"600px", bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                <Typography color={"gray"} fontSize={"small"} p={1}>
                    צור אירוע
                </Typography>

                    <div>
                        {"בקורס: "}

                    <select name="courses" id="courses" required defaultValue={"desc"} class="select">
                        <option disabled={"true"} value="desc">בחר קורס</option>

                        {
                            courses.map((course) => (
                                
                                <option onClick={handleCourse} value={course.name}> {course.name} </option>
                            ))
                        }
            
                    </select>
                    </div>
                    
                    <div>
                        {"בתאריך: "}

                    <input type={"date"} min="2022-04-27"  class="select"/>   

                    </div>

            

                    <div>
                    
                    {"משעה: "}

                    <select name="hours" id="hours" required defaultValue={"desc"}  class="select" disabled={startHour === ""}>
                        <option disabled={"true"} value="desc"> בחר דקות </option>
                        {
                            minutes.map(minute => (
                                <option onClick={onMinuteChange}  id="start" value={minute}> {minute} </option>
                            ))
                        }
                    </select>

                    <select name="hours" id="hours" required defaultValue={"desc"}  class="select">
                        <option disabled={"true"} value="desc"> בחר שעה </option>

                        {
                            hours.map(hour => (
                              <option onClick={onHourChange} id="start" value={hour}>{hour}</option>    
                            ))
                        }
                    </select>

                    {" עד "}

                   

                    <select required defaultValue={"desc"}  class="select" disabled={endHour ===""}>
                        <option disabled={"true"} value="desc"> בחר דקות </option>
                        {
                            minutes.map(minute => (
                                <option onClick={onMinuteChange} id="end" disabled={startHour === endHour && parseInt(minute) <= parseInt(startMinute)} value={minute}> {minute} </option>
                            ))
                        }
                    </select>

                    <select  required defaultValue={"desc"}  class="select" disabled={startMinute === ""}>
                    <option disabled={"true"} value="desc"> בחר שעה </option>
                    {
                            hours.map(hour => (
                              <option onClick={onHourChange} id="end" disabled={parseInt(hour) < parseInt(startHour)} value={hour}>{hour}</option>    
                            ))
                        }
                        
                    </select>

                    </div>
                

            </Box>
            </Grow>
        </Container>
    )
}
