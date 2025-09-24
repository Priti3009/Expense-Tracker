import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Body from './pages/Body.jsx';
import Income from './pages/Income.jsx';
import Expense from './pages/Expense.jsx';

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
      element:<Body/>,
      children:[
        {
          index:true,    //makes dashboard as default
          element:<Dashboard/>
        },
        {
          path:"income",
          element:<Income/>
        },
        {
          path:"expense",
          element:<Expense/>
        }
        
      ]
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
