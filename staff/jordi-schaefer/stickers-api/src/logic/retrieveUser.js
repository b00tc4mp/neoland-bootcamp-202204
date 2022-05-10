function retrieveUser(token, callback) {
    
    const xhr = new XMLHttpRequest

    xhr.addEventListener('load', event => {
        const status = event.target.status

        if (status === 200) {
            const json = event.target.responseText
            const data = JSON.parse(json)
            const user = { name: data.name, username: data.username }

            callback(null, user)
        }
        else if (status >= 400 && status < 500) {
            const json = event.target.responseText
            const data = JSON.parse(json)
            callback(new Error(data.error))
        } else
            callback(new Error('server error'))
    })


    // abro la api en modo get
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    // creo una peticion de autorizacion con el token que me llega
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    // la envio
    xhr.send()
}