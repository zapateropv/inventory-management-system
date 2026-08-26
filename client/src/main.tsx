import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './reusable/Register.tsx'
import LogIn from './reusable/LogIn.tsx'
import Dashboard from './reusable/Dashboard.tsx'
import { TooltipProvider } from "@/components/ui/tooltip";
import App from './App.tsx'
import PublicRoute from '../auth/PublicRoute.tsx'
import PrivateRoute from '../auth/PrivateRoutes.tsx'
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
      path: "/dashboard",
      element: (
      <PrivateRoute>
          <Dashboard />
      </PrivateRoute>
    )
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
