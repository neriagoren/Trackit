import { Badge, Button, Container, Grow, TextField, Stack, OutlinedInput, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import Chip from '@mui/material/Chip';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import MenuItem from '@mui/material/MenuItem';


dayjs.extend(customParseFormat)


export default function CreateTutor() {

    // TAKE CARE OF DAYJS add offset +03:00/ +02:00 hours
    const [courses, setCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onFirstNameChange = (event) => {
        setFirstName(() => event.target.value)
    }

    const onLastNameChange = (event) => {
        setLastName(() => event.target.value)
    }

    const onUsernameChange = (event) => {
        setUsername(() => event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(() => event.target.value)
    }

    const handleCourse = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCourses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
    }, [])



    return (
        <Container sx={{ paddingBottom: 20, paddingTop: 2 }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>

                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        timeout={500}>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            borderRadius: "10px",
                            boxShadow: "0px 0px 2px gray"
                        }}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                צור מתגבר
                            </Typography>
                            <Stack sx={{ width: "80%", height: "auto", p: 2, rowGap: 2 }}>

                                <TextField value={firstName} onChange={onFirstNameChange} placeholder={"שם פרטי"} />
                                <TextField value={lastName} onChange={onLastNameChange} placeholder={"שם משפחה"} />
                                <TextField value={username} onChange={onUsernameChange} placeholder={"שם משתמש"} />
                                <TextField value={password} onChange={onPasswordChange} placeholder={"סיסמא"} />

                                <Select
                                    multiple
                                    displayEmpty
                                    id="demo-simple-select"
                                    value={selectedCourses}
                                    onChange={handleCourse}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length == 0) {
                                            return "בחר קורסים";
                                        }
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((course, index) => (
                                                    <Chip key={index} label={course.name} />
                                                ))}
                                            </Box>
                                        )

                                    }}
                                    MenuProps={{
                                        style: {
                                            maxHeight: 400,
                                        },
                                    }}
                                >
                                    <MenuItem sx={{ direction: "rtl" }} disabled value="">
                                        בחר קורסים
                                    </MenuItem>
                                    {
                                        courses.map((course, index) => {
                                            return (
                                                <MenuItem key={index} sx={{ direction: "rtl" }} value={course}> {course.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                                <Button sx={{
                                    fontSize: "18px", color: "white", backgroundColor: "#2596be", '&:hover': {
                                        color: "#2596be"
                                    }
                                }}>
                                    צור מתגבר
                                </Button>
                            </Stack>
                        </Box>
                    </Grow>
                </Grid>
            </Grid>
        </Container>
    )
}
