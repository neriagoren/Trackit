import './App.css';
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Databases from "./pages/Databases";
import Report from "./pages/Report";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Support from "./pages/Support";
import Department from "./pages/Department";
import MiniDrawer from "./components/MiniDrawer";


function App(){
    return (
        <BrowserRouter>
            <div className="App">

                <MiniDrawer/>

                <Route path={"/overview"} component={Overview} exact={true}/>
                <Route path={"/"} component={SignIn} exact={true}/>
                <Route path={"/signup"} component={SignUp} exact={true}/>
                <Route path={"/department"} component={Department} exact={true}/>
                <Route path={"/profile"} component={Profile} exact={true}/>
                <Route path={"/messages"} component={Messages} exact={true}/>
                <Route path={"/reports"} component={Reports} exact={true}/>
                <Route path={"/reports/reportabug"} component={Report} exact={true}/>
                <Route path={"/reports/databases"} component={Databases} exact={true}/>
                <Route path={"/setting/support"} component={Support} exact={true}/>

            </div>
        </BrowserRouter>
    );
}

export default App;