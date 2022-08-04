import { useContext } from 'react'
import { deleteUserFun } from '../logic/'
import Context from './Context'
import './DeleteUser.sass'

function DeleteUser(props) {
    const { handleFeedback } = useContext(Context)

    const handleFormSubmit = event => {
      

        event.preventDefault()

        const password = event.target.password.value
        const passwordRepeat = event.target.passwordRepeat.value

        try {
            deleteUserFun(sessionStorage.token, password, passwordRepeat, (error) => {
                if (error)
                    handleFeedback(error.message)
            })

            handleFeedback('successfully unregistered', 'info')

            delete sessionStorage.token

            props.onDeletedUser()

        } catch(error) {
            handleFeedback(error.message)
        }
    }

    return <div className="DeleteUser">
        <form className="Profile__form" onSubmit={handleFormSubmit}>
            <h2>Delete User</h2>
            <input type="password" name="password" id="password" placeholder="password" />
            <input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="password repeat" />
            <button type="submit" className="SubmitButton button button__light">Save</button>
        </form>
    </div>
}

export default DeleteUser