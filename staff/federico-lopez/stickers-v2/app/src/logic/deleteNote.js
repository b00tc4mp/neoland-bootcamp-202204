import { validateJWT, validateNoteId } from '../validators'
import Apium from '../vendor/Apium'

export function deleteNote(token, noteId, callback) {
    validateJWT(token)

    const api = new Apium

    api.call(
        'DELETE',
        `http://localhost:8080/api/notes/${noteId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        },
        (error, { status, payload }) => {

            if (status === 204) {
                callback(null)

            } else if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))

            } else callback(new Error('server error'))
        }
    )
}