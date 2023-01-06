import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuTimer from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import ListMenu from "./ListMenu"
import { AuthContext } from '../../context/AuthContext';

export default function Menu() {

  const authContext = useContext(AuthContext);

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleDrawer = (value) => {
    setOpen(value)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = (event) => {
    setAnchorEl(null)
  };

  const cerrarSesion = () => {
    authContext.logout()
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {authContext.user && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            )}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {authContext.page}
            </Typography>

            {authContext.user ? (
            <>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleMenu(e)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <MenuTimer
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={(e) => handleClose(e)}
              >
                <MenuItem onClick={() => cerrarSesion()}>
                  Cerrar sesión
                </MenuItem>
              </MenuTimer>
            </>
            ) : ( 
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => toggleDrawer(false)}
        >
          {<ListMenu anchor={"left"} toggleDrawer={toggleDrawer} />}
        </Drawer>
      </React.Fragment>
    </>
  );
}
