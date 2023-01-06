import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import Home from './components/Home'

export default function Router() {
  return (
    <BrowserRouter>
        <Menu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}
