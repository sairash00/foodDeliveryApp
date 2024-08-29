import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routing from './Routing';
import Login from './components/LoginSignup/Login';
import Connected from './components/Products/Connected';
import Products from './components/Products/Products';
import Landing from './components/Landing/Landing';
import Foods from './components/Products/Foods';
import Drinks from './components/Products/Drinks';
import Desserts from './components/Products/Desserts';
import Register from './components/LoginSignup/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Order from './components/Dashboard/Order';
import Cart from './components/Dashboard/Cart';
import Main from './components/Admin/Main';
import Orders from './components/Admin/Orders';
import Add from './components/Admin/Add';
import Product from './components/Admin/Products';

import Authenticate from './utils/Authenticate';
import LoggedIn from './utils/LoggedIn';

import axios from 'axios';

axios.defaults.withCredentials = true;

// const ProductsProtected = Authenticate({ component: Connected });
const ProtectedDashboard = Authenticate({ component: Dashboard });
const AdminMain = Authenticate({ component: Main, admin: true });
const IsLogin = LoggedIn({ component: Login });
const IsRegister = LoggedIn({ component: Register });
const LandingPage = LoggedIn({ component: Landing });

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<IsLogin />} />
        <Route path='/register' element={<IsRegister />} />

        <Route path='/' element={<Routing />}>
          <Route path='/' element={<LandingPage />} />

          <Route path='/products' element={<Connected/>}>
            <Route path='/products' element={<Products />} />
            <Route path='/products/foods' element={<Foods />} />
            <Route path='/products/drinks' element={<Drinks />} />
            <Route path='/products/desserts' element={<Desserts />} />
          </Route>

          <Route path='/dashboard' element={<ProtectedDashboard />}>
            <Route path='/dashboard/orders' element={<Order />} />
            <Route path='/dashboard/cart' element={<Cart />} />
          </Route>

          <Route path='/admin' element={<AdminMain />}>
            <Route path='/admin' element={<Product />} />
            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/add' element={<Add />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
