import Logger from '../vendor/Loggy'
import { validateUsername, validatePassword } from '../validators'
import Apium from '../vendor/Apium'

function authenticateUser(username, password, callback) {
    const logger = new Logger('authenticateUser')

    logger.info('call')

    validateUsername(username)
    validatePassword(password)

    const api = new Apium('http://localhost:8080/api')

    logger.info('request')

    api.post('users/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }, (error, { status, payload }) => {
        logger.info('response')

        if (error) {
            callback(error)

            return
        }

        if (status === 200) {
            const data = JSON.parse(payload)

            callback(null, data.token)
        } else if (status >= 400 && status < 500) {
            logger.warn('response - client error status ' + status)

            const data = JSON.parse(payload)

            callback(new Error(data.error))
        } else {
            logger.error('response - server error status ' + status)

            callback(new Error('server error'))
        }
    })
}

export default authenticateUser

