import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function DialogUpdate({open, handleClose, refc, updateEvento}) {
    return (
        <>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Cambiar nombre del evento</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={refc}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Button onClick={() => updateEvento()}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}