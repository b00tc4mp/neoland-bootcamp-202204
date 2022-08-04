import { validateJWT, validatePassword } from '../validators'
import Apium from '../vendor/Apium'

export function updatePassword(token, oldPassword, password, repeatPassword, callback) {
    validateJWT(token)
    validatePassword(oldPassword, 'previous password')
    validatePassword(password, 'new password')
    validatePassword(repeatPassword, 'new password repeat')

    if (password !== repeatPassword) throw new Error('new password and new password repeat do not match')
    if (oldPassword === password) throw new Error('previous and new password are the same')

    const api = new Apium('http://b00tc4mp.herokuapp.com/api/v2')

    api.patch(
        'users',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, password })
        },
        (error, { status, payload }) => {
            if (error) return callback(error)
            
            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))
                
            } else if (status > 500) 
                callback(new Error('server error'))
            
            if (status >= 200 && status < 300)
                callback(null)
        }
    )
}