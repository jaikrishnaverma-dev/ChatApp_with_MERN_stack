import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Secure from '../HOC/Secure'
import HeadBar from './header/HeadBar'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Routers = () => {
    const router=createBrowserRouter([
        {
            path:'/',
            element:<Secure Component={HeadBar}/>,
            children:[
                   {
                    path:'/',
                    element:<Chat/>
                   },
                   {
                    path:'/*',
                    element:<Chat/>
                   },
            ]
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<Signup/>
        },
        
    ])
  return (
    <RouterProvider router={router} />
  )
}

export default Routers