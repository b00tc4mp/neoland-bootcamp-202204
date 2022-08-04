import { validateJWT, validatePassword } from '../validators'
import Apium from '../vendor/Apium'

export function deleteUserFun(token, password, passwordRepeat, callback) {
    validateJWT(token)
    validatePassword(password)
    validatePassword(passwordRepeat, 'password repeat')

    if(password !== passwordRepeat) throw new Error('password and password repeat do not match')

    const api = new Apium('http://b00tc4mp.herokuapp.com/api/v2')
    api.delete(
        'users',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        },
        (error, { status, payload }) => {
            if (error) return callback(error)
                
            if (status >= 400 && status < 500){
                const data = JSON.parse(payload)

                callback(new Error(data.error))          
                 
            } else if (status >= 500) 
                callback(new Error('server error'))

            if (status === 204)
                callback(null)
        }
    )
}