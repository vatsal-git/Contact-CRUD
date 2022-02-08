import React, { useState } from 'react'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
    let auth = JSON.parse(localStorage.getItem('auth'))
    let loggedInUser = localStorage.getItem('loggedInUser')

    const [isAuth, setIsAuth] = useState(!auth ? false : auth)
    const [user, setUser] = useState(!loggedInUser ? undefined : loggedInUser)

    const login = (loggedInUser) => {
        localStorage.setItem('auth', true)
        setIsAuth(true)
        localStorage.setItem('loggedInUser', loggedInUser.uuid)
        setUser(loggedInUser.uuid)
    }

    const logout = () => {
        localStorage.setItem('auth', false)
        setIsAuth(false)
        localStorage.setItem('loggedInUser', undefined)
        setUser(undefined)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth: isAuth,
                user: user,
                login: login,
                logout: logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
