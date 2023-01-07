import React, { useContext, useEffect, useRef, useState } from "react";
import useDialog from "./../../hooks/useDialog";
import useAlert from "./../../hooks/useAlert";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { Fab, Zoom, CircularProgress, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Alert, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import CategoriaService from './../../services/CategoriaService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DialogAdd from "../../dialog/categorias/DialogAdd";
import DialogUpdate from "../../dialog/categorias/DialogUpdate";

const serviceCategorias = new CategoriaService()

export default function Temporizadores() {
    //Context
    const authContext = useContext(AuthContext);

    //Variable
    const tiempos = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120]

    //State
    const [categorias, setCategorias] = useState(null)
    const [status, setStatus] = useState(false)
    const [id, setId] = useState(0)
    const [categoria, setCategoria] = useState(null)
    const [tiempo, setTiempo] = useState(null)

    //Refs
    const nombre = useRef();
    const duracion = useRef();

    //Dialog
    const dialogAdd = useDialog();
    const dialogUpdate = useDialog();

    //Alert
    const alertSuccess = useAlert();
    const alertError = useAlert();

    useEffect(() => {
        authContext.changePage("Categorias");
        getAllCategorias()
    }, []);

    const getAllCategorias = () => {
        serviceCategorias.getAllCategorias().then(result => {
            setCategorias(result)
            setStatus(true)
        })
    }

    const addCategoria = () => {
        serviceCategorias.postCategoria({ idCategoria: 0, categoria: nombre.current.value, duracion: duracion.current.value }).then(() => {
            getAllCategorias();
            dialogAdd.handleClose()
            alertSuccess.setMessage("Se ha añadido correctamente");
            alertSuccess.handleOpen();
        })
    }

    const updateCategoria = () => {
        serviceCategorias.updateCategoria({ idCategoria: id, categoria: nombre.current.value, duracion: duracion.current.value }).then(() => {
            getAllCategorias();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha actualizado correctamente");
            alertSuccess.handleOpen();
        });
    }

    const deleteCategoria = () => {
        serviceCategorias.deleteCategoria(id).then(() => {
            getAllCategorias();
            dialogUpdate.handleClose()
            alertSuccess.setMessage("Se ha eliminado correctamente");
            alertSuccess.handleOpen();
        })
    }

    const clickDialogUpdate = (id, categoria, tiempo) => {
        setId(id)
        setTiempo(tiempo)
        setCategoria(categoria)
        dialogUpdate.handleOpen()
    }

    const listCategorias = () => {
        return (
            <List>
                {
                    categorias.map((categoria, index) => {
                        return (
                            <ListItem component="div" disablePadding key={index} onClick={() => clickDialogUpdate(categoria.idCategoria, categoria.categoria, categoria.duracion)}>
                                <ListItemButton>
                                    <ListItemAvatar >
                                        <CategoryIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                    </ListItemAvatar>
                                    <ListItemText primary={categoria.categoria} 
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {categoria.duracion} min
                                                </Typography>
                                            </React.Fragment>
                                    } />
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
                            listCategorias()
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
                        <DialogAdd open={dialogAdd.open} handleClose={dialogAdd.handleClose} refc={nombre} refcDuracion={duracion} tiempos={tiempos} addCategoria={addCategoria} />
                        <DialogUpdate open={dialogUpdate.open} handleClose={dialogUpdate.handleClose} refc={nombre} refcDuracion={duracion} nombreCategoria={categoria} tiempo={tiempo} tiempos={tiempos} updateCategoria={updateCategoria} deleteCategoria={deleteCategoria} />
                    </>

                }

            </Box>
        </>
    );
}

