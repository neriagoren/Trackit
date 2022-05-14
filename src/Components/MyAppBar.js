import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";


export default function MyAppBar(props) {


    const history = useHistory();

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("trackit_COOKIE", { domain: "localhost", path: "/" });
        props.setL(() => false);
        props.setT(() => "");
    }


    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#2596be" }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginRight: "50px" }}>
                    מערכת תגבורים - המכללה האקדמית אשקלון
                </Typography>

                <IconButton onClick={logout} sx={{ position: "fixed", left: 50, color: "white" }}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
