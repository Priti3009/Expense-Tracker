import { Provider } from 'react-redux';
import store from './store/store';
import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/Login.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';

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
    }
  ])

  return (
    <>
    <Provider store={store}>
      <AuthProvider>
      <RouterProvider router={approuter}/>
      </AuthProvider>
    </Provider>
      
    </>
  )
}

export default App
