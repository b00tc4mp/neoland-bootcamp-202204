import { validateString, validateJWT, validateNoteId } from '../validators'
import { noteIsSaved } from './noteIsSaved'
import Apium from '../vendor/Apium'

export function saveNote(token, noteId, text, callback) {
    validateJWT(token)
    validateString(text, 'text')

    const api = new Apium('http://localhost:8080/api')

    noteIsSaved(token, noteId, (error, isSaved) => {
        if (isSaved)
            api.patch(
                `notes/${noteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ noteId, text })
                },
                (error, { status, payload }) => {
                    if (error) return callback(error)

                    if (status >= 400 && status < 500) {

                        const data = JSON.parse(payload)

                        callback(new Error(data.error))

                    } else if (status >= 500)
                        callback(new Error('server error'))

                    else if (status >= 200 && status < 300)
                        callback(null)
                }
            )
        else
            api.post(
                'notes',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text })
                },
                (error, { status, payload }) => {
                    if (error) return callback(error)

                    if (status >= 400 && status < 500) {

                        const data = JSON.parse(payload)

                        callback(new Error(data.error))

                    } else if (status >= 500)
                        callback(new Error('server error'))

                    else if (status >= 200 && status < 300)
                        callback(null)
                }
            )
    })
}
