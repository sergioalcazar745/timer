import React, { useContext, useEffect, useRef, useState } from "react";
import useDialog from "./../../hooks/useDialog";
import useAlert from "./../../hooks/useAlert";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { Fab, Zoom, CircularProgress, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SalaService from './../../services/SalaService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DialogAdd from "../../dialog/salas/dialogAdd";
import DialogUpdate from "../../dialog/salas/DialogUpdate";

const serviceSalas = new SalaService()

export default function Salas() {
    //Context
    const authContext = useContext(AuthContext);

    //State
    const [salas, setSalas] = useState(null)
    const [status, setStatus] = useState(false)
    const [id, setId] = useState(0)
    const [nombreSala, setNombreSala] = useState(null)

    //Refs
    const nombre = useRef();

    //Dialog
    const dialogAdd = useDialog();
    const dialogUpdate = useDialog();

    //Alert
    const alertSuccess = useAlert();
    const alertError = useAlert();

    useEffect(() => {
        authContext.changePage("Salas");
        getAllSalas()
    }, []);

    const getAllSalas = () => {
        serviceSalas.getAllSalas().then(result => {
            setSalas(result)
            setStatus(true)
        })
    }

    const addSalas = () => {
        serviceSalas.postSala(nombre.current.value).then(() => {
            getAllSalas();
            dialogAdd.handleClose()
            alertSuccess.setMessage("Se ha añadido correctamente");
            alertSuccess.handleOpen();
        })
    }

    const updateSala = () => {
        serviceSalas.updateSala(id, nombre.current.value).then(() => {
            getAllSalas();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha actualizado correctamente");
            alertSuccess.handleOpen();
        });
    }

    const deleteSala = () => {
        serviceSalas.deleteSala(id).then(() => {
            getAllSalas();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha eliminado correctamente");
            alertSuccess.handleOpen();
        })
    }

    const clickDialogUpdate = (id, nombre) => {
        setId(id)
        setNombreSala(nombre)
        dialogUpdate.handleOpen()
    }

    const listSalas = () => {
        return (
            <List>
                {
                    salas.map((sala, index) => {
                        return (
                            <ListItem component="div" disablePadding key={index} onClick={() => clickDialogUpdate(sala.idSala, sala.nombreSala)}>
                                <ListItemButton>
                                    <ListItemAvatar >
                                        <MeetingRoomIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={sala.nombreSala} />
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
            <CircularProgress sx={{display: 'block !important', margin: 'auto', marginTop: '10px'}} />
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
                {status === true && listSalas()}
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
                <DialogAdd open={dialogAdd.open} handleClose={dialogAdd.handleClose} refc={nombre} addSalas={addSalas}/>
                <DialogUpdate open={dialogUpdate.open} nombre={nombreSala} refc={nombre} handleClose={dialogUpdate.handleClose} updateSala={updateSala} deleteSala={deleteSala}/>
            </Box>
        </>
    );
}
