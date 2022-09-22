import { useState } from 'react'
import Logger from '../vendor/Loggy'
import Context from './Context'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Feedback from './Feedback'
import './App.sass'

function App() {
    const logger = new Logger('App')

    logger.info('call')

    const [view, setView] = useState(sessionStorage.token ? 'home' : 'login')
    const [feedback, setFeedback] = useState(null)

    const handleUserRegistered = () => handleLoginNavigation()

    const handleUserLoggedIn = () => setView('home')

    const handleRegisterNavigation = () => setView('register')

    const handleLoginNavigation = () => setView('login')

    const handleUserLoggedOut = () => handleLoginNavigation()

    //const handleFeedback = message => confirm(message)
    const handleFeedback = feedback => setFeedback(feedback)

    const handleFeedbackTimeout = () => setFeedback(null)

    logger.info('render')

    return <Context.Provider value={{ handleFeedback }}>
        <div className="App Container">
            {view === 'login' && <Login onUserLoggedIn={handleUserLoggedIn} onRegisterLinkClicked={handleRegisterNavigation} />}
            {view === 'register' && <Register onUserRegistered={handleUserRegistered} onLoginLinkClicked={handleLoginNavigation} />}
            {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} />}
            { feedback && <Feedback level={feedback.level} message={feedback.message} onTimeout={handleFeedbackTimeout} />}
        </div>
    </Context.Provider>
}

export default App