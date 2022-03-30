import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";


export default function Setting() {

    return (
        <Container sx ={{height:"100%", overflowY:"auto", paddingBottom:20, paddingTop:1}}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                    <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        שנה הגדרות
                        <Box sx={{height:"400px", overflowY:"auto", borderRadius:"10px"}}>

                        </Box>
                        </Box>
                </Grid>

                <Grid item xs={5} >
                    <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                    נהל הרשאות
                    </Box>
                </Grid>

                <Grid item xs={5} >
                    <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        דיווח על תקלה
                    </Box>
                </Grid>

                <Grid item xs={6} >
                    <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        פנייה לצוות תמיכה טכנית
                    </Box>
                </Grid>


            </Grid>

        </Container>

    )
}
