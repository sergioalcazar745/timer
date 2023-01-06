import React, { useState } from 'react'

export default function useAlert() {

    //Context
    const [open, setOpen] = useState(false) 
    const [message, setMessage] = useState("");

    const handleOpen = () => {
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
    } 

    return {
        open,
        message,
        setMessage,
        handleOpen,
        handleClose
    }
}
