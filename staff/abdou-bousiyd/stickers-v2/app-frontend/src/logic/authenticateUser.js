import Apium from '../vendor/Apium'
import { validateUsername, validatePassword } from '../validators'

function authenticateUser(username, password) {

    validateUsername(username)
    validatePassword(password)

    const api = new Apium('http://localhost:8080/api')

    return api.post('users/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    
        .then(({ status, payload }) => {

            if (status === 200) {
                
                const data = JSON.parse(payload)
                return data.token

            } else if (status >= 400 && status < 500) {

                const data = JSON.parse(payload)
                throw new Error(data.error)

            } else {
                throw new Error('server error')
            }
        })
}

export default authenticateUser