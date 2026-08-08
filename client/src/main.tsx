import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './reusable/Register.tsx'
import LogIn from './reusable/LogIn.tsx'
document.documentElement.classList.add("dark");

const router = createBrowserRouter([{
  path: "/",
  element: <Register />
},
{
  path: "/login",
  element: <LogIn/>
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
