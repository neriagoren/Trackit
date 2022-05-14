
import React, { useState } from "react";
import { Grid, Grow } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Day from "../Calendars/Day";
import Month from "../Calendars/Month";
import dayjs from "dayjs";

export default function Agenda() {

    const [date, setDate] = useState(dayjs());

    return (
        <>
            <Grid item xs={12} sm={5}>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 500 })}>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray" }}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            יומן יומי
                        </Typography>
                        <Day date={date} setDate={setDate} from={"overview"} />

                    </Box>
                </Grow>
            </Grid>

            <Grid item xs={6}>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 1000 })}>
                    <Box sx={{ bgcolor: 'background.paper', borderRadius: "10px", boxShadow: "0px 0px 2px gray" }}>
                        <Typography color={"gray"} fontSize={"small"} p={1}>
                            יומן חודשי
                        </Typography>
                        <Month date={date} setDate={setDate} />

                    </Box>
                </Grow>
            </Grid>
        </>
    )
}