import React from "react";
import {
    FaUser,
    FaArrowUp,
    FaHome,
    FaArrowDown,
    FaRegChartBar,
    FaRegEnvelope,
    FaRegPaperPlane,
    FaRegEnvelopeOpen, FaRegListAlt, FaBug, FaUsers, FaListUl, FaBook
} from "react-icons/fa";

import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {FiEdit, FiSettings} from "react-icons/fi";
import {MdOutlineHeadsetMic} from "react-icons/md";

export const SidebarData = [
    {
        title: "Overview",
        path: "/overview",
        icon: <FaRegChartBar />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <HiOutlineDocumentReport />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "Report a Bug",
                path: "/reports/reportabug",
                icon: <FaBug />
            },
            {
                title: "Databases",
                path: "/reports/databases",
                icon: <FaRegListAlt />
            }
        ]
    },
    {
        title: "Messages",
        path: "/messages",
        icon: <FaRegEnvelope />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "Inbox",
                path: "/messages/inbox",
                icon: <FaRegEnvelopeOpen />
            },
            {
                title: "Send",
                path: "/messages/send",
                icon: <FaRegPaperPlane />
            }
        ]
    },
    {
        title: "My Department",
        path: "/department",
        icon: <FaUsers />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "My Profile",
        path: "/profile",
        icon: <FaUser />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "My Tasks",
                path: "/profile/tasks",
                icon: <FaListUl />
            }
        ]
    },
    {
        title: "Trackers Book",
        path: "/book",
        icon: <FaBook />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />
    },
    {
        title: "Setting",
        path: "/setting",
        icon: <FiSettings />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "Edit Profile",
                path: "/setting/edit",
                icon: <FiEdit />
            },
            {
                title: "Contact Support",
                path: "/setting/support",
                icon: <MdOutlineHeadsetMic />
            }
        ]
    }
]