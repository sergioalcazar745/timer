import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function DialogAdd({open, handleClose, refc, addSalas}) {
    return (
        <>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Añadir una sala</DialogTitle>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Button onClick={() => addSalas()}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
