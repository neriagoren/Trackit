import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {FaBook, FaBug, FaListUl, FaRegChartBar, FaRegEnvelope, FaRegListAlt, FaUser, FaUsers} from "react-icons/fa";
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {FiEdit, FiSettings} from "react-icons/fi";
import {MdOutlineHeadsetMic} from "react-icons/md";
import NavLink from "react-router-dom/es/NavLink";


const drawerWidth = 240;


const SidebarData = [
    {
        title: "מבט כללי",
        path: "/overview",
        icon: <FaRegChartBar />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "דוחות",
        path: "/reports",
        icon: <HiOutlineDocumentReport />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "דיווח תקלה",
                path: "/reports/reportabug",
                icon: <FaBug />
            },
            {
                title: "מסד נתונים",
                path: "/reports/databases",
                icon: <FaRegListAlt />
            }
        ]
    },
    {
        title: "הודעות",
        path: "/messages",
        icon: <FaRegEnvelope />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "מחלקה שלי",
        path: "/department",
        icon: <FaUsers />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
    },
    {
        title: "פרופיל",
        path: "/profile",
        icon: <FaUser />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "משימות שלי",
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
        title: "הגדרות",
        path: "/setting",
        icon: <FiSettings />,
        iconClosed: <GoTriangleDown />,
        iconOpened: <GoTriangleUp />,
        subNav: [
            {
                title: "ערוך פרופיל",
                path: "/setting/edit",
                icon: <FiEdit />
            },
            {
                title: "תמיכה טכנית",
                path: "/setting/support",
                icon: <MdOutlineHeadsetMic />
            }
        ]
    }
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledIcon = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    borderRadius: '10px',
    width:'100px'
}));

export default function ClippedDrawer() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>פרופיל</MenuItem>
            <MenuItem onClick={handleMenuClose}>חשבון שלי</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>


                <p>הודעות</p>
            </MenuItem>
            <MenuItem>


                    <p>עדכונים</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>

                <p> חשבון שלי</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>


                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="חיפוש"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <StyledIcon>
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </StyledIcon>

                        <StyledIcon>
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </StyledIcon>
                        <StyledIcon>
                            <AccountCircle />
                        </StyledIcon>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' , width:'240px', textAlign:'center'}}}>

                        Track Kit
                    </Typography>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto'}}>
                    <List>
                        {SidebarData.map((item, index) => (
                            <NavLink to = {item.path}  key = {index} activeStyle={{ color: "blue" }} style={{textDecoration:"none", color:"black"}}  >
                                <ListItem button key={item.title}>
                                    <ListItemText primary={item.title} sx={{textAlign:"center"}}/>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                </ListItem>
                            </NavLink>

                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['הגדרות', 'מחלקות', 'תקלות', 'כל מיני'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} sx={{textAlign:"center"}}/>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
