import {Container, Grid, Grow} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";


export default function Setting() {

    return (
        <Container sx ={{paddingBottom:20, paddingTop:2}}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        timeout={500}>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            שנה הגדרות
                         </Typography>
                        <Box sx={{height:"400px", overflowY:"auto", borderRadius:"10px"}}>

                        </Box>
                        </Box>
                    </Grow>
                </Grid>



                <Grid item xs={6} >
                    <Grow
                        in={true}
                        style={{transformOrigin: '0 0 0'}}
                        timeout={2000}>
                    <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            פנייה לצוות תמיכה טכנית
                        </Typography>
                    </Box>
                    </Grow>
                </Grid>


            </Grid>

        </Container>

    )
}
