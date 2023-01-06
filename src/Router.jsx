import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes';
import Menu from './components/Menu/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Salas from './components/admin/Salas';
import Empresas from './components/admin/Empresas';
import Categorias from './components/admin/Categorias';
import Temporizadores from './components/admin/Temporizadores';
import Evento from './components/admin/Evento';


export default function Router() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/salas' element={<Salas />} />
          <Route path='/empresas' element={<Empresas />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/temporizadores' element={<Temporizadores />} />
          <Route path='/evento/:id' element={<Evento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
