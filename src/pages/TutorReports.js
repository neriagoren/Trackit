import React, { useState, useEffect } from "react";
import { Container, Grow, TextField, Button, Select, MenuItem, FormControl, Box, OutlinedInput } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { reverseString } from "../Resources/constants";
import { months } from "../Resources/constants";
import ReportTable from "../Components/ReportTable";
import CircularProgress from '@mui/material/CircularProgress';

dayjs.extend(customParseFormat);

const fontref = require('../Resources/Rubik-Regular-normal');


const columnsTutor = [
    { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
    { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
    { id: 'time', label: 'שעות', minWidth: 170, align: 'center' },
    { id: 'duration', label: 'משך התגבור', minWidth: 170, align: 'center' },
    { id: 'num', label: 'מספר סטודנטים', minWidth: 60, align: 'center' },
    { id: 'names', label: 'סטודנטים', minWidth: 200, align: 'center' },
];



function createDataTutor(date, course, time, duration, num, names) {
    return { date, course, time, duration, num, names };
}



// for the names of students table cell in report view
const stringifyStudents = (students) => {
    let names = "";
    students.map((student) => {
        names += student + ", "
    })

    names = names.slice(0, -2);
    return names;
};

// reverse only english cells
const reverseBody = (arr) => {
    let newA = arr;
    newA[1] = reverseString(arr[1]);
    newA[3] = reverseString(arr[3]);
    newA[5] = reverseString(arr[5]);
    return newA
}


// parse data received from server
const parseData = (data) => {

    let rows = [];
    // group events by event_id
    let events = {}
    data.map(row => {
        (events[row.event_id] || (events[row.event_id] = [])).push(row)
    })

    // get names of students
    Object.keys(events).map(async event_id => {
        let names = [];
        await events[event_id].map(async event => {
            await axios.get(`http://localhost:8989/users/get-student-by-id`, {
                params: {
                    student_id: event.student_id
                }
            }).then(response => {
                names.push(response.data.first_name + " " + response.data.last_name);
            })
        });

        await axios.get("http://localhost:8989/get-course-by-id", {
            params: {
                id: events[event_id][0].course_id
            }
        }).then(response => {
            let date = dayjs(events[event_id][0].start).format("DD-MM-YYYY").toString()
            let start = dayjs(events[event_id][0].start).format("HH:mm").toString()
            let end = dayjs(events[event_id][0].end).format("HH:mm").toString()
            let time = start + "-" + end;
            rows.push(createDataTutor(date, response.data, time, "שעתיים", names.length, stringifyStudents(names)));
        })


    })

    return rows;
}

// ?${studentsIDS.map((n, index) => `studentsIDS[${index}]=${n}`).join('&')}
export default function TutorReports() {

    const [data, setData] = useState([]);
    const [course, setCourse] = useState("");
    const [month, setMonth] = useState(-1)
    const [year, setYear] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/users/get-id-by-token", {
            params: {
                token: cookies.get("trackit_COOKIE")
            }
        }).then(response1 => {
            axios.get("http://localhost:8989/events/get-events-tutor", {
                params: {
                    tutor: response1.data
                }
            }).then(response2 => {

                setData(() => parseData(response2.data))
                console.log(parseData(response2.data))
                setLoading(() => false)
            })
        })
    }, [])

    const onYearChange = (event) => {
        setYear(() => event.target.value)
    }

    const onCourseChange = (event) => {
        setCourse(() => event.target.value)
    }

    const handleMonthChange = (event) => {
        setMonth(() => event.target.value)
    }

    useEffect(() => {

        if (loading) {
            setTimeout(() => {
                setLoading(() => false)
                setFiltered(() => data)
            }, [1000])
        }
    })
    const filter = () => {
        let arr = data;

        if (course !== "") {
            arr = arr.filter(row => row.course.includes(course))
        }
        if (year !== "") {
            arr = arr.filter(row => dayjs(row.date, "DD-MM-YYYY").get('year') === parseInt(year))
        }
        if (month !== -1) {
            arr = arr.filter(row => dayjs(row.date, "DD-MM-YYYY").get('month') === month)
        }

        setFiltered(() => arr);
    }
    // useEffect(() => {


    //     let arr = data;

    //     if (course !== "") {
    //         arr = arr.filter(row => row.course.includes(course))
    //     }
    //     if (year !== "") {
    //         arr = arr.filter(row => dayjs(row.date, "DD-MM-YYYY").get('year') === parseInt(year))
    //     }
    //     if (month !== -1) {
    //         arr = arr.filter(row => dayjs(row.date, "DD-MM-YYYY").get('month') === month)
    //     }

    //     setFiltered(() => arr);


    // }, [course, year, month])

    const exportAsPDF = async () => {

        let arr = []
        filtered.map((item) => {
            let row = [item.names, item.num, item.duration, item.time, item.course, item.date]
            arr.push(reverseBody(row))
        })

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFont('Rubik-Regular');
        pdf.setR2L(true);

        let width = pdf.internal.pageSize.getWidth()
        let title = "דו''ח שעות תגבור - חודש מאי 2022";
        let txtWidth = pdf.getTextWidth(title) > 70 ? pdf.getTextWidth(title) - 70 : 0;
        pdf.text(width - 70 - Math.ceil(txtWidth) - 5, 10, title);

        pdf.autoTable({
            head: [["סטודנטים", "מספר הסטודנטים", "משך התגבור", "שעות", "קורס", "תאריך"]],
            body: arr,
            styles: { font: 'Rubik-Regular', halign: "center" }
        });

        let finalY = pdf.lastAutoTable.finalY; // The y position on the page
        let total = "סך שעות תגבור לחודש - 20";
        txtWidth = pdf.getTextWidth(total) > 70 ? pdf.getTextWidth(total) - 70 : 0;
        pdf.text(width - 70 - Math.ceil(txtWidth), finalY + 10, total);

        // pdf.output('dataurlnewwindow');
        window.open(URL.createObjectURL(pdf.output("blob")))
    }


    return (
        <Container sx={{ paddingBottom: 20, paddingTop: 2 }}>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                timeout={500}>
                <Box>
                    <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שם הקורס"} value={course} onChange={onCourseChange} />
                    <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שנה"} value={year} onChange={onYearChange} />
                    <FormControl>
                        <Select
                            sx={{ ml: 1, mb: 1, backgroundColor: "white", color: month === -1 && "gray" }}
                            id="month-select"
                            displayEmpty
                            value={month}
                            onChange={handleMonthChange}
                            input={<OutlinedInput />}
                            defaultValue={-1}
                            renderValue={(selected) => {
                                if (selected == -1) {
                                    return "לפי חודש"
                                }
                                return (
                                    months[selected]
                                )
                            }}
                        >
                            <MenuItem value={-1} sx={{ direction: "rtl" }} > ניקוי בחירה </MenuItem>
                            {
                                months.map((month, index) => {
                                    return (
                                        <MenuItem sx={{ direction: "rtl" }} key={index} value={index}> {month}</MenuItem>

                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <ReportTable columns={columnsTutor} rows={filtered} />




                    <Button onClick={exportAsPDF}> ייצא כ-PDF </Button>
                </Box>
            </Grow>
        </Container >

    )
}