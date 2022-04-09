import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const updates = [
    {title:" תזכורת לפני שנת מס",body:"עובדים שיש להם זיכוי בנקודות מס, נא לעדכן את אורנה בחשב שכר. תודה רבה, הנהלת המכללה"},
    {title:"הודעה חשובה ממדור שכר לימוד ",body:"הודעה חשובה ממדור שכר לימוד: סטודנט/ית המעוניין לשלם את התשלום החודשי באמצעי אחר מהוראת קבע- יסדיר תשלום לא יאוחר מה- 7.4.22, סטודנט/ית שהסדיר תשלום יראה הודעה זו כמבוטלת. המשלם בשובר מפיקדון – יש לוודא שהתשלום נקלט תוך 7 ימים עסקים באתר המכללה - מידע אישי - דף חשבון."},
    {title:"מילוי טופס 101",body:"עובדים חדשים, נא למלא טופס 101 ולהעביר לחשב שכר. "},
    {title:"סדנת העצמה אישית ",body:"סדנת העצמה אישית יוצאת לדרך! מצורף לכאן קובץ הסדנה, נא להרשם מראש."}
]


export default function DepartmentBoard() {

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleClick = (event, index) => {
        index === selectedIndex
            ?
            setSelectedIndex(-1)
            :
            setSelectedIndex(index)
    };

    return (
        <Box sx={{height:"400px", overflowY:"auto", borderRadius:"10px"}}>
            <List
                sx={{ width: '100%'}}
                component="nav"
                aria-labelledby="nested-list-subheader">
                {
                    updates.map((update,index) => (
                        <>
                            <ListItemButton onClick={(event) => handleClick(event,index)}  sx ={{textAlign:"right"}}>
                                <Box width={"100%"}>


                                    <ListItemText primary={<Typography fontWeight="bold" >
                                        {update.title}
                                    </Typography>} />

                                    {
                                        selectedIndex !== index &&
                                        <ListItemText primary={<Typography  color={ "gray"}>
                                            {update.body.slice(0,50) + "..."}
                                        </Typography>} />
                                    }

                                </Box>

                                {selectedIndex === index ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={selectedIndex === index} timeout="auto"  unmountOnExit>
                                <Typography p={2}>
                                    {update.body}
                                </Typography>
                            </Collapse>
                        </>
                    ))
                }

            </List>
        </Box>
    );
}
