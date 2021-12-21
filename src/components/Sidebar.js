import React, {useState} from "react";

import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {AiOutlineClose, AiOutlineBars} from "react-icons/ai";
import SubMenu from "./SubMenu";
import {SidebarData} from "./SidebarData";
import {IconContext} from "react-icons";



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
  width: 15%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
`
const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div>
            <IconContext.Provider value={{color:"white"}}>

                <Nav>
                    <NavIcon to = "#">
                        <AiOutlineBars onClick={showSidebar} />
                    </NavIcon>

                </Nav>


            <SidebarNav sidebar = {sidebar}>
                <SidebarWrap>
                    <NavIcon to = "#">
                        <AiOutlineClose onClick={showSidebar}/>
                    </NavIcon>
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