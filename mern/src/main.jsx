import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import Home from './home/Home.jsx';
import Login from './home/Login.jsx';
import Register from './home/Register.jsx';
import Profile from './home/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='' element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
