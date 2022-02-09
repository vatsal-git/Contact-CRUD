import React, { useState } from 'react'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const activeUserId = localStorage.getItem('activeUserId')

    const [isAuth, setIsAuth] = useState(
        activeUserId === '' || activeUserId === null ? false : true
    )

    const login = (loggedInUserId) => {
        setIsAuth(true)
        localStorage.setItem('activeUserId', loggedInUserId)
    }

    const logout = () => {
        setIsAuth(false)
        localStorage.setItem('activeUserId', '')
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth: isAuth,
                activeUserId: activeUserId,
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
