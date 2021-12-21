import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(NavLink)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 25px;
  
  &:hover {
    background: gray;
    border-left: 4px solid red;
    cursor:pointer;
  }
  
  &:active {
    background: gray;

  }
    
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(NavLink)`
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  
  &:hover {
    background: grey;
    cursor: pointer;
  }
`;
const SubMenu = ({item}) => {

    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)
    return (
        <div>
            <SidebarLink to={item.path}  onClick={item.subNav && showSubnav} activeStyle={{ backgroundColor: "grey" }}>
                <div>
                    {item.icon}
                    <SidebarLabel>
                        {item.title}
                    </SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null
                    }
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item,index) => {
                return (
                    <DropdownLink to = {item.path}  key = {index} activeStyle={{ backgroundColor: "red" }} >
                        {item.icon}
                        <SidebarLabel> {item.title} </SidebarLabel>
                    </DropdownLink>
                )
            })}

        </div>
    )

}

export default SubMenu