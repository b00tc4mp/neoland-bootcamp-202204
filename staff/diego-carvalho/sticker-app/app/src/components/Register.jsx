import { useContext } from 'react'
import Logger from '../vendor/Loggy'
import Context from './Context'
import registerUser from '../logic/registerUser'

function Register(props) {
    const logger = new Logger('Register')

    logger.info('call')

    const { handleFeedback } = useContext(Context)

    const handleFormSubmit = event => {
        event.preventDefault()

        const name = event.target.name.value
        const username = event.target.username.value
        const password = event.target.password.value

        registerUser(name, username, password, error => {
            if (error) {
                handleFeedback({ level: 'error', message: error.message })

                return
            }

            props.onUserRegistered()
        })
    }

    const handleLoginLinkClick = event => {
        event.preventDefault()

        props.onLoginLinkClicked()
    }

    logger.info('render')

    return <div>
        <form className="Container" onSubmit={handleFormSubmit}>
            <input className="Input Input--light" type="text" name="name" placeholder="name" />
            <input className="Input Input--light" type="text" name="username" placeholder="username" />
            <input className="Input Input--light" type="password" name="password" placeholder="password" />
            <button className="Button Button--light">Register</button>
            <a href="#" onClick={handleLoginLinkClick}>Login</a>
        </form>
    </div>
}

export default Register