import React, {useState} from "react";

import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {AiOutlineClose, AiOutlineBars} from "react-icons/ai";
import SubMenu from "./SubMenu";
import {SidebarData} from "./SidebarData";
import {IconContext} from "react-icons";
import {FaUber} from "react-icons/fa";



const Nav = styled.div`
  height: 80px;
  position: absolute;
  left: 0;
`;

const NavIcon = styled(NavLink)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #000000;
  width: 17%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  left: 0;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Sidebar = () => {


    return (
        <div>
            <IconContext.Provider value={{color:"white"}}>



            <SidebarNav >

                <SidebarWrap >
                    <h2 style={{color:"white"}}> Bug Tracker  </h2>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index}/>
                    })}

                </SidebarWrap>
            </SidebarNav>
            </IconContext.Provider>
        </div>
    )
}

export default Sidebar;