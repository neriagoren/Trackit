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
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={(event) => handleClick(event,0)}  sx ={{textAlign:"right"}}>
                    <ListItemIcon>
                        <CircleNotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Typography fontWeight="bold" color="gray">
                        תזכורת לפני שנת מס
                    </Typography>}  />
                    {selectedIndex === 0 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={selectedIndex === 0} timeout="auto"  unmountOnExit>
                    <Typography p={2}>
                        עובדים שיש להם זיכוי בנקודות מס, נא לעדכן את אורנה בחשב שכר.
                    </Typography>
                </Collapse>

                <ListItemButton onClick={(event) => handleClick(event,1)}  sx ={{textAlign:"right"}}>

                    <ListItemIcon>
                        <CircleNotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Typography fontWeight="bold" color={"black"} >
                        פעילות הספרייה בתאריך 20/4/22
                    </Typography>}  />

                    {selectedIndex === 1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={selectedIndex === 1} timeout="auto"  unmountOnExit>
                    <Typography p={2}>
                        הספרייה תהיה פתוחה עד השעה 16:20 בעקבות יום הקנאביס
                    </Typography>
                </Collapse>

                <ListItemButton onClick={(event) => handleClick(event,2)}  sx ={{textAlign:"right"}}>

                    <ListItemIcon>
                        <CircleNotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Typography fontWeight="bold" color={"gray"} >
                        מילוי טופס 101
                    </Typography>}  />

                    {selectedIndex === 2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={selectedIndex === 2} timeout="auto"  unmountOnExit>
                    <Typography p={2}>
                        עובדים חדשים, נא למלא טופס 101 ולהעביר לחשב שכר.
                    </Typography>
                </Collapse>


            </List>
        </Box>
    );
}
