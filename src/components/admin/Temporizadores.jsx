import React, { useContext, useEffect, useRef, useState } from "react";
import useDialog from "./../../hooks/useDialog";
import useAlert from "./../../hooks/useAlert";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { Fab, Zoom, CircularProgress, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TemporizadorService from './../../services/TemporizadorService';
import CategoriaService from './../../services/CategoriaService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DialogAdd from "../../dialog/temporizadores/DialogAdd";
import DialogUpdate from "../../dialog/temporizadores/DialogUpdate";

const serviceTemporizadores = new TemporizadorService()
const serviceCategorias = new CategoriaService()

export default function Temporizadores() {
    //Context
    const authContext = useContext(AuthContext);

    //State
    const [temporizadores, setTemporizadores] = useState(null)
    const [status, setStatus] = useState(false)
    const [id, setId] = useState(0)
    const [idCategoria, setIdCategoria] = useState(0)
    const [fecha, setFecha] = useState(null)
    const [categorias, setCategorias] = useState(null)

    //Refs
    const fechaHora = useRef();
    const categoria = useRef();

    //Dialog
    const dialogAdd = useDialog();
    const dialogUpdate = useDialog();

    //Alert
    const alertSuccess = useAlert();
    const alertError = useAlert();

    useEffect(() => {
        authContext.changePage("Temporizadores");
        getAllTemporizadores()
    }, []);
    
    const getAllCategorias = () => {
        serviceCategorias.getAllCategorias().then(result => {
            setCategorias(result)
            setStatus(true)
        })
    }

    const getAllTemporizadores = () => {
        serviceTemporizadores.getAllTemporizadores().then(result => {
            setTemporizadores(result)
            getAllCategorias()
        })
    }

    const addTemporizador = () => {
        serviceTemporizadores.postTemporizador({idTemporizador:0, inicio: fechaHora.current.value, idCategoria: categoria.current.value, pausa: false}).then(() => {
            getAllTemporizadores();
            dialogAdd.handleClose()
            alertSuccess.setMessage("Se ha añadido correctamente");
            alertSuccess.handleOpen();
        })
    }

    const updateTemporizador = () => {
        serviceTemporizadores.updateTemporizador({idTemporizador:id, inicio: fechaHora.current.value, idCategoria: categoria.current.value, pausa: false}).then(() => {
            getAllTemporizadores();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha actualizado correctamente");
            alertSuccess.handleOpen();
        });
    }

    const deleteTemporizador = () => {
        serviceTemporizadores.deleteTemporizador(id).then(() => {
            getAllTemporizadores();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha eliminado correctamente");
            alertSuccess.handleOpen();
        })
    }

    const clickDialogUpdate = (id, inicio, idCategoria) => {
        setId(id)
        setIdCategoria(idCategoria)
        setFecha(inicio)
        dialogUpdate.handleOpen()
    }

    const listTemporizador = () => {
        return (
            <List>
                {
                    temporizadores.map((temporizador, index) => {
                        return (
                            <ListItem component="div" disablePadding key={index} onClick={() => clickDialogUpdate(temporizador.idTemporizador, temporizador.inicio, temporizador.idCategoria)}>
                                <ListItemButton>
                                    <ListItemAvatar >
                                        <MeetingRoomIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </ListItemAvatar>
                                    <ListItemText primary={temporizador.inicio.substring(0, temporizador.inicio.indexOf("T"))  + " / " + temporizador.inicio.substring(temporizador.inicio.indexOf("T") + 1, temporizador.inicio.length)} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        );
    }

    const spinner = () => {
        return (
            <CircularProgress sx={{ display: 'block !important', margin: 'auto', marginTop: '10px' }} />
        )
    }

    return (
        <>
            {alertSuccess.open && (
                <Alert onClose={() => alertSuccess.handleClose()}>
                    {alertSuccess.message}
                </Alert>
            )}

            {alertError.open && (
                <Alert severity="error" onClose={() => alertError.handleClose()}>
                    {alertError.message}
                </Alert>
            )}

            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                {status === false && spinner()}
                {status === true &&
                    <>
                    {
                        listTemporizador()
                    }
                        <Zoom
                            in={true}
                            timeout={{ enter: 10, exit: 10 }}
                            unmountOnExit
                            style={{
                                position: "fixed",
                                top: "calc(100vh - 75px)",
                                right: "20px",
                            }}
                            onClick={() => dialogAdd.handleOpen()}
                        >
                            <Fab color={"primary"} size={"size"}>
                                <AddIcon />
                            </Fab>
                        </Zoom>
                        <DialogAdd open={dialogAdd.open} handleClose={dialogAdd.handleClose} refc={fechaHora} refcCategoria={categoria} categorias={categorias} addTemporizador={addTemporizador} />
                        <DialogUpdate open={dialogUpdate.open} handleClose={dialogUpdate.handleClose} refc={fechaHora} refcCategoria={categoria} inicio={fecha} idCategoria={idCategoria} categorias={categorias} updateTemporizador={updateTemporizador} deleteTemporizador={deleteTemporizador} />
                    </>

                }

            </Box>
        </>
    );
}

