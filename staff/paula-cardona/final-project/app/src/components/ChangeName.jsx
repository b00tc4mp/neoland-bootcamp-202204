import { useContext } from 'react'
import Context from './Context'
import updateUserName from '../logic/updateUserName'

function ChangeName(props) {

    const { handleFeedback } = useContext(Context)

    const handleSaveNameClick = event => {
        event.preventDefault()

        const newName = event.target.name.value
        const newSurname = event.target.surname.value

        try {
            updateUserName(sessionStorage.token, newName, newSurname, (error) => {
                if (error) {
                    handleFeedback({ type: 'error', message: error.message})
                    return
                }

                handleFeedback({ type: 'success', message: 'Name changed'})
                props.onProfileChanged()
            })
        } catch(error) {
            handleFeedback({ type: 'error', message: error.message})
        }
    }
    const handleClickBackToProfile = event => {
        event.preventDefault()
        props.onClickedBackToProfile()
    }



    return <div className="changeName Container">
        <form className="Container mw" onSubmit={handleSaveNameClick}>
            <button className="Button Button__Day__Flecha" onClick={handleClickBackToProfile}>atrás</button>
            <input className="form" type="text" name="name" placeholder=" Nuevo nombre"/>
            <input className="form" type="text" name="surname" placeholder=" Nuevo apellido"/>
            <button className="Button__Save">Save</button>
        </form>
    </div>
}

export default ChangeName