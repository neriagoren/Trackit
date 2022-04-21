import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";


export default function ChatBubble(props) {
    return (
        <Box sx={{display: "flex", flexDirection: props.who ? "row" : "row-reverse", padding: 1, verticalAlign: "baseline"}}>
            <Box sx={{backgroundColor: props.who ? "#2596be" : "#f5f5f5", borderRadius: "15px"}}>
                <Typography m={1} color={props.who ? "white" : "black"}>
                    {props.text}
                </Typography>
            </Box>
        </Box>

    )
}
