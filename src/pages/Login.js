import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Toolbar } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import Fade from '@mui/material/Fade';

import { useHistory } from "react-router-dom";

export default function Login(props) {



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [isValid, setIsValid] = useState(null);


    const history = useHistory();

    const hasRequiredDetails = username === "" || password === ""


    const routeChange = () => {
        let path = `signup`;
        history.push(path);
    }

    useEffect(() => {

        // axios.get("http://localhost:8989/get-course-by-id", {
        //     params: {
        //         id: 1
        //     }
        // }).then(respone => {
        //     console.log(respone.data)
        // })

        // axios.get("http://localhost:8989/users/get-id-by-token", {
        //     params: {
        //         token: "tutor_token"
        //     }
        // }).then(respone => {
        //     console.log(respone.data)
        // })

        // axios.get("http://localhost:8989/users/students").then(respone => {
        //     console.log(respone.data)
        // })

        // axios.get("http://localhost:8989/users/get-student-by-id", {
        //     params: {
        //         id: 1
        //     }
        // }).then(respone => {
        //     console.log(respone.data)
        // })



    }, [])

    // DONE
    const login = () => {
        if (!hasRequiredDetails) {
            axios.get("http://localhost:8989/login", {
                params: {
                    username: username,
                    password: password
                }
            }).then(res => {
                if (res.data.length !== 0) {
                    const cookies = new Cookies();
                    cookies.set("ACC_COOKIE", res.data[0].token, { domain: "localhost", path: "/", secure: true, sameSite: 'none' });
                    props.setUserType(() => res.data[0].type);
                    props.setToken(() => res.data[0].token);
                }
                else {
                    setResponse(() => "???????????? ???? ????????!")
                }
            })
        }
    }

    const forgot = () => {
        setResponse(() => "?????? ?????? ???? ?????????? ??????????")
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
                        <h3> ?????????? ?????????????? - ???????????? ?????????????? ???????????? </h3>
                    </Box>

                    <h3> ?????????????? ???????????? </h3>

                    <Box>
                        <TextField onChange={handleUsernameChange} placeholder={"???? ??????????"} sx={{ width: "100%", m: 1 }} />
                        <TextField onChange={handlePasswordChange} onKeyDown={(event) => { event.key === 'Enter' && signup() }} type={"password"} placeholder={"??????????"} sx={{ width: "100%", m: 1 }} />
                        <Button disabled={hasRequiredDetails} sx={{ width: "100%" }} onClick={login}> ??????????/?? </Button>
                        <Button onClick={forgot} sx={{ width: "100%" }}> ?????????? ?????????? </Button>
                        <Button onClick={routeChange} sx={{ width: "100%" }}>  ?????? ??????????</Button>
                        <Typography color={"red"} textAlign={"center"}>
                            {response}
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Fade>
    )
}
