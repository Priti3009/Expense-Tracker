import { Provider } from 'react-redux';
import store from './store/store';
import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/Login.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const approuter=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    { 
      path: "/signup", 
      element: <Signup />
     },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    }
  ])

  return (
    <>
    
      <AuthProvider>
      <RouterProvider router={approuter}/>
      </AuthProvider>
    
      
    </>
  )
}

export default App
