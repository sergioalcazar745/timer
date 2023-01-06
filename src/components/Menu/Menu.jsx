import * as React from 'react';
import { useState } from 'react';
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
import ItemsMenu from "./ItemsMenu"

export default function Menu() {

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleDrawer = (value) => {
    setOpen(value)
  }

  const handleMenu = (event) => {
    this.setState({
        setAnchorEl: event.currentTarget
    })
  };

  const handleClose = (event) => {
    setAnchorEl(null)
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* {localStorage.getItem("token") && ( */}
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
            {/* )} */}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Timer
            </Typography>

            {/* {localStorage.getItem("token") ? ( */}
              <>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
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
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => this.cerrazSesion()}>
                    Cerrar sesión
                  </MenuItem>
                </MenuTimer>
              </>
            {/* ) : ( */}
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            {/* )} */}
          </Toolbar>
        </AppBar>
      </Box>
      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => toggleDrawer(false)}
        >
          {<ItemsMenu anchor={"left"} toggleDrawer={toggleDrawer}/>}
        </Drawer>
      </React.Fragment>
    </>
  );
}
