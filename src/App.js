import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import SignIn from "./pages/SignIn";
import ClippedDrawer from "./components/ClippedDrawer";
import {Redirect} from "react-router";
import {Fab} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';


function App(){

    const [isLogged, setLogin] = useState(true);

    const [send, setSend] = useState(false);

    const handle = () => {
        setSend(!send)
    }
    return (
        <BrowserRouter>
            <div className="App" dir={"rtl"}>
                {
                    isLogged ?
                        <>
                            <ClippedDrawer />
                            {
                                send ?
                                    <Box sx = {{boxShadow:"0px 0px 10px gray",  borderRadius:"15px", width:"240px", height:"500px", backgroundColor:"white", zIndex: (theme) => theme.zIndex.drawer + 1, position:"fixed", right:"15px", bottom:"15px"}}>
                                        <Box sx = {{margin:1}}>
                                            <CloseIcon  onClick={handle} sx ={{color:"#2596be"}}/>

                                            <h3 style ={{textAlign:"center"}}> שלח הודעה  </h3>

                                        </Box>

                                    </Box>
                                    :

                                    <Fab onClick={handle} variant="extended" sx ={{ "&:hover":{backgroundColor:"gray"} , backgroundColor:'#2596be', position:"fixed", right:"15px", bottom:"15px" ,zIndex: (theme) => theme.zIndex.drawer + 1}}>
                                        <p style={{color:'white'}}>  דיווח  </p>
                                        <SendIcon  sx={{marginRight:'5px', color:'white'}}/>
                                    </Fab>

                            }

                        </>
                            :
                        <>
                            <Redirect to={"/"}/>
                            <Route path={"/"}  component={SignIn}/>
                        </>
                }

            </div>
        </BrowserRouter>
    );
}

export default App;


