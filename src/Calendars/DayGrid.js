
import { Grid, Box, Typography } from "@mui/material"

export default function DayGrid(props) {

    return (
        <Grid item xs={1}>
            <Box sx={{backgroundColor:"#2596be", height:"50px", borderRadius:"10px", display: "flex",
                flexDirection: "column",
                justifyContent: "center"}}>
                <Typography textAlign={"center"} color={"white"}>
                    {props.day}
                </Typography>
            </Box>
        </Grid>
    )
}