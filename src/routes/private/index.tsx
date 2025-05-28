import { memo } from 'react'
import { validateToken } from '../../helpers'
import Home from '../../pages/home'
import { Navigate } from 'react-router-dom'

const Private = () => {
    const token = localStorage.getItem("token") || ""
    return validateToken(token) ? <Home/> : <Navigate to={"/signIn"}/>
}

export default memo(Private)
