import { validateString, validatePassword } from '../validators'
import Apium from '../vendor/Apium'

export function registerUser(name, username, password, callback) {
    validateString(name, 'name')
    validateString(username, 'username')
    validatePassword(password)

    const api = new Apium('http://localhost:8080/api')
    api.post(
        'users',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, password })
        },
        (error, { status, payload }) => {
            if (error) return callback(error)

            if (status === 201) {
                callback(null)
            } else if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                const error = new Error(data.error)

                callback(error)
            } else {
                callback(new Error('server error'))
            }
        }
    )
}