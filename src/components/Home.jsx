import {
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import EventoService from "./../services/EventoService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ServiceTimerEventos from './../services/ServiceTiemposEventos'
import TemporizadorService from './../services/TemporizadorService'
import CategoriaService from './../services/CategoriaService'
import SalaService from './../services/SalaService'
import { Link } from "react-router-dom";
import useDialog from './../hooks/useDialog';
import './../assets/css/Clock.css'
import io from "socket.io-client";
import DialogUpdate from "../dialog/evento/DialogUpdate";

const socket = io('http://localhost:4000/')

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const serviceEventos = new EventoService();
const serviceCategorias = new CategoriaService();
const serviceTemporizadores = new TemporizadorService()
const serviceSalas = new SalaService()
const serviceTimerEventos = new ServiceTimerEventos();

export default function Home() {
  //Context
  const authContext = useContext(AuthContext);

  //Variable
  const open = true;

  //Refs
  const nombre = useRef();

  //Dialog
  const dialogUpdate = useDialog();

  //State
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [clock, setClock] = useState(null);
  const [eventos, setEventos] = useState(null);
  const [salas, setSalas] = useState(null);
  const [rows, setRows] = useState(null)
  const [temporizadores, setTemporizadores] = useState(null);
  const [tempos, setTempos] = useState(null);
  const [timerEventos, setTimerEventos] = useState(null);

  const receiveMessage = (respuesta) => {
    let resultado = secondsToMMSS(respuesta.contador)
    console.log(resultado)
    let final = resultado.split(":")
    console.log(final)
    setClock({ inicio: respuesta.inicio, minutes: final[0], seconds: final[1] })
  }

  function secondsToMMSS(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  useEffect(() => {
    authContext.changePage("Timer");
    localStorage.setItem("pausar", false)
    localStorage.setItem("reanudar", false)
    // if(localStorage.getItem('pausa')){
    //   setClock(localStorage.getItem('pausa'))
    //   console.log(localStorage.getItem('pausa'))
    // }
    getAllEventos();

    socket.on('cont', receiveMessage);

    return () => {
      socket.off("cont", receiveMessage);
    }
  }, []);

  const comenzar = () => {
    localStorage.setItem("comenzar", false)
    localStorage.setItem("pausar", true)
    let aux = []

    for (let i = 0; i < tempos.length; i++) {
      if (i + 1 < tempos.length) {
        let duracion = subtractTime(getTime(tempos[i + 1].inicio), getTime(tempos[i].inicio));
        aux.push({ inicio: getTime(tempos[i].inicio), duracion: duracion * 60 })
      } else if (i + 1 == tempos.length) {
        let duracion = subtractTime(getTime(eventos[0].finEvento), getTime(tempos[i].inicio));
        aux.push({ inicio: getTime(tempos[i].inicio), duracion: duracion - 60 })
      }
    }
    socket.emit('contador', aux);
  }

  const pausar = () => {
    localStorage.setItem('pausa', clock)
    localStorage.setItem("pausar", false)
    localStorage.setItem("reanudar", true)
    setRefresh(!refresh)
    socket.emit('pausa', 'pausa');
  }

  const reanudar = () => {
    localStorage.setItem("reanudar", false)
    localStorage.setItem("pausar", true)
    setRefresh(!refresh)
    socket.emit('reanudar', 'reanudar');
  }

  const updateEvento = () => {
    setLoading(true)
    serviceEventos.updateEvento({ idEvento: eventos[0].idEvento, nombreEvento: nombre.current.value, inicioEvento: eventos[0].inicioEvento, finEvento: eventos[0].finEvento }).then(result => {
      dialogUpdate.handleClose()
      getAllEventos();
    })
  }

  const getAllEventos = () => {
    serviceEventos.getAllEventos().then((result) => {
      setEventos(result);
      getAllCategorias()
    });
  };

  const getAllCategorias = () => {
    serviceCategorias.getAllCategorias().then(result => {
      getAllTemporizadores(result)
    })
  }

  const getAllTemporizadores = (categorias) => {
    serviceTemporizadores.getAllTemporizadores().then(result => {
      setTimer(result, categorias)
    })
  }

  const setTimer = (tempos, categorias) => {
    let aux = []
    for (let i = 0; i < tempos.length; i++) {
      for (let j = 0; j < categorias.length; j++) {
        if (categorias[j].idCategoria == tempos[i].idCategoria && categorias[j].categoria == "WORK") {
          if (i + 1 < tempos.length) {
            aux.push({ id: tempos[i].idTemporizador, inicio: tempos[i].inicio.substring(tempos[i].inicio.indexOf("T") + 1, tempos[i].inicio.length - 3) })
          } else if (i + 1 == tempos.length) {
            aux.push({ id: tempos[i].idTemporizador, inicio: tempos[i].inicio.substring(tempos[i].inicio.indexOf("T") + 1, tempos[i].inicio.length - 3) })
          }
        }
      }
    }
    setTempos(tempos)
    setTemporizadores(aux)
    getAllTimerEventos()
  }

  const getAllTimerEventos = () => {
    serviceTimerEventos.getAllTiemposEventos().then(result => {
      setTimerEventos(result)
      getAllSalas(result)
    })
  }

  const getAllSalas = (timerEventos) => {
    serviceSalas.getAllSalas().then(result => {
      setSalas(result)
      setSalasWithEmpresas(timerEventos, result);
    })
  }

  const setSalasWithEmpresas = (timerEventos, salas) => {
    let aux = []
    for (let i = 0; i < salas.length; i++) {
      let result = timerEventos.filter(word => word.sala == salas[i].nombreSala)
      let empresas = []
      for (let j = 0; j < result.length; j++) {
        empresas.push(result[j].empresa)
      }
      if (result.length > 0) {
        aux.push({ sala: result[0].sala, empresas: empresas })
      }
    }
    setRows(aux)
    setLoading(false);
  }

  const getTime = (time) => {
    return time.substring(time.indexOf("T") + 1, time.length - 3)
  }

  function subtractTime(hora1, hora2) {
    let [h1, m1] = hora1.split(':');
    let [h2, m2] = hora2.split(':');
    let t1 = new Date();
    let t2 = new Date();
    t1.setHours(h1, m1, 0);
    t2.setHours(h2, m2, 0);
    let diferencia = t1 - t2;
    let segundos = diferencia / 1000;
    let minutos = segundos / 60;
    minutos = Math.trunc(minutos);
    segundos = Math.trunc(segundos - minutos * 60);
    return `${minutos}`;
  }

  const editEvento = () => {
    console.log("Hola")
  }

  const listEventos = () => {
    return (
      <List>
        {authContext.user &&
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

  const tableEvento = () => {
    return (
      <div style={{ width: '80%', margin: 'auto', marginTop: '15px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Salas</TableCell>
                {
                  temporizadores.map((tempo, index) => {
                    return <TableCell align="right" key={index}>{tempo.inicio}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">{row.sala}</TableCell>
                  {
                    row.empresas.map((empresa, index) => {
                      return <TableCell key={index} align="right">{empresa}</TableCell>
                    })
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const clockHTML = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h2 style={{marginTop: '25px'}}>Hora de inicio: {clock.inicio}</h2>
        <div className="clock" style={{marginTop: '25px'}}>
          <div className="hours">
            <div className="first">
              <div className="number">{clock.minutes[0]}</div>
            </div>
            <div className="second">
              <div className="number">{clock.minutes[1]}</div>
            </div>
          </div>
          <div className="tick">:</div>
          <div className="minutes">
            <div className="first">
              <div className="number">{clock.seconds[0]}</div>
            </div>
            <div className="second">
              <div className="number">{clock.seconds[1]}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

  return (
    <>
      {
        loading == false &&
        <>
          {listEventos()}
          {tableEvento()}
          {clock != null &&
            clockHTML()
          }
        </>

      }
      {authContext.user &&
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '25px' }}>
          {localStorage.getItem('comenzar') == 'true' && <Button variant="contained" color="success" onClick={() => comenzar()}>Comenzar</Button>}
          {localStorage.getItem('pausar') == 'true' && <Button variant="contained" color="error" onClick={() => pausar()} sx={{ marginLeft: '15px' }}>Pausar</Button>}
          {localStorage.getItem('reanudar') == 'true' && <Button variant="contained" color="primary" onClick={() => reanudar()} sx={{ marginLeft: '15px' }}>Reanudar</Button>}
          {localStorage.getItem('comenzar') == 'true' && <Button variant="contained" color="warning" onClick={() => dialogUpdate.handleOpen()} sx={{ marginLeft: '15px' }}>Editar evento</Button>}
          <DialogUpdate open={dialogUpdate.open} handleClose={dialogUpdate.handleClose} refc={nombre} updateEvento={updateEvento} />
        </div>}

    </>);
}
