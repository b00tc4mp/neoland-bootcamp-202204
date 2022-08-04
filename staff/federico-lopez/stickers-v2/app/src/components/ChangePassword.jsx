import { useContext } from 'react'
import { updatePassword } from '../logic/'
import Context from './Context'
import './ChangePassword.sass'


function ChangePassword(props) {
    const { handleFeedback } = useContext(Context)

    const handleOnFormSubmit = event => {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordRepeat = event.target.newPasswordRepeat.value

        try {
            updatePassword(sessionStorage.token, password, newPassword, newPasswordRepeat, (error) => {
                if (error) {
                    handleFeedback(error.message)
                    return
                }
                
                handleFeedback('your password was successfully changed', 'succeed')
                 
                props.onChangedPassword()
            })
        } catch (error) {
            handleFeedback(error.message)
        }   
    }

    return <div className="ChangePassword">
        <form className="Profile__form" onSubmit={handleOnFormSubmit}>
            <h2>Change Password</h2>
            <input type="password" name="password" id="password" placeholder="password" />
            <input type="password" name="newPassword" id="newPassword" placeholder="new password" />
            <input type="password" name="newPasswordRepeat" id="newPasswordRepeat" placeholder="new password repeat" />
            <button type="submit" className="SubmitButton button button__light">Save</button>
        </form>
    </div>
}

export default ChangePassword