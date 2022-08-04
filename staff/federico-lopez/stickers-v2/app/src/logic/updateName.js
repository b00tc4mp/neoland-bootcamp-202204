import { validateJWT, validateString } from '../validators'
import Apium from '../vendor/Apium'

export function updateName(token, oldName, newName, callback) {
    validateJWT(token)
    validateString(oldName, 'old name')
    validateString(newName, 'new name')

    if(oldName === newName) throw new Error('old name and new name are the same')
    
    const api = new Apium('http://b00tc4mp.herokuapp.com/api/v2')
   
    api.patch(
        'users',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        },
        (error, { status, payload }) => {
            if (error) return callback(error)

            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))
                
            } else if (status >= 500) {
                callback(new Error('server error'))

            } else if (status >= 200 && status < 300)
                callback(null)
        }
    )
}