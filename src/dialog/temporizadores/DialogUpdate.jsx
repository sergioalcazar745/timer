import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function DialogUpdate({ open, handleClose, refc, refcCategoria, inicio, idCategoria, categorias, updateTemporizador, deleteTemporizador }) {
    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Información</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre de la empresa"
                    type="datetime-local"
                    fullWidth
                    variant="standard"
                    inputRef={refc}
                    defaultValue={inicio}
                />
                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Categoria"
                        defaultValue={idCategoria}
                        inputRef={refcCategoria}
                    >
                        {
                            categorias.map((categoria, index) => {
                                return (<MenuItem key={index} value={categoria.idCategoria}>{categoria.categoria}</MenuItem>)
                            })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button onClick={() => deleteTemporizador()}>Eliminar</Button>
                <Button onClick={() => updateTemporizador()}>Actualizar</Button>
            </DialogActions>
        </Dialog>
    )
}
