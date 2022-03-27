import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Databases from "./pages/Databases";
import Report from "./pages/Report";
import SignIn from "./pages/SignIn";
import Support from "./pages/Support";
import Department from "./pages/Department";
import ClippedDrawer from "./components/ClippedDrawer";
import {Redirect} from "react-router";
import {Fab} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MyAppBar from "./components/MyAppBar";


function App(){

    const [isLogged, setLogin] = useState(true);

    return (
        <BrowserRouter>

            <div className="App" dir={"rtl"}>


                {
                    isLogged ?
                        <>
                            <ClippedDrawer />
                            <Fab variant="extended" sx ={{ "&:hover":{backgroundColor:"gray"} , backgroundColor:'#2596be', position:"fixed", right:"15px", bottom:"15px" ,zIndex: (theme) => theme.zIndex.drawer + 1}}>
                               <p style={{color:'white'}}> שלח  הודעה  </p>
                                <SendIcon  sx={{marginLeft:'10px', color:'white'}}/>
                            </Fab>
                            <Redirect to={"/overview"}/>
                            <Route path={"/overview"} component={Overview} exact={true}/>
                            <Route path={"/department"} component={Department} exact={true}/>
                            <Route path={"/profile"} component={Profile} exact={true}/>
                            <Route path={"/messages"} component={Messages} exact={true}/>
                            <Route path={"/reports"} component={Reports} exact={true}/>
                            <Route path={"/reports/reportabug"} component={Report} exact={true}/>
                            <Route path={"/reports/databases"} component={Databases} exact={true}/>
                            <Route path={"/setting/support"} component={Support} exact={true}/>
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


