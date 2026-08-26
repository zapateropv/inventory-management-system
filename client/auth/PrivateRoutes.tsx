import React from 'react'
import {useStore} from '../store/store'
import { Navigate } from 'react-router-dom'


const PrivateRoutes = ({ children }) => {
  
     const {isAuthenticated} = useStore()
    
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
      
    return children
}

export default PrivateRoutes
