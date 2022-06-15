import Logger from '../vendor/Loggy'
import { validateJwt, validateString} from '../validators'
import Apium from '../vendor/Apium'


function updateUserName(token, newName, newSurname) {

    validateJwt(token)
    validateString(newName, 'newName')
    validateString(newSurname, 'newSurname')

    const logger = new Logger('updateUserName')

    logger.info('call')
    const api = new Apium (process.env.REACT_APP_API_URL)

    logger.info('request')
    return api.post('users', {
        headers : { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'  }, 
        body: JSON.stringify({ name: newName, surname: newSurname })
    })
        .then (({ status, payload}) => {
            logger.info('response')

            if (status === 204) {
                return null
            
            } else if (status >=400 && status <500) {
                logger.warn ('response - client error status ' + status)

                const data = JSON.parse(payload)

                throw new Error(data.error)
            } else {
                logger.error('response - server error status ' + status)

                throw new Error('server error')
            }
        })
}

export default updateUserName
