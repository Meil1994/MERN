import React from 'react';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='bg-slate-400 h-screen overflow-auto'>
      <Nav/>
      <ToastContainer/>
      <Outlet/>
      
    </div>
  )
}

export default App