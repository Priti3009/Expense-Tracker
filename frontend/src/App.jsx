import { Provider } from 'react-redux';
import store from './store/store';
import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signup';

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
  ])

  return (
    <>
    <Provider store={store}>
      <RouterProvider router={approuter}/>

    </Provider>
      
    </>
  )
}

export default App
