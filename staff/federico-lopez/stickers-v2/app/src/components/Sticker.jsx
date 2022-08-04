import { useState, useContext } from 'react'
import { deleteNote } from '../logic/'
import { saveNote } from '../logic/'
import { noteIsSaved } from '../logic/'
import Context from './Context'
import './Sticker.sass'

function Sticker(props) {
    const { handleFeedback } = useContext(Context)
    const [view, setView] = useState(props.view)
    const [text, setText] = useState(props.text)
    const [viewButtons, setViewButtons] = useState(true)

    const handleEditButton = event => {
        event.preventDefault()

        setView('edit')
    }

    const handleRemoveButton = event => {
        event.preventDefault()

        try {
            deleteNote(sessionStorage.token, props.id, error => {
                if (error) {
                    handleFeedback(error.message)
                }
            })
            handleFeedback('the note was deleted', 'info')

            props.onRemovedSticker(props.id)

        } catch (error) {
            handleFeedback(error.message)
        }
    }

    const handleOnSubmitForm = event => {
        event.preventDefault()

        try {
            saveNote(sessionStorage.token, props.id, event.target.text.value, error => {
                if (error)
                    handleFeedback(error.message)
            })

            handleFeedback('the note was saved', 'succeed')

            setText(event.target.text.value)

            setView('view')

            props.onSavedNote(props.id, event.target.text.value)

        } catch (error) {
            handleFeedback(error.message)
        }
    }

    const handleCloseClick = event => {
        event.preventDefault()

        try {
            noteIsSaved(sessionStorage.token, props.id, (error, isSaved) => {
                if (error)
                    handleFeedback(error.message)
                else
                    if (isSaved)
                        setView('view')
                    else
                        props.onClosedSticker(props.id)
            })
        } catch (error) {
            handleFeedback(error.message)
        }
    }

    const handleOnMouseOver = () => setViewButtons(true)

    const handleOnMouseLeave = () => setViewButtons(null)

    return <div className="Sticker" key={props.id} >

        {
            view === 'view' &&
            <div className="Sticker__View" onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave} >
                <div className="noteButtons">
                    {viewButtons && <a className="editButton" onClick={handleEditButton}>Edit</a>}
                    {viewButtons && <a className="removeButton" onClick={handleRemoveButton}>Remove</a>}
                </div>
                <p className="noteText">{text}</p>
            </div>
        }

        {
            view === 'edit' &&
            <div className="Sticker__Edit">
                <a className="xButton" onClick={handleCloseClick}>x</a>
                <form className="Sticker__form" onSubmit={handleOnSubmitForm} >
                    <textarea className="textarea" name="text" defaultValue={text} ></textarea>
                    <button className="saveButton">Save</button>
                </form>
            </div>
        }
    </div>
}

export default Sticker