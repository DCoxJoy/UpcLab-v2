import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import ProductState from './context/product/ProductState';
//  import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthState>
      <ProductState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route path='/' element={<PrivateRoute component={Home} />} />
                  <Route path='about' element={<About />} />
                  <Route path='register' element={<Register />} />
                  <Route path='login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ProductState>
    </AuthState>
  );
};

export default App;
