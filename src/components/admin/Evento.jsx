import { Alert, Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import $ from 'jquery';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import EventoService from '../../services/EventoService';
import SalaService from './../../services/SalaService';
import EmpresaService from './../../services/EmpresaService';
import TemporizadorService from './../../services/TemporizadorService';
import ServiceTiempoEmpresaSala from './../../services/ServiceTiemposEmpresasSalas';
import CategoriaService from './../../services/CategoriaService';
import useAlert from "./../../hooks/useAlert";

const serviceSalas = new SalaService()
const serviceTemporizadores = new TemporizadorService();
const serviceCategorias = new CategoriaService();
const serviceEmpresa = new EmpresaService();
const serviceEvento = new EventoService();
const serviceTiempoEmpresaSala = new ServiceTiempoEmpresaSala();

export default function Evento() {
    //Context
    const authContext = useContext(AuthContext);

    //Refs
    const empresa = useRef();
    const horas = useRef();

    //Variable
    const open = true;

    //Alert
    const alertSuccess = useAlert();

    //State
    const [status, setStatus] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [idSala, setIdSala] = useState(0);
    const [evento, setEvento] = useState(null)
    const [salas, setSalas] = useState(null)
    const [categorias, setCategorias] = useState(null)
    const [empresas, setEmpresas] = useState(null)
    const [temporizadores, setTemporizadores] = useState(null)

    //Params
    const { id } = useParams();

    useEffect(() => {
        authContext.changePage("Eventos")
        getByIdEvento()
    }, [])

    const handleChangeSalas = (event) => {
        // setRefresh(true)
        // setRefresh(false)
        setIdSala(event.target.value)
    }

    const postTiempoEmpresaSala = () => {
        console.log("Evento" + id)
        console.log("Timer" + horas.current.value)
        console.log("Sala" + idSala)
        console.log("Empresa" + empresa.current.value)
        serviceTiempoEmpresaSala.postTiemposEmpresasSalas({ id: 0, idTimer: horas.current.value, idEmpresa: empresa.current.value, idSala: idSala, idEvento: id }).
            then(result => {
                alertSuccess.setMessage("Se ha insertado correctamente.")
                alertSuccess.handleOpen()
            })
    }

    const getByIdEvento = () => {
        serviceEvento.getByIdEventos(id).then(result => {
            setEvento(result)
            getAllSalas(result)
        })
    }

    const getAllSalas = (evento) => {
        serviceSalas.getAllSalas().then(result => {
            setSalas(result)
            getAllEmpresas(evento)
        })
    }

    const getAllEmpresas = (evento) => {
        serviceEmpresa.getAllEmpresas().then(result => {
            setEmpresas(result)
            getAllCategorias(evento)
        })
    }

    const getAllCategorias = (evento) => {
        serviceCategorias.getAllCategorias().then(result => {
            setCategorias(result)
            getAllTemporizadores(evento, result)
        })
    }

    const getAllTemporizadores = (evento, categorias) => {
        serviceTemporizadores.getAllTemporizadores().then(result => {
            setTimer(result, evento, categorias)
        })
    }

    const setTimer = (tempos, evento, categorias) => {
        let aux = []
        for (let i = 0; i < tempos.length; i++) {
            for (let j = 0; j < categorias.length; j++) {
                if (categorias[j].idCategoria == tempos[i].idCategoria && categorias[j].categoria == "WORK") {
                    if (i + 1 < tempos.length) {
                        // contador: getTime(tempos[i+1].inicio, tempos[i].inicio)
                        aux.push({ id: tempos[i].idTemporizador, inicio: tempos[i].inicio.substring(tempos[i].inicio.indexOf("T") + 1, tempos[i].inicio.length - 3) })
                    } else if (i + 1 == tempos.length) {
                        aux.push({ id: tempos[i].idTemporizador, inicio: tempos[i].inicio.substring(tempos[i].inicio.indexOf("T") + 1, tempos[i].inicio.length - 3) })
                    }
                }
            }
        }
        console.log(aux)
        setTemporizadores(aux)
        setStatus(true)
    }

    // const getTime = (time1, time2) => {
    //     return subtractTime(time1.substring(time1.indexOf("T") + 1, time1.length - 3), time2.substring(time2.indexOf("T") + 1, time2.length - 3))
    // }

    // function subtractTime(hora1, hora2) {
    //     let [h1, m1] = hora1.split(':');
    //     let [h2, m2] = hora2.split(':');
    //     let t1 = new Date();
    //     let t2 = new Date();
    //     t1.setHours(h1, m1, 0);
    //     t2.setHours(h2, m2, 0);
    //     let diferencia = t1 - t2;
    //     let segundos = diferencia / 1000;
    //     let minutos = segundos / 60;
    //     minutos = Math.trunc(minutos);
    //     segundos = Math.trunc(segundos - minutos * 60);
    //     return `${minutos}`;
    // }

    const selectSalas = () => {
        return (
            <FormControl variant="standard" sx={{ ml: 2, mt: 2, minWidth: 120, maxWidth: '90%', width: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Salas</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={salas[0].idSalas}
                    onChange={handleChangeSalas}
                    label="Age"
                >
                    {
                        salas != null &&
                        salas.map((sala, index) => {
                            return <MenuItem key={sala.idSala} value={sala.idSala}>{sala.nombreSala}</MenuItem>
                        })
                    }
                </Select>
                {/* <Button variant='contained' color='error' sx={{ marginTop: '15px' }} onClick={() => }>Borrar datos</Button> */}
            </FormControl>
            
        )
    }

    const selectHoras = () => {
        return (
            <FormControl variant="standard" sx={{ ml: 2, mt: 2, minWidth: 120, maxWidth: '50%', width: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Horas</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={temporizadores[0].id}
                    label="Age"
                    inputRef={horas}
                    className='selectEmpresas'
                >
                    {
                        temporizadores != null &&
                        temporizadores.map((temporizador, index) => {
                            return <MenuItem key={temporizador.id} value={temporizador.id}>{temporizador.inicio}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        )
    }

    const selectEmpresas = (idTemporizador) => {
        return (
            <FormControl variant="standard" sx={{ ml: 2, mt: 2, minWidth: 120, maxWidth: '50%', width: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Empresa</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={empresas[0].idEmpresa}
                    label="Age"
                    inputRef={empresa}
                    className='selectEmpresas'
                >
                    {
                        empresas != null &&
                        empresas.map((empresa, index) => {
                            return <MenuItem key={empresa.idEmpresa} value={empresa.idEmpresa}>{empresa.nombreEmpresa}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        )
    }

    // const horasEmpresas = () => {
    //     return (
    //         <>
    //             {
    //                 // refresh == false &&
    //                 temporizadores.map((temporizador, index) => {
    //                     return (
    //                         <div key={index} style={{ textAlign: 'center', marginTop: '30px' }}>
    //                             <h3>{temporizador.inicio}</h3>
    //                             {
    //                                 selectEmpresas(temporizador.id)
    //                             }
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </>
    //     )
    // }

    if (!status) {
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
            {alertSuccess.open && (
                <Alert onClose={() => alertSuccess.handleClose()}>
                    {alertSuccess.message}
                </Alert>
            )}
            {
                status &&
                selectSalas()
            }

            {
                (status) && (idSala != 0) &&
                <>
                    {selectEmpresas()}
                    {selectHoras()}
                    <Button variant='contained' color='info' sx={{ marginTop: '15px' }} onClick={() => postTiempoEmpresaSala()}>Añadir</Button>
                </>
            }

        </>
    )
}
