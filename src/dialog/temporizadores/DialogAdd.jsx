import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function DialogAdd({ open, handleClose, refc, refcCategoria, categorias, addTemporizador }) {
    return (
        <>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Añadir un temporizador</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=""
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        inputRef={refc}
                    />
                    <FormControl sx={{ mt: 3, width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Categoria"
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
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Button onClick={() => addTemporizador()}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
