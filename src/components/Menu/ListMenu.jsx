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
import ItemMenu from './ItemMenu';

export default function ListMenu({ anchor, toggleDrawer }) {
  return (
    <>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <List>
          <ItemMenu route={"/"} text={"Home"} icon={<HomeIcon/>}/>
        </List>
        <Divider />
        <List>
          <ItemMenu route={"/salas"} text={"Salas"} icon={<MeetingRoomIcon />}/>
          <ItemMenu route={"/empresas"} text={"Empresas"} icon={<WorkIcon />}/>
          <ItemMenu route={"/categorias"} text={"Categorias"} icon={<CategoryIcon />}/>
          <ItemMenu route={"/temporizadores"} text={"Temporizadores"} icon={<AccessAlarmIcon />}/>
        </List>
      </Box>
    </>
  );
}
