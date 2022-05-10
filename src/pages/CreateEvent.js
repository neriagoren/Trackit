import {Button, Container, Grow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useState,  useEffect } from "react";
import axios from 'axios';
import Day from "../Calendars/Day";
import {hours, minutes} from '../Resources/constants';
import dayjs, { Dayjs } from "dayjs";
import { Grid, Stack , OutlinedInput, Chip} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import customParseFormat from 'dayjs/plugin/customParseFormat'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
        //setSelectedStudents(oldArray => [...oldArray, event.target.value])
        const {
            target: { value },
          } = event;
          setSelectedStudents(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    }

    useEffect(() => {
        axios.get("http://localhost:8989/courses").then(response => {
            setCourses(() => response.data)
        })
    }, [])

    
    const handleDate = (newValue) => {
      
            setDate(() => newValue)
        
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    boxShadow: "0px 0px 2px gray"}}>

                    <Typography color={"gray"} fontSize={"small"} p={1}>
                        צור אירוע
                    </Typography>


                    <Stack sx={{overflowY :"auto" , height:"600px", p:1, rowGap:2}}>

                        <FormControl  sx={{direction:"ltr", width:"50%"}}>
                        <Select
                        id="demo-simple-select"
                        displayEmpty
                        value={course}
                        onChange={handleCourse}
                        renderValue={(selected) => {
                            if (selected.length == 0) {
                                return  "בחר קורס"
                            }
                            return selected;
                        }}
                        MenuProps= {{style: {
                            maxHeight: 400,
                               },
                         }}
                        >


                          <MenuItem sx={{direction:"rtl"}} disabled value="">
                            <> בחר קורס</>
                        </MenuItem>
                        
                        {
                            courses.map(c => {
                                return (
                                    <MenuItem  sx={{direction:"rtl"}} value={c.name } disabled={course === c.name}> {c.name}</MenuItem>
                                )
                            })
                        }

                        </Select>
                        </FormControl>

                        <FormControl  sx={{direction:"ltr", width:"50%"}}>

                        <Select
                        multiple
                        displayEmpty
                        id="demo-simple-select"
                        value={selectedStudents}
                        onChange={handleStudent}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length == 0) {
                                return  <>בחר סטודנטים</>;
                            }
                            return (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                            )
                          
                        }}
                        MenuProps= {{style: {
                            maxHeight: 400,
                               },
                         }}
                        >
                          <MenuItem sx={{direction:"rtl"}} disabled value="">
                            <> בחר סטודנטים</>
                        </MenuItem>
                        {
                            students.map(student => {
                                return (
                                    <MenuItem  sx={{direction:"rtl"}} value={student }> {student}</MenuItem>
                                )
                            })
                        }

                        </Select>

                        </FormControl>

                        
                        
                        <Box>
                        <DesktopDatePicker
                            minDate={dayjs()}
                            inputFormat="DD-MM-YYYY"
                            value={date}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        
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

                    </Stack>
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
        </LocalizationProvider>
    )
}
