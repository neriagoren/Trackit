import {Container, FormControl, Grow, InputLabel, ListItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';

export default function Create() {

    const [courses, setCourses] = React.useState([]);

    const [course, setCourse] = React.useState("");


    const handleChange = (event) => {
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


                <Box sx={{height: "400px", overflowY: "scroll", p:1}}>
                    <FormControl sx={{width:"30%"}}>
                    <InputLabel>בחר קורס</InputLabel>
                        <Select
                            value={course}
                            onChange={handleChange}>

                            {
                                courses.map((course, index) => {
                                    return(
                                    <MenuItem value={index}> {course.name} </MenuItem>
                                    )})
                            }

                        </Select>
                    </FormControl>
                    <Typography>
                        בחר תאריך ושעה:
                    </Typography>
                
                </Box>

            </Box>
            </Grow>
        </Container>
    )
}
