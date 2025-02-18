import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './pages/main/Products';
import { MyProducts } from './pages/main/MyProducts';
import { Login } from './pages/auth/Login';
import { IsAuthenticated } from './pages/auth/IsAuhenticated';
import { NotFound } from './pages/error/NotFound';
const serverExpress = import.meta.env.VITE_USER_SERVER;

export const App = () => {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<IsAuthenticated />}>
          <Route path='/products' element={<Products />} />
          <Route path='/my_products' element={<MyProducts />} /></Route>
      </Routes>
    </BrowserRouter>
  )
}
