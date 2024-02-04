import React from 'react'
import Header from '../header/Header'
import { Outlet } from "react-router-dom";
import Footer from '../footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer />
    </div>

  )
}

export default Layout