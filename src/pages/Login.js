import {useState, useEffect} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import {Button, TextField, Typography, Toolbar} from "@mui/material";
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


    const routeChange = () =>{ 
      let path = `signup`; 
      history.push(path);
    }


    const login = () => {
        axios.get("http://localhost:8989/login", {
            params : {
                username:username,
                password:password
            }
        }).then(res => {
            if(res.data !== "") {
                axios.get("http://localhost:8989/login/type", {
                params: {
                    token:res.data
                }
                }).then(type => {
                    props.setType(() => type.data);
                    console.log(type.data);
                    const cookies = new Cookies();
                    cookies.set("trackit_COOKIE", res.data, {domain:"localhost", path:"/",  secure: true, sameSite: 'none'});
                    props.setL(() => true);
                })
            }
            else {
                setResponse(()=> "המשתמש לא קיים!")
            }
        })
    }

    const forgot = () => {
        setResponse(() => "צור קשר עם תמיכה טכנית")
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

    const onEnterKey = (event) => {
        if (event.keyCode === 13 && !hasRequiredDetails) {
            login()
        }
    }


    return (
        <Fade in={true}>
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
                    <h3> מערכת תגבורים - המכללה האקדמית אשקלון </h3>
                </Box>

                <h3> התחברות למערכת </h3>

                <Box>
                    <TextField onChange={handleUsernameChange} placeholder={"שם משתמש"} sx={{width: "100%", m: 1}}/>
                    <TextField onChange={handlePasswordChange} onKeyDown={onEnterKey} type={"password"} placeholder={"סיסמא"} sx={{width: "100%", m: 1}}/>
                    <Button disabled={hasRequiredDetails} sx={{width: "100%"}} onClick={login}> התחבר/י </Button>
                    <Button  onClick = {forgot} sx={{width: "100%"}}> שכחתי סיסמא </Button>
                    <Button  onClick = {routeChange}  sx={{width: "100%"}}>  צור חשבון</Button>
                
                    <Typography color={"red"} textAlign={"center"}>
                        {response}
                    </Typography>
                </Box>
                
            </Box>
        </Box>
        </Fade>
    )
}
