import Apium from "../vendor/Apium"

function saveNote(token, noteId, text, callback) {
    const api = new Apium('http://localhost:8080/api')

    if(!noteId)
        api.post('notes', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        }, (error, response) => {
            if (error) return callback(error)

            const { status, payload } = response

            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)
                callback(new Error(data.error))

            } else if (status >= 500)
                callback(new Error('server error'))
            else if (status === 201) {
                callback(null)
            }
        })
    else
        api.patch(`notes/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        },(error, response) => {
            if (error) return callback(error)

            const { status, payload } = response

            if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)

                callback(new Error(data.error))
            } else if (status >= 500)
                callback(new Error('server error'))
            else if (status === 204) {
                callback(null)
            }
        })
}

export default saveNote;