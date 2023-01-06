import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoutes() {

    //Context
    const authContext = useContext(AuthContext)

    if(!authContext.user){
        return <Navigate to={"/"}/>
    }

    return <Outlet/>
}
