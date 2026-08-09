import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './reusable/Register.tsx'
import LogIn from './reusable/LogIn.tsx'
import Dashboard from './reusable/Dashboard.tsx'
import { TooltipProvider } from "@/components/ui/tooltip";
document.documentElement.classList.add("dark");

const router = createBrowserRouter([{
  path: "/register",
  element: <Register />
},
{
  path: "/login",
  element: <LogIn/>
},
{
  path: "/dashboard",
  element: <Dashboard/>
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
)
