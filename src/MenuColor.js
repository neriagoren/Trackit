import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar, Badge, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {ColorLens} from "@mui/icons-material";



export default function MenuColor() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState("");

    const picker = (picked) => {
        setColor(() => picked);
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="שנה צבע" placement={"left"}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >


                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <ColorLens  sx={{color:"orange"}}
                                />
                            }
                        >
                            <Avatar sx={{ width: 50, height: 50 , backgroundColor:color}}>נ</Avatar>

                        </Badge>
                    </IconButton>
                </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflowY: 'auto',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        height:"200px",
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: 2,
                            mr: 0,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => picker("#2596be")}>
                    <Avatar sx={{backgroundColor:"#2596be"}}> M </Avatar>
                </MenuItem>
                <MenuItem onClick={() => picker("lightseagreen")}>
                    <Avatar sx={{backgroundColor:"lightseagreen"}}> M </Avatar>
                </MenuItem>
                <MenuItem onClick={() => picker("pink")}>
                    <Avatar sx={{backgroundColor:"pink"}}> M </Avatar>

                </MenuItem>
                <MenuItem onClick={() => picker("red")}>
                    <Avatar sx={{backgroundColor:"red"}}> M </Avatar>

                </MenuItem>
                <MenuItem onClick={() => picker("gold")}>
                    <Avatar sx={{backgroundColor:"gold"}}> M </Avatar>

                </MenuItem>
                <MenuItem onClick={() => picker("black")}>
                    <Avatar sx={{backgroundColor:"black"}}> M </Avatar>

                </MenuItem>
                <MenuItem onClick={() => picker("purple")}>
                    <Avatar sx={{backgroundColor:"purple"}}> M </Avatar>

                </MenuItem>
                <MenuItem onClick={() => picker("")}>
                    <Avatar sx={{backgroundColor:""}}> M </Avatar>
                </MenuItem>
            </Menu>
            </Box>
        </React.Fragment>
    );
}
