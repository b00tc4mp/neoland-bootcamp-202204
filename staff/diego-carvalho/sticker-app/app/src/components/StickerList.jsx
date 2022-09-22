import { useState, useEffect, useContext } from 'react'
import Logger from '../vendor/Loggy'
import Context from './Context'
import retrieveNote from '../logic/retrieveNote'
import Sticker from './Sticker'
import './StickerList.sass'

function StickerList({ timestamp }) {
    const logger = new Logger('StickerList')

    logger.info('call')

    const [notes, setNotes] = useState(null)
    const { handleFeedback } = useContext(Context)

    useEffect(() => {
        logger.info('componentDidMount | componentWillReceiveProps')

        loadNotes()
    }, [timestamp])

    const loadNotes = () =>
        retrieveNote(sessionStorage.token, (error, notes) => {
            if (error) {
                handleFeedback({ level: 'error', message: error.message })

                return
            }

            setNotes(notes)
        })

    const handleRemoveSticker = stickerId => {
        const _notes = notes.filter(note => note.id !== stickerId)

        setNotes(_notes)
    }

    logger.info('render')

    return notes && notes.length ?
        <ul className="StickerList__list Container">
            {notes.map(note => <li key={note.id}>
                <Sticker stickerId={note.id} text={note.text} onRemove={handleRemoveSticker} />
            </li>)}
        </ul>
        :
        <p>no stickers yet</p>
}

export default StickerList
