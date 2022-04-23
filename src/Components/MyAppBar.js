import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "universal-cookie";


export default function MyAppBar(props) {


    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("trackit_COOKIE");
        props.setL(() => false);
    }

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#2596be"}}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{marginRight: "50px"}}>
                    Track Kit
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{marginRight: "125px"}}>
                    {props.title}
                </Typography>
                <IconButton onClick={logout} sx={{position: "fixed", left: 50, color: "white"}}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
