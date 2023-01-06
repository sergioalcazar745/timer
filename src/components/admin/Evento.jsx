import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Evento() {

    //Params
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <>
              
        </>
    )
}
