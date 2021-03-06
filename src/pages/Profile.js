import React from "react";
import { Chip, Container, Avatar, Grid, Grow, Stack } from "@mui/material";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import TotalHours from "../Components/TotalHours";

export default function Profile() {

    return (
        <Container sx={{ paddingBottom: 20, paddingTop: 2 }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        timeout={500}>
                        <Box sx={{
                            height: "400px",
                            bgcolor: 'background.paper',
                            borderRadius: "10px",
                            boxShadow: "0px 0px 2px gray"
                        }}>

                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                מידע אישי
                            </Typography>
                            <Stack spacing={1} sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar sx={{ width: 50, height: 50, backgroundColor: "#2596be" }}> נ </Avatar>

                                <Chip label={"נריה גורן"} size={"medium"} />
                            </Stack>
                            <Stack spacing={1} sx={{ display: "flex", alignItems: "start", p: 2 }}>
                                <Box sx={{ display: "flex", direction: "row" }}>
                                    <Typography fontWeight={"bold"} fontSize={"large"} ml={2}>
                                        משרה
                                    </Typography>
                                    <Typography mt={"2px"}>
                                        ארכיטקט תוכנה
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", direction: "row" }}>
                                    <Typography fontWeight={"bold"} fontSize={"large"} ml={2}>
                                        מחלקה
                                    </Typography>
                                    <Typography mt={"2px"}>
                                        פיתוח תוכנה
                                    </Typography>
                                </Box>

                            </Stack>
                        </Box>
                    </Grow>
                </Grid>

                <Grid item xs={5}>
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        timeout={1000}>
                        <Box sx={{
                            height: "400px",
                            bgcolor: 'background.paper',
                            borderRadius: "10px",
                            boxShadow: "0px 0px 2px gray"
                        }}>

                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                מידע כללי
                            </Typography>
                            <TotalHours />
                        </Box>
                    </Grow>
                </Grid>
            </Grid>
        </Container>
    )
}
