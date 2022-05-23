import { Container, Grow, TextField, Button, Select, MenuItem, FormControl, Box, OutlinedInput } from "@mui/material";
import React, { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';

import ReportTable from "../Components/ReportTable";
import { months } from "../Resources/constants";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { reverseString } from "../Resources/constants";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const fontref = require('../Resources/Rubik-Regular-normal');




function createDataAdmin(date, tutor, course, time, duration, num, names) {
    return { date, tutor, course, time, duration, num, names };
}



// reverse only english cells
// 0- Date, 3- hours, 5- num of students
// should add duration too!
const reverseBody = (arr) => {
    let newA = arr;
    newA[2] = reverseString(arr[2].toString());
    newA[3] = reverseString(arr[3]);
    newA[6] = reverseString(arr[6]);
    return newA
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

export default function AdminReports() {

    const [data, setData] = useState(null);
    const [events, setEvents] = useState(null);
    const [tutor, setTutor] = useState("")
    const [course, setCourse] = useState("")
    const [month, setMonth] = useState(-1)
    const [year, setYear] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const columnsAdmin = [
        { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
        { id: 'tutor', label: 'מתגבר/ת', align: "center", minWidth: 100 },
        { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
        { id: 'time', label: 'שעות', minWidth: 170, align: 'center' },
        { id: 'duration', label: 'משך התגבור', minWidth: 170, align: 'center', },
        { id: 'num', label: 'מספר סטודנטים', minWidth: 60, align: 'center' },
        { id: 'names', label: 'סטודנטים', minWidth: 200, align: 'center' },
    ];

    //fetching data
    useEffect(() => {
        let mounted = true;
        axios.get("http://localhost:8989/events").then((response) => {
            if (mounted) {
                setData(() => response.data)
            }
        })
        return () => {
            mounted = false
        }
    }, []);

    // parse data to events here
    useEffect(() => {
        let mounted = true;
        if (data !== null) {
            let rows = [];
            // group events by event_id
            let events = {}
            data.map(row => {
                (events[row.event_id] || (events[row.event_id] = [])).push(row)
            })

            // get names of students - (maybe students names should appear on event table instead of just id?)
            // alter this!

            Object.keys(events).map(id => {
                let names = [];
                events[id].map(event => {
                    names.push(event.student_name)
                })

                let dateStart = dayjs(events[id][0].start)
                let dateEnd = dayjs(events[id][0].end)
                let start = dateStart.format("HH:mm").toString();
                let end = dateEnd.format("HH:mm").toString();
                let time = start + "-" + end;
                let duration = dayjs(events[id][0].end).diff(dayjs(events[id][0].start), 'minute')
                rows.push(createDataAdmin(dateStart.format("DD-MM-YYYY").toString(), events[id][0].tutor_name, events[id][0].course_name, time, (duration / 60).toString(), names.length, stringifyStudents(names)));

            })

            // sorting by date in DESC order
            rows.sort((a, b) => dayjs(b.date, 'DD-MM-YYYY') - dayjs(a.date, 'DD-MM-YYYY'))

            if (mounted) {
                setEvents(() => rows)
            }

        }
        return () => {
            mounted = false;
        }
    }, [data])

    // important!
    useEffect(() => {
        if (events !== null) {
            setTimeout(() => {
                setLoading(() => false)

            }, [100])
        }
    }, [events])

    const onYearChange = (event) => {
        setYear(() => event.target.value)
    }

    const onTutorChange = (event) => {
        setTutor(() => event.target.value)
    }

    const onCourseChange = (event) => {
        setCourse(() => event.target.value)
    }

    const handleMonthChange = (event) => {
        setMonth(() => event.target.value)
    }

    useEffect(() => {
        if (!loading) {
            setFiltered(() => events)
        }
    }, [loading])

    useEffect(() => {
        if (data !== null) {
            let arr = events;
            if (tutor !== "") {
                arr = arr.filter(row => row.tutor.includes(tutor))
            }
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

    }, [tutor, course, year, month])


    const exportAsPDF = async () => {

        let arr = []
        filtered.map((item) => {
            let row = [item.names, item.num, item.duration, item.time, item.course, item.tutor, item.date]
            arr.push(reverseBody(row))
        })

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFont('Rubik-Regular');
        pdf.setR2L(true);

        let width = pdf.internal.pageSize.getWidth()
        let title = "דו''ח מערכת תגבורים לחודש מאי";
        let txtWidth = pdf.getTextWidth(title) > 70 ? pdf.getTextWidth(title) - 70 : 0;
        pdf.text(width - 70 - Math.ceil(txtWidth) - 5, 10, title);

        pdf.autoTable({
            head: [["סטודנטים", "מספר הסטודנטים", "משך התגבור", "שעות", "קורס", "מתגבר/ת", "תאריך"]],
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
                    <Box sx={{ height: "auto", display: "flex", flexDirection: "row" }}>

                        <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שם המתגבר/ת"} value={tutor} onChange={onTutorChange} />
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
                    </Box>
                    {
                        loading ?
                            <>
                                <h3> אנא המתן</h3>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />

                            </>
                            :
                            <>
                                <ReportTable columns={columnsAdmin} rows={filtered} />

                                <Button onClick={exportAsPDF}> ייצא כ-PDF </Button>

                            </>

                    }

                </Box>
            </Grow>
        </Container >

    )

}