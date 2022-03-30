import React from "react";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EnhancedTable from "../components/EnhancedTable";


class Reports extends React.Component {

    render () {
        return (
            <Container sx ={{height:"100%", overflowY:"auto", paddingBottom:20, paddingTop:1}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Box sx={{ height:"auto", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                טבלה
                            </Typography>
                            <EnhancedTable />
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                דיאגרמה
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                נתונים
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                שונות
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default Reports;
