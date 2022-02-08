import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthConsumer } from '../helper/AuthContext'

function DefineRoute({ children, isRouteAuthenticated = true }) {
    return (
        <AuthConsumer>
            {({ isAuth }) => {
                if (isAuth && isRouteAuthenticated) {
                    return children
                } else if (isAuth && !isRouteAuthenticated) {
                    return <Navigate to="/home" />
                } else if (!isAuth && isRouteAuthenticated) {
                    return <Navigate to="/signin" />
                } else if (!isAuth && !isRouteAuthenticated) {
                    return children
                }
            }}
        </AuthConsumer>
    )
}

export default DefineRoute
