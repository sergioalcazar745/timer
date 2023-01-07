import React, { useContext, useEffect, useRef, useState } from "react";
import useDialog from "./../../hooks/useDialog";
import useAlert from "./../../hooks/useAlert";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { Fab, Zoom, CircularProgress, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Alert, Avatar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EmpresaService from './../../services/EmpresaService';
import DialogAdd from "../../dialog/empresas/DialogAdd";
import DialogUpdate from "../../dialog/empresas/DialogUpdate";

const serviceEmpresa = new EmpresaService()

export default function Salas() {
    //Context
    const authContext = useContext(AuthContext);

    //State
    const [empresas, setEmpresas] = useState(null)
    const [status, setStatus] = useState(false)
    const [id, setId] = useState(0)
    const [nombreEmpresa, setNombreEmpresa] = useState(null)

    //Refs
    const nombre = useRef();

    //Dialog
    const dialogAdd = useDialog();
    const dialogUpdate = useDialog();

    //Alert
    const alertSuccess = useAlert();
    const alertError = useAlert();

    useEffect(() => {
        authContext.changePage("Empresas");
        getAllEmpresas()
    }, []);

    const getAllEmpresas = () => {
        serviceEmpresa.getAllEmpresas().then(result => {
            setEmpresas(result)
            setStatus(true)
        })
    }

    const addEmpresa = () => {
        serviceEmpresa.postEmpresa(nombre.current.value).then(() => {
            getAllEmpresas();
            dialogAdd.handleClose()
            alertSuccess.setMessage("Se ha añadido correctamente");
            alertSuccess.handleOpen();
        })
    }

    const updateEmpresa = () => {
        serviceEmpresa.updateEmpresa(id, nombre.current.value).then(() => {
            getAllEmpresas();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha actualizado correctamente");
            alertSuccess.handleOpen();
        });
    }

    const deleteEmpresa = () => {
        serviceEmpresa.deleteEmpresa(id).then(() => {
            getAllEmpresas();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha eliminado correctamente");
            alertSuccess.handleOpen();
        })
    }

    const clickDialogUpdate = (id, nombre) => {
        setId(id)
        setNombreEmpresa(nombre)
        dialogUpdate.handleOpen()
    }

    const listSalas = () => {
        return (
            <List>
                {
                    empresas.map((empresa, index) => {
                        return (
                            <ListItem component="div" disablePadding key={index} onClick={() => clickDialogUpdate(empresa.idEmpresa, empresa.nombreEmpresa)}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={empresa.imagen} />
                                        </ListItemAvatar>
                                    <ListItemText primary={empresa.nombreEmpresa} />
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
                <DialogAdd open={dialogAdd.open} handleClose={dialogAdd.handleClose} refc={nombre} addEmpresa={addEmpresa}/>
                <DialogUpdate open={dialogUpdate.open} nombre={nombreEmpresa} refc={nombre} handleClose={dialogUpdate.handleClose} updateEmpresa={updateEmpresa} deleteEmpresa={deleteEmpresa}/>
            </Box>
        </>
    );
}
