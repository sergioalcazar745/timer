import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CategoryIcon from '@mui/icons-material/Category';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router-dom";

export default function ItemsMenu({ anchor, toggleDrawer }) {
  return (
    <>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <List>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/salas"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Salas"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/empresas"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Empresas"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/categorias"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Categorias"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/temporizadores"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary={"Temporizadores"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to="/eventos"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Eventos"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
