import React from "react";
import {Avatar, Chip, Container, Divider, Grid, ListItemIcon, MenuItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {AccountCircle, Logout, Menu, PersonAdd, Settings} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menuu from "../Menuu";

export default function Profile(){
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
        return (
            <Container sx ={{height:"100%", overflowY:"auto", paddingBottom:20, paddingTop:1}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Box sx={{ height:"400px", bgcolor: 'background.paper', borderRadius:"10px", boxShadow:"0px 0px 2px gray"}}>
                            מידע אישי


                            <Menuu/>

                                <Stack spacing={1} sx={{display:"flex",alignItems:"center"}}>
                                    <Chip size={"small"} label="שנה צבע אוואטר"  icon={<ColorLensIcon />}  sx={{p:1}} />
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                        </Menu>
                                    </div>
                            </Stack>
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
