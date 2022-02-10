import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './helper/AuthContext'
import DefineRoute from './components/DefineRoute'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
    return (
        <Router>
            <AuthProvider>
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
            </AuthProvider>
        </Router>
    )
}

export default App
