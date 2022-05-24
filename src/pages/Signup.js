import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import Fade from '@mui/material/Fade';
import { Redirect } from "react-router-dom";

export default function Signup() {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({
        usernameErr: "",
        firstNameErr: "",
        lastNameErr: "",
        passwordErr: ""
    });
    const [isValid, setIsValid] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFirstNameChange = (e) => {
        let first_name = e.target.value;
        setFirstName(() => first_name);
        setResponse({ ...response, firstNameErr: "" });
    }

    const handleLastNameChange = (e) => {
        let last_name = e.target.value;
        setLastName(() => last_name);
        setResponse({ ...response, lastNameErr: "" });

    }

    const handleUsernameChange = (e) => {
        let username = e.target.value;
        setUsername(() => username);
        setResponse({ ...response, usernameErr: "" });

    }


    const handlePasswordChange = (e) => {
        let password = e.target.value;
        setPassword(() => password);
    }

    const hasRequiredDetails = username === "" || password === "" || first_name === "" || last_name === ""



    // DONE
    const signup = () => {

        let regexPassword = new RegExp(/^([A-Za-z0-9!@#$]){6,20}$/);
        let regexUsername = new RegExp(/^([A-Za-z0-9_]){6,20}$/);
        let regexName = new RegExp(/^([א-ת]){2,20}$/);

        if (regexPassword.test(password) && regexUsername.test(username) &&
            regexName.test(first_name) && regexName.test(last_name)) {
            axios.post("http://localhost:8989/users", { username, password, first_name, last_name }).then(
                (res) => {
                    setSuccess(() => res.status === 200);

                }
            )
        }
        else {
            let e1 = "";
            let e2 = "";
            let e3 = "";
            let e4 = "";
            if (!regexPassword.test(password)) {
                e1 = "הסיסמא לא תקינה"

            }
            if (!regexUsername.test(username)) {
                e2 = "שם המשתמש אינו תקין"
            }
            if (!regexName.test(first_name)) {
                e3 = "שם הפרטי אינו תקין"


            }
            if (!regexName.test(last_name)) {
                e4 = "שם המשפחה אינו תקין"
            }

            setResponse({ ...response, passwordErr: e1, usernameErr: e2, firstNameErr: e3, lastNameErr: e4 })
        }

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
                        <TextField onChange={handleFirstNameChange} placeholder={"שם פרטי (עברית)"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handleLastNameChange} placeholder={"שם משפחה (עברית)"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handleUsernameChange} placeholder={"שם משתמש"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handlePasswordChange} onKeyDown={(event) => { event.key === 'Enter' && signup() }} type={"password"} placeholder={"סיסמא"} sx={{ width: "100%", m: 1 }} />
                        <Button disabled={hasRequiredDetails} onClick={signup} sx={{ width: "100%" }}> צור חשבון </Button>
                        {
                            success &&
                            <Redirect to={"/"} />
                        }
                        <Stack>

                            {
                                Object.keys(response).map(key => (
                                    response[key] !== "" &&

                                    <Typography color={"red"}> {response[key]}</Typography>

                                ))
                            }


                        </Stack>
                    </Box>

                </Box>
            </Box>
        </Fade>
    )
}