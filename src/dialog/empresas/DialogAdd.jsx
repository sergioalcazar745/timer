import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function DialogAdd({open, handleClose, refc, addEmpresa}) {
    return (
        <>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Añadir una empresa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre de la empresa"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={refc}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Button onClick={() => addEmpresa()}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
