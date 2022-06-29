import Apium from 'apium'
import Logger from '../vendor/Loggy'

function registerUser (name, username, password, callback){   

    const logger = new Logger('register user')
    logger.info('call')

    const api = new Apium ('http://localhost:8080/api')
    
    logger.info('request')
    api.post('users', {
        headers : {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ name, username, password })
    }, (error, { status, payload}) => {


        if (error) {
            callback(error)

            return
        }

        logger.info('response')

        if (status ===201) //si el status es 201 no habrá error, esta bien porque habrá creado el registerUser
            callback(null)
        else if (status >=400 && status < 500) { 

            const data = JSON.parse(payload) //la respuesta de data de json lo convierto en objeto

            callback(new Error(data.error)) //la propiedad de error de ese data
        
        }else callback(new Error('server error'))

        
    })
}

export default registerUser