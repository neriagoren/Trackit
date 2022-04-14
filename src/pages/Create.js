import {Container, FormControl, Grow, InputLabel, ListItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import MenuItem from "@mui/material/MenuItem";



const courses = ["אלגברה ליניארית 2", "אלגוריתמים 2", "1 אלגברה ליניארית", "מבני נתונים", "אלגוריתמים 1"]

export default function Create() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Container sx={{paddingBottom: 20, paddingTop: 2}}>
            <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                timeout={500}>
            <Box sx={{height:"600px", bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray"}}>
                <Typography color={"gray"} fontSize={"small"} p={1}>
                    צור אירוע
                </Typography>


                <Box sx={{height: "400px", overflowY: "scroll", p:1}}>
                    <Typography>
                        בחר קורס:
                    </Typography>
                    <FormControl sx={{}}  >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}>
                            {
                                courses.map((course, index) => {
                                    return(
                                    <MenuItem value={index}> {course} </MenuItem>
                                    )})
                            }

                        </Select>
                    </FormControl>
                    <Typography>
                        בחר תאריך ושעה:
                    </Typography>
                </Box>

            </Box>
            </Grow>
        </Container>
    )
}
