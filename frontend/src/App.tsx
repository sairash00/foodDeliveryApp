import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Routing from './Routing'
import Login from './components/LoginSignup/Login'
import Connected from './components/Products/Connected.tsx'
import Products from './components/Products/Products.tsx'
import Landing from './components/Landing/Landing.tsx'
import Foods from './components/Products/Foods.tsx'
import Drinks from './components/Products/Drinks.tsx'
import Desserts from './components/Products/Desserts.tsx'
import Register from './components/LoginSignup/Register.tsx'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import Order from './components/Dashboard/Order.tsx'
import Cart from './components/Dashboard/Cart.tsx'
import Main from './components/Admin/Main.tsx'
import Orders from './components/Admin/Orders.tsx'
import Add from './components/Admin/Add.tsx'
import Product from './components/Admin/Products.tsx'

import axios from 'axios'

axios.defaults.withCredentials = true


const App:React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Routing />}>
          <Route path='/' element = {<Landing/>}/>
          <Route path='/products' element = {<Connected />} >
              <Route path='/products' element = {<Products/>} /> 
              <Route path='/products/foods' element = {<Foods/>} /> 
              <Route path='/products/drinks' element = {<Drinks/>} /> 
             <Route path='/products/desserts' element = {<Desserts/>} /> 
          </Route>
          <Route path='/dashboard' element={<Dashboard/>} >
            <Route path='/dashboard/orders' element={<Order/>} />
            <Route path='/dashboard/cart' element={<Cart/>} />
          </Route>
          <Route path='/admin' element={<Main />} >
            <Route path='/admin' element = {<Product/>} />
            <Route path='/admin/orders' element = {<Orders/>} />
            <Route path='/admin/add' element = {<Add/>} />
            {/* <Route path='/admin/orders' element = {<Orders/>} /> */}
    
          </Route>

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App