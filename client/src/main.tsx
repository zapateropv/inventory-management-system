import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TooltipProvider } from "@/components/ui/tooltip";
import './index.css'
import Register from './reusable/Register.tsx'
import LogIn from './reusable/LogIn.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Inventory from './pages/Inventory.tsx'
import AddProduct from './pages/AddProduct.tsx'
import Settings from './pages/Settings.tsx'
import App from './App.tsx'
import PublicRoute from '../auth/PublicRoute.tsx'
import PrivateRoute from '../auth/PrivateRoutes.tsx'
import SidebarLayout from './reusable/SidebarLayout.tsx'

document.documentElement.classList.add("dark");

const router = createBrowserRouter([
  {path: "/",
   element: <App/>,
   children: [{
      path: "/register",
      element: (
      <PublicRoute>
          <Register />
      </PublicRoute>
    )
    },
    {
      path: "/login",
      element:  (
      <PublicRoute>
          <LogIn />
      </PublicRoute>
    )
    },
    {
    element:(
       <PrivateRoute>
          <SidebarLayout />
      </PrivateRoute>),
      children:[{
        path: "/dashboard",
        element: 
        <PrivateRoute>
          <Dashboard />
      </PrivateRoute>
      },
      {
        path: "/inventory",
        element: 
        <PrivateRoute>
          <Inventory/>
      </PrivateRoute>
     },
    {
      path: "/add-product",
        element: 
        <PrivateRoute>
          <AddProduct/>
      </PrivateRoute>
    },
    {
      path: "/settings",
        element: 
        <PrivateRoute>
          <Settings />
      </PrivateRoute>
    }]
    }]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
)
