import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const updates = [
    {title:" תזכורת לפני שנת מס",body:"עובדים שיש להם זיכוי בנקודות מס, נא לעדכן את אורנה בחשב שכר.", read:false},
    {title:"פעילות הספרייה בתאריך 20/4/22",body:"הספרייה תהיה פתוחה עד השעה 16:20 לרגל יום הקנאביס", read:false},
    {title:"מילוי טופס 101",body:"עובדים חדשים, נא למלא טופס 101 ולהעביר לחשב שכר.",read:false}
]

export default function GlobalBoard() {

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
                                <ListItemIcon>
                                    <CircleNotificationsIcon />
                                </ListItemIcon>
                                <ListItemText primary={<Typography fontWeight="bold" color={update.read && "gray"}>
                                    {update.title}
                                </Typography>}  />
                                {(selectedIndex === index) && (update.read = true) }
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
