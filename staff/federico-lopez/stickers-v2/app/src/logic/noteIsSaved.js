import { validateJWT, validateNoteId } from '../validators'
import Apium from '../vendor/Apium'

export function noteIsSaved(token, id, callback) {
    validateJWT(token)

    const api = new Apium

    api.call(
        'GET',
        'http://localhost:8080/api/notes',
        {
            headers: { Authorization: `Bearer ${token}` }
        },
        (error, { status, payload }) => {
            const data = JSON.parse(payload)
            if (status === 200) {
                if (data.length > 0) {
                    const stickerIsSaved = data.some(note => note.id === id)

                    callback(null, stickerIsSaved)
                }
            } else if (status >= 400 && status < 500) {
                callback(new Error(data.error))
            } else callback(new Error('server error'))
        }
    )
}