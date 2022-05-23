
import { TextField, Button, Box, Stack, OutlinedInput, Chip, Typography } from "@mui/material";
import { React, useState, useEffect, memo } from "react";
import axios from 'axios';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Cookies from "universal-cookie";

import customParseFormat from 'dayjs/plugin/customParseFormat'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { hours, minutes } from '../Resources/constants';


dayjs.extend(customParseFormat)


function CreateEventForm(props) {

    const [submitted, setSubmitted] = useState(false);
    const [response, setResponse] = useState("");

    // hold array of course objects [{ID, NAME}]
    const [courses, setCourses] = useState([]);

    // hold object of course {ID, NAME}
    const [course, setCourse] = useState(null);

    // INTEGER VALUES
    const [startHour, setStartHour] = useState(-1);
    const [startMinute, setStartMinute] = useState(-1);
    const [endHour, setEndHour] = useState(-1);
    const [endMinute, setEndMinute] = useState(-1);

    // hold array of student objects [{ID, NAME}]
    // fix the get method to return only id and name!!! 
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [date, setDate] = useState(null);
    const [location, setLocation] = useState("");


    // DONE!
    const onCreate = () => {

        setSubmitted(() => true)

        // Checking if all inputs were filled
        // otherwise alert "נא למלא את כל הפרטים החסרים"
        if (course !== null &&
            startHour !== -1 &&
            startMinute !== -1 &&
            endHour !== -1 &&
            endMinute !== -1 &&
            date !== null && date.toString() != "Invalid Date" &&
            selectedStudents.length !== 0 &&
            location !== "") {
            // stringifying dates to MySql
            let startDate = date.hour(startHour).minute(startMinute).format("YYYY-MM-DD HH:mm:ss");
            let endDate = date.hour(endHour).minute(endMinute).format("YYYY-MM-DD HH:mm:ss");


            const cookies = new Cookies();

            axios.get("http://localhost:8989/users/get-id-name-by-token", {
                params: {
                    token: cookies.get("ACC_COOKIE")
                }
            }).then(response => {
                console.log(response.data[0])
                let data = {
                    tutor_id: response.data[0].id,
                    tutor_name: response.data[0].first_name + " " + response.data[0].last_name,
                    course: course,
                    students: selectedStudents,
                    location: location,
                    start: startDate,
                    end: endDate
                }

                // CREATE EVENT! 
                axios.post("http://localhost:8989/events/create-event", data).then(response => {
                })
                setResponse(() => "התגבור נוצר בהצלחה!")
            })
        }
        else {
            console.log(false)
            setResponse(() => "נא למלא את כל הפרטים החסרים!")
        }
    }

    useEffect(() => {
        setDate(() => props.date)
    }, [props.date])


    const handleDate = (newValue) => {
        if (newValue != null && !isNaN(newValue["$y"])) {
            props.setDate(() => newValue)
        }
        setDate(() => newValue)
    }

    const onStartHourChange = (event) => {
        setStartHour(() => event.target.value)
    }

    const onStartMinuteChange = (event) => {
        setStartMinute(() => event.target.value)
    }

    const onEndHourChange = (event) => {
        setEndHour(() => event.target.value)
    }

    const onEndMinuteChange = (event) => {
        setEndMinute(() => event.target.value)
    }

    const handleCourse = (event) => {
        setCourse(event.target.value);
    };

    const handleStudent = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedStudents(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const onLocationChange = (event) => {
        setLocation(() => event.target.value)
    }

    // fetch data on first render - courses and students
    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
        axios.get("http://localhost:8989/users/students").then(response => {
            setStudents(() => response.data)
        })
    }, [])


    // ensure validity of event duration
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack sx={{ width: "80%", height: "auto", p: 2, rowGap: 2 }}>
                <Select
                    error={course === null && submitted}
                    sx={{ color: course === null && "gray" }}
                    id="demo-simple-select"
                    displayEmpty
                    value={course === null ? "" : course}
                    onChange={handleCourse}
                    renderValue={(selected) => {
                        if (selected === "") {
                            return "בחר קורס"
                        }
                        return selected.name;
                    }}
                    MenuProps={{
                        style: {
                            maxHeight: 400,
                        },
                    }}
                >

                    <MenuItem sx={{ direction: "rtl" }} disabled value={""}>
                        בחר קורס
                    </MenuItem>

                    {
                        courses.map((c, index) => {
                            return (
                                <MenuItem key={index} sx={{ direction: "rtl" }} value={c} disabled={course === c}> {c.name}</MenuItem>
                            )
                        })
                    }
                </Select>

                <Select
                    error={selectedStudents.length === 0 && submitted}
                    sx={{ color: selectedStudents.length === 0 && "gray" }}
                    multiple
                    displayEmpty
                    id="demo-simple-select"
                    value={selectedStudents}
                    onChange={handleStudent}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return "בחר סטודנטים";
                        }
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((student, index) => (
                                    <Chip key={index} label={student.first_name + " " + student.last_name} />
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
                        בחר סטודנטים
                    </MenuItem>
                    {
                        students.map((student, index) => {
                            return (
                                <MenuItem key={index} sx={{ direction: "rtl" }} value={student}> {student.first_name + " " + student.last_name}</MenuItem>
                            )
                        })
                    }

                </Select>

                <DesktopDatePicker
                    minDate={dayjs()}
                    inputFormat="DD/MM/YYYY"
                    value={date}
                    onChange={handleDate}
                    renderInput={(params) => <TextField  {...params} sx={{ borderRadius: "5px", border: date === null && submitted && "1px solid red" }} />}
                    PopperProps={{
                        popperOptions: {
                            placement: "left",
                        }
                    }}
                    PaperProps={{
                        sx: { direction: "rtl" }
                    }}
                />
                <Box>
                    <Select
                        error={startMinute === -1 && submitted}
                        sx={{ width: "40%", ml: 1, color: startMinute === -1 && "gray" }}
                        displayEmpty
                        id="start"
                        value={startMinute}
                        onChange={onStartMinuteChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected == -1) {
                                return "בחר דקות"
                            }
                            return (
                                selected == 0 ? "00" : selected
                            )
                        }}
                    >
                        <MenuItem sx={{ direction: "rtl" }} disabled value={-1}>
                            בחר דקות
                        </MenuItem>
                        {
                            minutes.map(minute => {
                                return (
                                    <MenuItem id={"start"} value={minute}> {minute === 0 ? "00" : minute}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <Select
                        error={startHour === -1 && submitted}
                        sx={{ width: "50%", color: startHour === -1 && "gray" }}
                        displayEmpty
                        id="start"
                        value={startHour}
                        onChange={onStartHourChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected == -1) {
                                return "שעת התחלה"
                            }
                            return (
                                selected
                            )
                        }}
                        MenuProps={{
                            style: {
                                maxHeight: 200,
                            },
                        }}
                    >
                        <MenuItem sx={{ direction: "rtl" }} disabled value={-1}>
                            שעת התחלה
                        </MenuItem>
                        {
                            hours.map(hour => {
                                return (
                                    <MenuItem id={"start"} value={hour}> {hour}</MenuItem>
                                )
                            })
                        }

                    </Select>
                </Box>
                <Box>
                    <Select
                        error={endMinute === -1 && submitted}
                        sx={{ width: "40%", ml: 1, color: endMinute === -1 && "gray" }}
                        displayEmpty
                        id="start"
                        value={endMinute}
                        onChange={onEndMinuteChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected == -1) {
                                return "בחר דקות"
                            }
                            return (
                                selected == 0 ? "00" : selected
                            )
                        }}
                    >
                        <MenuItem sx={{ direction: "rtl" }} disabled value={-1}>
                            בחר דקות
                        </MenuItem>
                        {
                            minutes.map(minute => {
                                return (
                                    <MenuItem
                                        disabled={startHour === endHour && (minute) <= startMinute}
                                        id={"start"}
                                        value={minute}> {minute === 0 ? "00" : minute}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                    <Select
                        error={endHour === -1 && submitted}
                        sx={{ width: "50%", color: endHour === -1 && "gray" }}
                        displayEmpty
                        id="start"
                        value={endHour}
                        onChange={onEndHourChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected == -1) {
                                return "שעת סיום"
                            }
                            return (
                                selected
                            )
                        }}
                        MenuProps={{
                            style: {
                                maxHeight: 200,
                            },
                        }}
                    >
                        <MenuItem sx={{ direction: "rtl" }} disabled value={-1}>
                            שעת סיום
                        </MenuItem>
                        {
                            hours.map(hour => {
                                return (
                                    <MenuItem
                                        disabled={hour < startHour}
                                        id={"end"}
                                        value={hour}> {hour}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </Box>
                <TextField error={location === "" && submitted} value={location} onChange={onLocationChange} placeholder={"מיקום האירוע"} />
                <Stack>
                    <Button onClick={onCreate} sx={{
                        fontSize: "18px", color: "white", backgroundColor: "#2596be", '&:hover': {
                            color: "#2596be"
                        }
                    }}>
                        צור אירוע
                    </Button>

                    <Typography color={"red"}>
                        {response}
                    </Typography>
                </Stack>
            </Stack>
        </LocalizationProvider>
    )
}

export default memo(CreateEventForm);