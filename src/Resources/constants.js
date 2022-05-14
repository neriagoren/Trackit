import AssessmentIcon from "@mui/icons-material/Assessment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import { createTheme } from '@mui/material/styles';
import { blueGrey } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';

const hoursAgenda = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00", "23:00", "00:00"];


const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];

const abbDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const minutes = [0, 15, 30, 45];

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: blueGrey[500],
        },
    },
});


const adminSidebarData = [
    {
        id: "reports",
        title: "דוחות",
        path: "/admin/reports",
        icon: <AssessmentIcon />,
    },
    {
        id: "create",
        title: "צור משתמש",
        path: "/admin/create-tutor",
        icon: <EventAvailableIcon />,
    }
]
const tutorSidebarData = [
    {
        id: "overview",
        title: "מבט כללי",
        path: "/tutor/overview",
        icon: <AssessmentIcon />,
    },
    {
        id: "create",
        title: "צור תגבור",
        path: "/tutor/createevent",
        icon: <EventAvailableIcon />,
    },
    {
        id: "reports",
        title: "דוחות",
        path: "/tutor/reports",
        icon: <SummarizeIcon />,
    },
    {
        id: "messages",
        title: "הודעות",
        path: "/tutor/inbox",
        icon: <ChatIcon />,
    },
    {
        id: "profile",
        title: "פרופיל",
        path: "/tutor/profile",
        icon: <AssignmentIndIcon />,
    },
    {
        id: "setting",
        title: "הגדרות",
        path: "/tutor/setting",
        icon: <SettingsIcon />,
    }
]

const studentSidebarData = [
    {
        id: "overview",
        title: "מבט כללי",
        path: "/student/overview",
        icon: <AssessmentIcon />,
    },
    {
        id: "messages",
        title: "הודעות",
        path: "/student/inbox",
        icon: <ChatIcon />,
    },
    {
        id: "searchtutor",
        title: "חפש מתגבר/ת",
        path: "/student/search-tutor",
        icon: <SearchIcon />,
    },
    {
        id: "profile",
        title: "פרופיל",
        path: "/student/profile",
        icon: <AssignmentIndIcon />,
    },
    {
        id: "setting",
        title: "הגדרות",
        path: "/student/setting",
        icon: <SettingsIcon />,
    }
]

export { hours, minutes, theme, adminSidebarData, tutorSidebarData, studentSidebarData, hoursAgenda, days, months, abbDays };