import {
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import EventoService from "./../services/EventoService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

const serviceEventos = new EventoService();

export default function Home() {
  //Context
  const authContext = useContext(AuthContext);

  const open = true;

  //State
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState(null);

  useEffect(() => {
    authContext.changePage("Timer");
    getAllEventos();
  }, []);

  const getAllEventos = () => {
    serviceEventos.getAllEventos().then((result) => {
      setEventos(result);
      setLoading(false);
    });
  };

  const listEventos = () => {
    return (
      <List>
        {loading == false &&
          eventos.map((evento, index) => {
            return (
              <ListItem
                key={index}
                sx={{ color: "black" }}
                component={Link}
                to={"/evento/" + evento.idEvento}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary={evento.nombreEvento} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    );
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return <>{listEventos()}</>;
}
