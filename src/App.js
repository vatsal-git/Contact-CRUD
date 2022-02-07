import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MyRoutes from './components/MyRoutes'
import { AuthProvider } from './helper/AuthContext'

function App() {
    return (
        <Router>
            <AuthProvider>
                <MyRoutes />
            </AuthProvider>
        </Router>
    )
}

export default App
