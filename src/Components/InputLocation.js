
import {  TextField, Button, Box} from "@mui/material";
import { useState } from "react";

export default function InputLocation(props) {

    const [location, setLocation] = useState("");

    const onLocationChange = (event) => {
        setLocation(() => event.target.id)
    }

    const onCreate = () => {
        props.setLocation(()=> location)
    }

    return (
        <>
        <TextField onChange={onLocationChange} placeholder={"מיקום האירוע"} />
        <Box sx={{}}>
            <Button onClick={onCreate} sx={{fontSize:"18px", color:"white" , backgroundColor:"#2596be", '&:hover': {
                                    color:"#2596be"
                                }}}>
                                צור אירוע
            </Button>
        </Box>
        </>
        
    )
}