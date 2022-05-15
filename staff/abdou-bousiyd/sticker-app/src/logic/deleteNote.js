function deleteNote(token, noteId, callback) {

    const url = 'https://b00tc4mp.herokuapp.com/api/v2/users'

    const api = new Apium

    api.call('GET', url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token, noteId })
    }, (error, {status, payload}) => {
        if(error) {
            callback(error)
            return
        }
        if(status === 200) {
            const data = JSON.parse(payload) 
            const { notes = [] } = data

            if (noteId) {
                
                const index = notes.findIndex(note => note.id === noteId)
                notes.splice(index, 1)
            }
            api.call('PATCH', url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ token, notes })
            }, (error, {status, payload}) => {
                if (error) {
                    callback(error)
                    return
                }
                if(status === 204) {
                    callback(null)
                }else if (status >= 400 && status < 500) {
        
                    const data = JSON.parse(payload)
        
                    callback(new Error(data.error))
                } else {
        
                    callback(new Error('server error'))
                }
            })
            callback(null, data.token)

        }else if (status >= 400 && status < 500) {
            const data = JSON.parse(payload)
            callback(new Error(data.error))
        } else {
            callback(new Error('server error'))
        }
    })

    // const xhr = new XMLHttpRequest

    // xhr.addEventListener('load', event => {

    //     const status = event.target.status

        
    //     if (status === 200) {
            
    //         const json = event.target.responseText
    //         const data = JSON.parse(json)

    //         const { notes = [] } = data
            
    //         if (noteId) {
                
    //             const index = notes.findIndex(note => note.id === noteId)
    //             notes.splice(index, 1)

    //             {
    //                 const xhr = new XMLHttpRequest
    
    //                 xhr.addEventListener('load', event => {
    
    //                     const status = event.target.status
    
    //                     if (status === 204) {
    //                         callback(null)
    //                     } else if (status >= 400 && status < 500) {
    //                         const json = event.target.responseText
    
    //                         const data = JSON.parse(json)
    
    //                         callback(new Error(data.error))
    //                     } else callback(new Error('server error'))
    //                 })
    
    //                 xhr.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    
    //                 xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    //                 xhr.setRequestHeader('Content-Type', 'application/json')
    
    //                 const data = { notes }
    
    //                 const json = JSON.stringify(data)
    
    //                 xhr.send(json)
    
    //             }
    //         }
    //     } else if (status >= 400 && status < 500) {
    //         const json = event.target.responseText

    //         const data = JSON.parse(json)

    //         callback(new Error(data.error))
    //     } else callback(new Error('server error'))
    // })

    // xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    // xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    // xhr.send() 
}


// 