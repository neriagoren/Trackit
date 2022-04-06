import React from "react";
import { Chip, Container, Divider, Grid, ListItemIcon, MenuItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";

import MenuColor from "../Components/MenuColor";
import Typography from "@mui/material/Typography";

export default function Profile(){

        return (
            <Container sx ={{paddingBottom:20, paddingTop:2}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>

                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                מידע אישי
                            </Typography>
                                <Stack spacing={1} sx={{display:"flex",alignItems:"center"}}>
                                    <MenuColor/>
                                    <Chip label={"נריה גורן"} size={"medium"} />
                                </Stack>
                            <Stack spacing={1} sx={{display:"flex", alignItems:"start", p:2}}>
                                <Box sx={{display:"flex", direction:"row"}}>
                                    <Typography fontWeight={"bold"} fontSize={"large"} ml={2}>
                                        משרה
                                    </Typography>
                                    <Typography mt={"2px"}>
                                        ארכיטקט תוכנה
                                    </Typography>
                                </Box>
                               <Box sx={{display:"flex", direction:"row"}}>
                                   <Typography fontWeight={"bold"} fontSize={"large"} ml={2}>
                                       מחלקה
                                   </Typography>
                                   <Typography mt={"2px"}>
                                        פיתוח תוכנה
                                   </Typography>
                               </Box>

                            </Stack>
                        </Box>
                </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>

                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                תזכורות
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={5} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>

                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                שעות עבודה
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            <Typography color={"gray"} fontSize={"small"} p={1}>
                                נתונים
                            </Typography>
                        </Box>
                    </Grid>


                </Grid>

            </Container>

    )
}
