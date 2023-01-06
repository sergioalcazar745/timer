import React, { useRef, useState, useContext, useEffect } from "react";
import FormLabel from "@mui/joy/FormLabel";
import { TextField, Button, CircularProgress, Backdrop } from "@mui/material";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import LoginService from "../services/LoginService";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

//Services
const service = new LoginService();

export default function Login() {
    //Context
    const authContext = useContext(AuthContext);

    //Refs
    const cajausuario = useRef(null);
    const cajapass = useRef(null);

    //States
    const [mensajeError, setMensajeError] = useState(null);
    const [status, setStatus] = useState(false);
    const [open] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        authContext.changePage("Login")
    }, [])

    const datosLogin = () => {
        setLoading(true);

        var usuario = cajausuario.current.value;
        var pass = cajapass.current.value;

        if (usuario.length == 0) {
            setMensajeError("El campo usuario esta vacío");
        } else if (pass.length == 0) {
            setMensajeError("El campo contraseña esta vacío");
        } else {
            var data = { userName: usuario, password: pass };
            service
                .getToken(data)
                .then((result) => {
                    // localStorage.setItem("token", result);
                    authContext.login(result)
                    setStatus(true)
                    localStorage.setItem("comienzo", "comienzo");
                })
                .catch((error) => {
                    var mensajeError = "No se ha encontrado el usuario";
                    setMensajeError(mensajeError);
                    localStorage.removeItem("token");
                });
        }
    };

    const returnHome = () => {
        setStatus(true);
    };

    if (status) {
        return <Navigate to={"/"} />;
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
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: "70vh", maxwidth: "100vw" }}
        >
            <h1 style={{ margin: "auto" }}>LOGIN</h1>
            <Grid>
                <Container>
                    <FormLabel>Usuario: </FormLabel>
                    <TextField
                        fullWidth
                        inputRef={cajausuario}
                        placeholder="Usuario"
                        type="text"
                    />
                    <br />
                </Container>
                <br />
                <Container>
                    <FormLabel>Contraseña: </FormLabel>
                    <TextField
                        fullWidth
                        inputRef={cajapass}
                        placeholder="Contraseña"
                        type="password"
                    />
                </Container>
                <br />
                <center>
                    <Container>
                        <Button variant="contained" color="success" onClick={datosLogin}>
                            Enviar datos
                        </Button>
                        <Button
                            sx={{ marginLeft: "10px" }}
                            variant="contained"
                            color="primary"
                            onClick={returnHome}
                        >
                            Timer
                        </Button>
                    </Container>
                    <br />
                    {mensajeError != null && (
                        <h1 style={{ color: "red", fontSize: "25px" }}>{mensajeError}</h1>
                    )}
                </center>
            </Grid>
        </Grid>
    );
}
