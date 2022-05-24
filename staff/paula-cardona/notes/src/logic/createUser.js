const { User } = require('../models')
const { ConflictError } = require('../errors')

function createUser(name, username, password) { //creamos la función createUser y le pasamos por parametros name, username y password
    

    return User.create({ name, username, password }) // funcion para crear el uuario con los parametros que nos llegan arriba
        .then((/*resultDeCreate*/) => {/* hago algo y devuelvo algo, si me interesa */}) // este then captura la respuesta del user create
        // pero esta vacio porque no nos interesa recivir ni devolver nada
        // si quitas el then o lo dejas con solo parentesis vacios .then()
        // te devuelve automaticamente la respuesta

        .catch(error => {  // si create nos devuelve un error SINCRONO 
            if (error.code = 11000) // (de duplicate o de syntax error)
                throw new ConflictError(`user with username ${username} already exists`) // lanzamos error de que ya existe
            
            throw error // sino lanzamos el error que sea
        })
}

module.exports = createUser