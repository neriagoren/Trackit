import { Container, Grow, TextField, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import ReportTable from "../Components/ReportTable";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const columnsTutor = [
    { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
    { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
    {
        id: 'time',
        label: 'שעות',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'duration',
        label: 'משך התגבור',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'num',
        label: 'מספר סטודנטים',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'names',
        label: 'סטודנטים',
        minWidth: 200,
        align: 'center',
    },
];

function createDataTutor(date, course, time, duration, num, names) {
    return { date, course, time, duration, num, names };
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
    createDataTutor('12-05-2022', 'אלגוריתמים', "08:15 - 09:45", "שעתיים", 2, "גילה בר, מיכה שטיין")
];

const columnsAdmin = [
    { id: 'date', label: 'תאריך', align: "center", minWidth: 100 },
    { id: 'tutor', label: 'מתגבר', align: "center", minWidth: 100 },
    { id: 'course', label: 'קורס', align: "center", minWidth: 150 },
    {
        id: 'time',
        label: 'שעות',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'duration',
        label: 'משך התגבור',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'num',
        label: 'מספר סטודנטים',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'names',
        label: 'סטודנטים',
        minWidth: 200,
        align: 'center',
    },
];

function createDataAdmin(date, tutor, course, time, duration, num, names) {
    return { date, tutor, course, time, duration, num, names };
}

const rowsAdmin = [
    createDataAdmin('12-05-2022', 'נריה גורן', 'חשבון דיפרנציאלי ואינטגרלי', "08:15 - 09:45", "שעתיים", 3, "עמיחי, אוראל"),
];


export default function Reports(props) {

    const [clicked, setClicked] = useState(false)

    const exportAsPDF = async () => {
        await setClicked(() => true);
        const input = document.getElementById('1');

        html2canvas(input)
            .then((canvas) => {
                let imgWidth = 208;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
                // pdf.output('dataurlnewwindow');
                window.open(URL.createObjectURL(pdf.output("blob")))

            })
            ;

        setClicked(() => false);

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
                                <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שם המתגבר"} />
                                <TextField sx={{ ml: 1, mb: 1, backgroundColor: "white" }} placeholder={"חפש לפי שם הקורס"} />
                                <div id={"1"}>
                                    <ReportTable columns={columnsAdmin} rows={rowsAdmin} />
                                </div>
                                <Button onClick={exportAsPDF}> PDF </Button>
                            </>

                            :
                            <>
                                <div id={"1"}>
                                    {
                                        clicked &&
                                        <h1> דו''ח שעות תגבור לחודש מאי 2022 </h1>
                                    }
                                    <ReportTable columns={columnsTutor} rows={rowsTutor} />

                                    {
                                        clicked &&
                                        <h3> סך הכל 13 שעות תגבור </h3>
                                    }
                                </div>
                                <Button onClick={exportAsPDF}> PDF </Button>


                            </>

                    }

                </Box>

            </Grow>
        </Container >
    )
}
