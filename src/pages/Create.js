import {Container, Grow} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";


export default function Create() {

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
            </Box>
            </Grow>
        </Container>
    )
}
