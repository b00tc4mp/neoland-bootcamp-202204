import { useContext } from 'react'
import Context from '../Context'
import updateUserName from '../../logic/updateUserName'

function ChangeName(props) {

    const { handleFeedback } = useContext(Context)

    const handleSaveClick = event => {
        event.preventDefault()

        const newName = event.target.name.value

        try {
            updateUserName(sessionStorage.token, newName, (error) => {
                if (error) {
                    handleFeedback({ type: 'error', message: error.message})
                    return
                }

                handleFeedback({ type: 'success', message: 'Name changed'})
                props.onDataChanged()
            })
        } catch(error) {
            handleFeedback({ type: 'error', message: error.message})
        }
    }


    return <div className="Container m__form mw">
        <form className="Container mw" onSubmit={handleSaveClick}>
            <input className="form" type="text" name="name" placeholder=" New name"/>
            <button className="Button__color mt_button">Save</button>
        </form>
    </div>
}

export default ChangeName