import Logger from '../vendor/Loggy'
import Apium from '../vendor/Apium'
import { validateJwt } from '../validators'

function deleteNote(token, noteId, callback) {
    const logger = new Logger('deleteNote')

    logger.info('call')

    validateJwt(token)

    // TODO validate input args

    const api = new Apium('http://localhost:8080/api')

    logger.info('request')

    api.delete(`notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
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

export default deleteNote