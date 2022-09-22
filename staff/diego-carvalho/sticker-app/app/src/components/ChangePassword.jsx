import { useContext } from 'react'
import Logger from '../vendor/Loggy'
import Context from './Context'
import updateUserPassword from '../logic/updateUserPassword'

function ChangePassword() {
    const logger = new Logger('ChangePassword')

    logger.info('call')

    const { handleFeedback } = useContext(Context)

    const handleSubmit = event => {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordRepeat = event.target.newPasswordRepeat.value

        try {
            updateUserPassword(sessionStorage.token, password, newPassword, newPasswordRepeat, error => {
                if (error) {
                    handleFeedback({ level: 'error', message: error.message })
    
                    return
                }
    
                handleFeedback({ level: 'success', message: 'Password saved' })
            })
        } catch(error) {
            handleFeedback({ level: 'error', message: error.message })
        }
    }

    logger.info('render')

    return <div className="ChangePassword">
        <form className="Container" onSubmit={handleSubmit}>
            <input className="Input Input--light" type="password" name="password" placeholder="current password" />

            <input className="Input Input--light" type="password" name="newPassword" placeholder="new password" />
            <input className="Input Input--light" type="password" name="newPasswordRepeat" placeholder="repeat new password" />

            <button className="Button Button--light">Save</button>
        </form>
    </div>
}

export default ChangePassword





