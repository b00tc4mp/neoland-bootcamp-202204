import { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Feedback from './Feedback'
import Context from './Context'
import './App.sass'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { isValidJWT } from '../validators'

function App() {
    const [feedback, setFeedback] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(isValidJWT(sessionStorage.token))
            navigate('/')
    }, [])

    const handleLoggedIn = () => navigate('/')

    const handleNavToRegister = () => navigate('/register')

    const handleOnUserRegistered = () => navigate('/login')

    const handleNavToLogin = () => navigate('/login')

    const handleOnLoggedOut = () => navigate('/login')

    const handleOnDeletedUser = () => navigate('/login')

    const handleFeedback = (message, level) => {
        setFeedback({ level, message })
    }

    const handleFeedbackTimeOut = () => setFeedback(null)

    return <Context.Provider value={{ handleFeedback }}>
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login onLoggedIn={handleLoggedIn} onRegisterNavigation={handleNavToRegister} />} />
                <Route path="/register" element={<Register onRegistered={handleOnUserRegistered} onLoginNavigation={handleNavToLogin} />} />
                <Route path="/" element={<Home onLoggedOut={handleOnLoggedOut} onDeletedUser={handleOnDeletedUser} />} />
            </Routes>
            {feedback !== null && <Feedback level={feedback.level} message={feedback.message} onTimeout={handleFeedbackTimeOut} />}
        </div>
    </Context.Provider>
}

export default App