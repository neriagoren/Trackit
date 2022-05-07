import {Badge, Button, Container, Grow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useState,  useEffect } from "react";
import axios from 'axios';
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


dayjs.extend(customParseFormat)


export default function CreateTutor() {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    

    const handleCourse = (event) => {
        setCourse(()=>event.target.value )
        setSelectedCourses(old => [ ...old,  event.target.value]);
    };


    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
    }, [])


    const removeSelected = (e) => {

        let newArray = selectedCourses.filter((value) => {
            return (
                value !== e
            )
        });
        setSelectedCourses(() => newArray);
    };
    

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
                        צור מתגבר
                    </Typography>
                    <Box sx={{overflowY :"auto" , height:"600px"}}>
                        <Box>
                            <select name="courses" id="courses" required defaultValue={"desc"} className="select">
                                <option disabled={"true"} value="desc">בחר קורס</option>
                                {
                                    courses.map((course) => (
                                        <option onClick={handleCourse}  value={course.name }> {course.name} </option>
                                    ))
                                }
                            </select>
                        </Box>
                       
                       
                        <Box sx={{direction:"ltr"}} >
                            {
                                selectedCourses.map((selected, index) => {
                                    return (
                                         <Chip onDelete={() => removeSelected(selected)}  label={selected} sx={{m:1}}/>
                                        
                                    )
                                })
                            }

                        </Box>
                          
                        <Box >

                        <FormControl  sx={{direction:"ltr", width:"50%"}}>
                        <InputLabel   id="demo-simple-select-label">בחר קורסים</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course}
                        label="בחר קורסים"
                        onChange={handleCourse}
                        >

                        {
                            courses.map(course => {
                                return (
                                    <MenuItem  sx={{direction:"rtl"}} value={course.name } disabled={selectedCourses.includes(course.name)}> {course.name}</MenuItem>
                                )
                            })
                        }

                        </Select>
                    </FormControl>

                        </Box>


                        <Box sx={{p:2}}>
                            <Button sx={{fontSize:"18px", color:"white" , backgroundColor:"#2596be", '&:hover': {
                                    color:"#2596be"
                                }}}>
                                צור מתגבר
                            </Button>
                        </Box>
                       
                    </Box>
                </Box>
            </Grow>
            </Grid>
                                   
            </Grid>
        </Container>
    )
}
