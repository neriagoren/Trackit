import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Toolbar } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import Fade from '@mui/material/Fade';
import { Redirect } from "react-router-dom";
import { Alert } from "@mui/material";

export default function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [isValid, setIsValid] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFirstNameChange = (e) => {
        let firstName = e.target.value;
        setFirstName(() => firstName);
        setResponse(() => "");
    }

    const handleLastNameChange = (e) => {
        let lastName = e.target.value;
        setLastName(() => lastName);
        setResponse(() => "");
    }

    const handleUsernameChange = (e) => {
        let username = e.target.value;
        setUsername(() => username);
        setResponse(() => "");
    }


    const handlePasswordChange = (e) => {
        let password = e.target.value;
        setPassword(() => password);
    }

    const hasRequiredDetails = username === "" || password === "" || firstName === "" || lastName === ""

    const onEnterKey = (event) => {
        if (event.keyCode === 13 && !hasRequiredDetails) {
            signup()
        }
    }

    const signup = () => {
        axios.post("http://localhost:8989/users", { username, password, firstName, lastName }).then(
            (res) => {
                setSuccess(() => res.data);
            }
        )
    }

    return (
        <Fade in={true}>
            <Box sx={{
                backgroundColor: "#f5f5f5", height: "100vh", display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Toolbar />

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
                        <h3> מערכת תגבורים - המכללה האקדמית אשקלון </h3>
                    </Box>

                    <h3> יצירת חשבון לסטודנט </h3>

                    <Box>
                        <TextField onChange={handleFirstNameChange} placeholder={"שם פרטי"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handleLastNameChange} placeholder={"שם משפחה"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handleUsernameChange} placeholder={"שם משתמש"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handlePasswordChange} onKeyDown={onEnterKey} type={"password"} placeholder={"סיסמא"} sx={{ width: "100%", m: 1 }} />
                        <Button disabled={hasRequiredDetails} onClick={signup} sx={{ width: "100%" }}> צור חשבון </Button>
                        {
                            success &&
                            <Redirect to={"/"} />
                        }
                    </Box>

                </Box>
            </Box>
        </Fade>
    )
}