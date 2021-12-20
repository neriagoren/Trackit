import React from "react";
import {FaUser, FaArrowUp, FaHome, FaArrowDown} from "react-icons/fa";
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";

export const SidebarData = [
    {
        title: "Overview",
        path: "/overview",
        icon: <FaHome />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            },
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            },
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            }
        ]
    },
    {
        title: "Reports",
        path: "/ reports",
        icon: <FaHome />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            },
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            },
            {
                title: "Users",
                path: "/overview/users",
                icon: <FaUser />
            }
        ]
    },
    {
        title: "My Profile",
        path: "/profile",
        icon: <FaHome />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    }
]