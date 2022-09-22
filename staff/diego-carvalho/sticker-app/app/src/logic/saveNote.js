import Logger from '../vendor/Loggy'
import Apium from '../vendor/Apium'
import Note from '../models/Note'

function saveNote(token, noteId, text, callback) {
    const logger = new Logger('saveNote')

    logger.info('call')

    // TODO validate input args

    logger.info('request')

    const api = new Apium('http://localhost:8080/api')

    if (!noteId)
        api.post('notes', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        }, (error, response) => {
            if (error) return callback(error)

            logger.info('response')

            const { status, payload } = response

            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))
            } else if (status >= 500)
                callback(new Error('server error'))
            else if (status === 201) {
                callback(null)
            }
        })
    else
        api.patch(`notes/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        }, (error, response) => {
            if (error) return callback(error)

            logger.info('response')

            const { status, payload } = response

            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))
            } else if (status >= 500)
                callback(new Error('server error'))
            else if (status === 204) {
                callback(null)
            }
        })
}

export default saveNote