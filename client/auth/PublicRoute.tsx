import React from 'react'
import {useStore} from '../store/store'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {


    const {isAuthenticated} = useStore()

    if(isAuthenticated){
        return <Navigate to="/dashboard" replace/>
    }
  
    return children
}

export default PublicRoute
