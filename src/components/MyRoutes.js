import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import ProtectedRoute from './ProtectedRoute'

function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <ProtectedRoute path="home" element={<Home />} />
        </Routes>
    )
}

export default MyRoutes
