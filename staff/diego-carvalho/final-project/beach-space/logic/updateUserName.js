import Logger from 'vendor/Loggy'
import Apium from 'vendor/Apium'
import {validateJwt, validateString} from 'validators'

function updateUserName(token, newName, callback) {
    const logger = new Logger('updateUserName')

    logger.info('call')

    validateJwt(token)
    validateString(newName, 'newName')
    
    logger.info('request')

    const api = new Apium('http://localhost:8080/api')

    api.patch('users', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    }, (error, response) => {
        if (error) return callback(error)

        logger.info('response')

        const { status, payload } = response

        if (status >= 400 && status < 500) {
            const data = JSON.parse(payload)

            callback(new Error(data.error))
        } else if (status >= 500)
            callback(new Error('server error'))
        else if (status === 204)
            callback(null)
    })
}
export default updateUserName
