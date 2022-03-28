import React from "react";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";

class Profile extends React.Component {

    render() {
        return (
            <Container sx ={{height:"100%", overflowY:"auto", paddingBottom:20, paddingTop:1}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            מידע אישי
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                       תזכורות
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        שעות עבודה
                        </Box>
                    </Grid>

                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                        נתונים
                        </Box>
                    </Grid>


                </Grid>

            </Container>

        )
    }
}

export default Profile;
