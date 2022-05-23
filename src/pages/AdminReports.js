import { Container, Grow, TextField, Button, Select, MenuItem, FormControl, Box, OutlinedInput } from "@mui/material";
import React, { useState, useEffect } from "react";

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

const columnsAdmin = [
    { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
    { id: 'tutor', label: 'מתגבר/ת', align: "center", minWidth: 100 },
    { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
    { id: 'time', label: 'שעות', minWidth: 170, align: 'center' },
    { id: 'duration', label: 'משך התגבור', minWidth: 170, align: 'center', },
    { id: 'num', label: 'מספר סטודנטים', minWidth: 60, align: 'center' },
    { id: 'names', label: 'סטודנטים', minWidth: 200, align: 'center' },
];


function createDataAdmin(date, tutor, course, time, duration, num, names) {
    return { date, tutor, course, time, duration, num, names };
}


const rowsAdmin = [
    createDataAdmin('12-05-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-05-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-05-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-05-2022', 'נריה גורן', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-04-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-05-2021', 'נריה גורן', 'מבוא למדעי המחשב', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
    createDataAdmin('12-05-2022', 'מוטי לוכים', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", "3", "עמיחי, אוראל"),
];


// reverse only english cells
// 0- Date, 3- hours, 5- num of students
// should add duration too!
const reverseBody = (arr) => {
    let newA = arr;
    newA[1] = reverseString(arr[1]);
    newA[3] = reverseString(arr[3]);
    newA[6] = reverseString(arr[6]);
    return newA
}



export default function AdminReports() {

    const [data, setData] = useState(null);
    const [events, setEvents] = useState(null);
    const [tutor, setTutor] = useState("")
    const [course, setCourse] = useState("")
    const [month, setMonth] = useState(-1)
    const [year, setYear] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [rows, setRows] = useState([]);

    //fetching data
    useEffect(() => {
        let mounted = true;
        axios.get("http://localhost:8989/events").then((response) => {
            console.log(response.data)
            if (mounted) {
                setData(() => response.data)
            }
        })

        return () => {
            mounted = false
        }
    }, []);

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
        let arr = rowsAdmin;
        if (tutor !== "") {
            arr = rowsAdmin.filter(row => row.tutor.includes(tutor))
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
                    <ReportTable columns={columnsAdmin} rows={filtered} />
                    <Button onClick={exportAsPDF}> ייצא כ-PDF </Button>
                </Box>
            </Grow>
        </Container >

    )

}