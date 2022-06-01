import Apium from "../vendor/Appium"

import Logger from "../vendor/Loggy"
import User from "../data/models/User"


function retrieveUser(token, callback) {

   /*  validateJwt(token) */  // TODO por que falla 
    
    const logger = new Logger('retrieveUser')

    logger.info('call')

    const api = new Apium('https://b00tc4mp.herokuapp.com/api')

    logger.info('request')

    api.get('v2/users', {
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

            const user = new User(data.name, data.username)

            callback(null, user)
        }
    })
}

export default retrieveUser