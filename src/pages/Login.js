import {useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Grow, TextField} from "@mui/material";

export default function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [isValid, setIsValid] = useState(null);


    const handleUsernameChange = (e) => {
        let username = e.target.value;
        setUsername(() => username);
    }


    const handlePasswordChange = (e) => {
        let password = e.target.value;
        setPassword(() => password);
    }

    const hasRequiredDetails = username === "" || password === ""

    return (
        <Grow
            in={true}
            style={{transformOrigin: '0 0 0'}}
            timeout={1500}>
        <Box sx={{
            backgroundColor: "#f5f5f5", height: "100vh", display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Toolbar/>

            <Box sx={{
                maxWidth: "500px",
                backgroundColor: "background.paper",
                p: 3,
                borderRadius: "10px",
                boxShadow: "0px 0px 2px gray"
            }}>
                <Box sx={{
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "10px",
                    color: "white",
                    backgroundColor: "#2596be"
                }}>
                    <h3> Track It </h3>
                </Box>
                <h3> התחברות למערכת </h3>

                <Box>
                    <TextField onChange={handleUsernameChange} placeholder={"שם משתמש"} sx={{width: "100%", m: 1}}/>
                    <TextField onChange={handlePasswordChange} type={"password"} placeholder={"סיסמא"} sx={{width: "100%", m: 1}}/>
                    <Button disabled={hasRequiredDetails} sx={{width: "100%"}} onClick={() => props.setL(true)}> התחבר/י </Button>
                    <Button sx={{width: "100%"}}> שכחתי סיסמא </Button>
                </Box>
                {response}
            </Box>
        </Box>
        </Grow>
    )
}
