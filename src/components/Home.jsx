import {
  Backdrop,
  Button,
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
import ServiceTimerEventos from './../services/ServiceTiemposEventos'
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io('http://localhost:4000/')

const serviceEventos = new EventoService();
const serviceTimerEventos = new ServiceTimerEventos();

export default function Home() {
  //Context
  const authContext = useContext(AuthContext);

  const open = true;

  //State
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState(null);
  const [timerEventos, setTimerEventos] = useState(null);

  const receiveMessage = (respuesta) => {
    // this.state.segundos = respuesta.numero;
    // this.state.hora = respuesta.hora
    // this.setState({ segundos: this.state.segundos, hora: this.state.hora })
    // this.timer(respuesta.numero);
  }

  useEffect(() => {
    authContext.changePage("Timer");

    if (authContext.user) {
      getAllEventos();
    }else{
      getAllTimerEventos()
    }

    socket.on('cont', receiveMessage);

    return () => {
      socket.off("cont", receiveMessage);
    }
  }, []);

  const comenzar = () => {
    console.log("Hola")
  }

  const getAllEventos = () => {
    serviceEventos.getAllEventos().then((result) => {
      setEventos(result);
      setLoading(false);
    });
  };

  const getAllTimerEventos = () => {
    serviceTimerEventos.getAllTimerEventos().then(result => {
      setTimerEventos(result)
      setLoading(false);
    })
  }

  const editEvento = () => {
    console.log("Hola")
  }

  const listEventos = () => {
    return (
      <List>
        {loading == false && authContext.user &&
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

  return( 
  <>
  {listEventos()}
  <Button variant="contained" color="success" onClick={() => comenzar()}>Comenzar</Button>
  </>);
}
