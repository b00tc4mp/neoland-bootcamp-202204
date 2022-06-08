import Logger from '../vendor/Loggy'
import { validateJwt } from '../validators'
import Apium from '../vendor/Apium'


function retrieveUser(token, callback) {

    validateJwt(token)

    const logger = new Logger('retrieveUser')

    logger.info('call')

    const api = new Apium(process.env.REACT_APP_API_URL)

    logger.info('request')

    api.get('users', {
        headers: {
            Authorization: `Bearer ${token}`
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
        else if (status === 200) {
            const data = JSON.parse(payload)

            callback(null, data)
        }
    })
}

export default retrieveUser