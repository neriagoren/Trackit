import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function OtherBubble(props) {

    return(
        <Box sx={{display:"flex", flexDirection:"row-reverse", padding:1, textAlign:"left"}}>
            <Box sx={{backgroundColor:"#f5f5f5", borderRadius:"15px"}}>
                <Typography m={1} color={"black"}>
                    {props.text}
                </Typography>
            </Box>
        </Box>
    )
}
