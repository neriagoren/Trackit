import './App.css';
import Sidebar from "./components/Sidebar";
import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import styled from "styled-components";
import {FaHome, FaUser} from "react-icons/fa";
import Stats from "./components/Boards/Stats";
import Team from "./components/Boards/Team";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Send from "./pages/Send";
import Databases from "./pages/Databases";
import Report from "./pages/Report";
import Sign from "./pages/Sign";


const Header = styled.div`
  background: #000000;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component{

    state = {

    }

    render() {
        return (
            <BrowserRouter>
            <div className="App">

                <Sidebar />


                <Route path={"/overview"} component={Overview} exact={true}/>
                <Route path={"/"} component={Sign} exact={true}/>
                <Route path={"/profile"} component={Profile} exact={true}/>
                <Route path={"/messages"} component={Messages} exact={true}/>
                <Route path={"/messages/send"} component={Send} exact={true}/>
                <Route path={"/reports"} component={Reports} exact={true}/>
                <Route path={"/reports/reportabug"} component={Report} exact={true}/>
                <Route path={"/reports/databases"} component={Databases} exact={true}/>


            </div>
            </BrowserRouter>

        );
    }
}

export default App;
