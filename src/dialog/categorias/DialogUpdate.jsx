import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function DialogUpdate({ open, handleClose, refc, refcDuracion, nombreCategoria, tiempo, tiempos, updateCategoria, deleteCategoria }) {
    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Información</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre de la categoría"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputRef={refc}
                    defaultValue={nombreCategoria}
                />
                <FormControl sx={{ mt: 3, width: '100%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Duracion</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Categoria"
                        defaultValue={tiempo}
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
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button onClick={() => deleteCategoria()}>Eliminar</Button>
                <Button onClick={() => updateCategoria()}>Actualizar</Button>
            </DialogActions>
        </Dialog>
    )
}
