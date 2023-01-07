import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function DialogAdd({ open, handleClose, refc, refcDuracion, tiempos, addCategoria }) {
    return (
        <>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Añadir una categoria</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre de la categoria"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={refc}
                    />
                    <FormControl sx={{ mt: 3, width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Duracion</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Duracion"
                            inputRef={refcDuracion}
                        >
                            {
                                tiempos.map((tiempo, index) => {
                                    return (<MenuItem key={tiempo} value={tiempo}>{tiempo}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Button onClick={() => addCategoria()}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
