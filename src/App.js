import './App.css';
import Sidebar from "./components/Sidebar";
import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import Welcome from "./Welcome";
import styled from "styled-components";
import {FaHome, FaUser} from "react-icons/fa";


const Header = styled.div`
  background: #000000;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component{

    render() {
        return (
            <BrowserRouter>
            <div className="App">

                <Sidebar />

                <Header>
                    <h1 style={{color: "white"}}> BUG TRACKER </h1>
                    <div  style={{position:"absolute",display:"flex", right:"2%", color: "white"}}>
                            <h3 style={{margin:"10px"}}> Sign out </h3>
                            <h3 style={{margin:"10px"}}> <FaUser /> </h3>
                    </div>
                </Header>

            </div>
            </BrowserRouter>

        );
    }
}

export default App;
