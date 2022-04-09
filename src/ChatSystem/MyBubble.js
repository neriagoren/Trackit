import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MyBubble(props) {

    return(
        <Box sx={{display:"flex", flexDirection:"row", padding:1, verticalAlign:"baseline"}}>
            <Box sx={{backgroundColor:"#2596be", borderRadius:"15px"}}>
                <Typography m={1} color={"white"}>
                    {props.text}
                </Typography>
            </Box>
        </Box>
    )
}
