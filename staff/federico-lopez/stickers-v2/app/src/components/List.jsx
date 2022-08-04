import { useState, useEffect, useContext } from 'react'
import Sticker from './Sticker'
import { retrieveNotes } from '../logic/'
import Context from './Context'
import Note from '../data/Note'
import './List.sass'

function List({ newStickers, username }) {
    const { handleFeedback } = useContext(Context)

    const [notes, setNotes] = useState(null)
    const [newNotes, setNewNotes] = useState([])

    useEffect(() => {
        retrieveNotes(sessionStorage.token, (error, notesRetrieved) => {
            if (error) {
                handleFeedback(error.message)
                return
            }
            setNotes(notesRetrieved)
        })
    }, [])

    useEffect(() => {
        if (newStickers !== null) {
            let _newNotes = [...newNotes]
            _newNotes.push(new Note)

            setNewNotes(_newNotes)
        }
    }, [newStickers])

    const handleOnRemovedSticker = id => {
        let _notes = [...notes]

        _notes = _notes.filter(note => note.id !== id)

        setNotes(_notes)
    }

    const handleOnClosedSticker = id => {
        let _newNotes = [...newNotes]

        _newNotes = _newNotes.filter(note => note.id !== id)

        setNewNotes(_newNotes)
    }

    const handlerOnSavedNote = (id, text) => {
        if (newNotes.length > 0) {
            const isNew = newNotes.some(note => note.id === id)

            if (isNew) {
                let _newNotes = [...newNotes]

                const note = _newNotes.find(note => note.id === id)

                note.text = text

                _newNotes = _newNotes.filter(note => note.id !== id)

                setNewNotes(_newNotes)

                let _notes = []

                if (notes instanceof Array && notes.length > 0)
                    _notes = [...notes]

                _notes.push(note)

                setNotes(_notes)
            }
        }
    }

    return <ul className='List'>

        {notes !== null && notes.map(note => <li key={note.id}>
            <Sticker
                text={note.text}
                username={username}
                id={note.id}
                view="view"
                onRemovedSticker={handleOnRemovedSticker}
                onClosedSticker={handleOnClosedSticker}
                onSavedNote={handlerOnSavedNote}
            />
        </li>)}

        {newNotes.length > 0 && newNotes.map(note => <li key={note.id}> <Sticker text="" id={note.id} view="edit" onRemovedSticker={handleOnRemovedSticker} onClosedSticker={handleOnClosedSticker} onSavedNote={handlerOnSavedNote} /> </li>)}
    </ul>
}

export default List