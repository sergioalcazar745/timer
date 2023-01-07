import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function DialogUpdate({open, nombre, refc, handleClose, updateEmpresa, deleteEmpresa}) {
    return (
        <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Información</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre de la sala"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputRef={refc}
                    defaultValue={nombre}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button onClick={() => deleteEmpresa()}>Eliminar</Button>
                <Button onClick={() => updateEmpresa()}>Actualizar</Button>
            </DialogActions>
        </Dialog>
    )
}
