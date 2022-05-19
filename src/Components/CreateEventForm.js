
import { TextField, Button, Box, Stack, OutlinedInput, Chip } from "@mui/material";
import { React, useState, useEffect, memo } from "react";
import axios from 'axios';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import customParseFormat from 'dayjs/plugin/customParseFormat'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { hours, minutes } from '../Resources/constants';
import { StartTwoTone } from "@mui/icons-material";


dayjs.extend(customParseFormat)


function CreateEventForm(props) {

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


    // synthesize all inputs to data JSON object - send by axios POST
    const onCreate = () => {

        // stringifying dates to MySql
        let startDate = date.hour(startHour).minute(startMinute).format("YYYY-MM-DD hh:mm:ss");
        let endDate = date.hour(endHour).minute(endMinute).format("YYYY-MM-DD hh:mm:ss");
        let studentsIDS = [];
        selectedStudents.map(student => {
            studentsIDS.push(student.id)
        })

        // creating data JSON to send by axios POST
        let data = {
            course: course.id,
            students: studentsIDS,
            location: location,
            start: startDate,
            end: endDate
        }

        // CREATE EVENT! 
        // need to get tutor id somehow!!!! - DO IT LATER!
        // axios.post("http://localhost:8989/events/create-event", data).then(response => {
        //     console.log(response.data)
        // })



        // TESTS - checking get/post datetime objects
        // let newData = { time: startDate };
        // axios.post("http://localhost:8989/time", newData).then(response => {
        //     console.log(response.data)
        // })


        // axios.get("http://localhost:8989/time").then(response => {
        //     let d = dayjs(response.data);
        //     console.log(d.utcOffset() / 60)
        // })


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
                        <> בחר סטודנטים</>
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
                    renderInput={(params) => <TextField   {...params} />}
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
                        sx={{ width: "40%", ml: 1 }}
                        disabled={startHour == -1}
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
                        sx={{ width: "50%" }}

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
                        sx={{ width: "40%", ml: 1 }}
                        disabled={endHour == -1}
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
                        sx={{ width: "50%" }}

                        disabled={startMinute == -1}
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
                <TextField value={location} onChange={onLocationChange} placeholder={"מיקום האירוע"} />
                <Box>
                    <Button onClick={onCreate} sx={{
                        fontSize: "18px", color: "white", backgroundColor: "#2596be", '&:hover': {
                            color: "#2596be"
                        }
                    }}>
                        צור אירוע
                    </Button>
                </Box>
            </Stack>
        </LocalizationProvider>
    )
}

export default memo(CreateEventForm);