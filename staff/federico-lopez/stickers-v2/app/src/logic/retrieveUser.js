import { validateJWT } from '../validators'
import Apium from '../vendor/Apium'
import User from '../data/User'

export function retrieveUser(token, callback) {
    validateJWT(token)

    const api = new Apium('http://localhost:8080/api')

    api.get(
        'users',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        (error, { status, payload }) => {
            const data = JSON.parse(payload)
            
            if (status >= 400 && status < 500) 
                callback(new Error(data.error))
            else if (status >= 500)
                callback(new Error('server error'))
            else if (status === 200)
                callback(null, new User(data.name, data.username))
        }
    )
}