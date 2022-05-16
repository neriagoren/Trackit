import { Container, Grow, TextField, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";

import ReportTable from "../Components/ReportTable";
import { months } from "../Resources/constants";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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

const columnsAdmin = [
    { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
    { id: 'tutor', label: 'מתגבר', align: "center", minWidth: 100 },
    { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
    { id: 'time', label: 'שעות', minWidth: 170, align: 'center' },
    { id: 'duration', label: 'משך התגבור', minWidth: 170, align: 'center', },
    { id: 'num', label: 'מספר סטודנטים', minWidth: 60, align: 'center' },
    { id: 'names', label: 'סטודנטים', minWidth: 200, align: 'center' },
];


function createDataTutor(date, course, time, duration, num, names) {
    return { date, course, time, duration, num, names };
}

function createDataAdmin(date, tutor, course, time, duration, num, names) {
    return { date, tutor, course, time, duration, num, names };
}

const rowsTutor = [
    createDataTutor('12-05-2022', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
    createDataTutor('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
    createDataTutor('12-05-2022', 'מבני נתונים', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
    createDataTutor('12-05-2022', 'מבוא למדעי המחשב', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
    createDataTutor('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
    createDataTutor('12-05-2022', 'סמינריון בינה מלאכותית', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
    createDataTutor('12-05-2022', 'אלגוריתמים', "08:15 - 09:45", "שעתיים", 2, "גילה בר, מיכה שטיין"),
    createDataTutor('12-05-2022', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
    createDataTutor('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
    createDataTutor('12-05-2022', 'מבני נתונים', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
    createDataTutor('12-05-2022', 'מבוא למדעי המחשב', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
    createDataTutor('12-05-2022', 'אלגברה לינארית', "08:15 - 09:45", "שעתיים", 5, "נתנאל, עמיחי, מנשה, אביב, חיים, נוגה"),
    createDataTutor('12-05-2022', 'סמינריון בינה מלאכותית', "08:15 - 09:45", "שעתיים", 1, "אורן אביתר"),
    createDataTutor('12-05-2022', 'אלגוריתמים', "08:15 - 09:45", "שעתיים", 2, "גילה בר, מיכה שטיין"),
];

const rowsAdmin = [
    createDataAdmin('12-05-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
    createDataAdmin('12-05-2022', 'מוטי לוכים', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
];


const reverseString = (str) => {
    return str.split("").reverse().join("");
}


// reverse only english cells
const reverseBody = (arr) => {
    let newA = arr;
    newA[1] = reverseString(arr[1]);
    newA[3] = reverseString(arr[3]);
    newA[5] = reverseString(arr[5]);
    return newA
}



export default function Reports(props) {

    const [tutor, setTutor] = useState("")
    const [course, setCourse] = useState("")
    const [month, setMonth] = useState(-1)
    const [year, setYear] = useState("");
    const [filtered, setFiltered] = useState([]);


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

    }, [tutor, course, month, year])

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

    const exportAsPDF = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFont('Rubik-Regular');
        pdf.setR2L(true);

        let width = pdf.internal.pageSize.getWidth()
        let title = "דו''ח שעות תגבור - חודש מאי 2022";
        let txtWidth = pdf.getTextWidth(title) > 70 ? pdf.getTextWidth(title) - 70 : 0;
        pdf.text(width - 70 - Math.ceil(txtWidth) - 5, 10, title);

        pdf.autoTable({
            head: [["סטודנטים", "מספר הסטודנטים", "משך התגבור", "שעות", "קורס", "תאריך"]],
            body: [reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיאחי דאהן, אוראל בן אבו, אביאל אברהמוב", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),
            reverseBody(["עמיחי דהן, אוראל אמיתי", "3", "שעתיים", "10:45-11:30", "חשבון דיפרנציאלי ואינטגרלי", "10-5-2022"]),],
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
                    {
                        props.type === "admin" ?
                            <>
                                <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שם המתגבר"} value={tutor} onChange={onTutorChange} />
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
                                <div id={"1"}>
                                    <ReportTable columns={columnsAdmin} rows={filtered} />

                                </div>
                                <Button onClick={exportAsPDF}> ייצא כ-PDF </Button>
                            </>
                            :
                            <>
                                <div id={"1"}>

                                    <ReportTable columns={columnsTutor} rows={rowsTutor} />
                                </div>
                                <Button onClick={exportAsPDF}> ייצא כ-PDF </Button>
                            </>

                    }

                </Box>

            </Grow>
        </Container >
    )
}
