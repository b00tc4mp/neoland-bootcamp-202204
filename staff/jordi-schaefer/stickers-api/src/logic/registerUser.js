function registerUser(name, username, password, callback) {

    // declaro un constructor de una peticion a servidor
    const xhr = new XMLHttpRequest

    // eventlistener en caso de carga 'load'
    xhr.addEventListener('load', event => {
        // me guardo es satatus del svent target
        const status = event.target.status

        if (status === 201) // si es 201 es correcto
            callback(null)
        else if (status >= 400 && status < 500) { // 400-500 errores de cliente
            const json = event.target.responseText // me guardo el texto de error
            const data = JSON.parse(json) // lo convierto de jason a string

            callback(new Error(data.error)) // lo envio como mensaje de error
        } else
        callback(new Error('server error')) // sino sera un error de servidor
    })

    // abro la api en modpo POST
    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    // le indico que le envio un jason
    xhr.setRequestHeader('Content-Type', 'application/json')

    const data = { name, username, password } // cojo los datos que me llegan para el registro
    const json = JSON.stringify(data)   // lo convierto a jason

    xhr.send(json) // se los envio al xhr (el constructor que abro al principio)

}