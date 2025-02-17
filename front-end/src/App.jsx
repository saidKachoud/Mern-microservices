import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './pages/main/Products';
import { MyProducts } from './pages/main/MyProducts';
const serverExpress = import.meta.env.VITE_USER_SERVER;

export const App = () => {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/my_products' element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
  )
}
