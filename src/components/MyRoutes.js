import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import SignIn from './../pages/SignIn'
import Home from './../pages/Home'
import DefineRoute from './DefineRoute'

function MyRoutes() {
    return (
        <Routes>
            <Route
                exact
                path="/signin"
                element={
                    <DefineRoute isRouteAuthenticated={false}>
                        <SignIn />
                    </DefineRoute>
                }
            />
            <Route
                exact
                path="/signup"
                element={
                    <DefineRoute isRouteAuthenticated={false}>
                        <SignUp />
                    </DefineRoute>
                }
            />
            <Route
                exact
                path="/home"
                element={
                    <DefineRoute>
                        <Home />
                    </DefineRoute>
                }
            />
            <Route
                path="*"
                element={
                    <DefineRoute isRouteAuthenticated={false}>
                        <SignIn />
                    </DefineRoute>
                }
            />
        </Routes>
    )
}

export default MyRoutes
