import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import Income from './components/Income'
import Expenses from './components/expenses'
import Body from './components/Body'
import Savings from './components/Savings'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  const approuter=createBrowserRouter([
    {
      path:"/",
      element:(
        <>
      <Header/>,
      <Body/>,
      <Footer/>,
        </>
      
      ),
      children:[
        {
          path:"/",
          element:<Dashboard/>
        },
        {
          path:"/income",
          element:<Income/>
        },
        {
          path:"/expenses",
          element:<Expenses/>
        },
        {
          path:"/savings",
          element:<Savings/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    }
  ])

  return (
    <>
    <RouterProvider router={approuter}/>
      
    </>
  )
}

export default App
