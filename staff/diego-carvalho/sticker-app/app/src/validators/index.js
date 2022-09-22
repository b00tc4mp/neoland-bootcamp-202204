import { FormatError } from '../errors'
// CREATING COSTUM ERROR FUNCTIONS

//this function defines as a default that the user's info(name,username,password,token) must be sent to the db as a string.
function validateString(string, explain = 'string') {
    if (typeof string !== 'string') throw new FormatError(`${explain} is not a string`)
}

function validateStringNotEmptyOrBlank(string, explain = 'string') {
    validateString(string, explain)

    if (!string.lenght) throw new FormatError(`${explain} is empty!`)

    if (!string.trim().lenght) throw new FormatError(`${explain} is blank!`)
}

function validateStringNotEmptyNoSpaces(string, explain = 'string') {
    validateString(string, explain)

    if (!string.length) throw new FormatError(`${explain} is empty`)

    if (string.includes(' ')) throw new FormatError(`${explain} has spaces`)
}

/*1º - this function defines as a default that the user's token must be sent to the db as a string.
2º - it must be divided in three partes using dot (.) and the length must be bigger than 0. If it is not like that, 
an error message will appear.
*/
function validateJwt(token) {
    validateString(token, 'token')

    const parts = token.split('.')

    if (parts.length !== 3 || !parts.every(part => part.length > 0)) throw new FormatError('invalid token format')
}

/*1º - this function defines as a default that the user's password must be sent to the db as a string.
2º - the length must be bigger than 0. If it is not like that,an error message will appear.
*/
function validatePassword(password, explain = 'password') {
    validateString(password, explain)

    if (password.length < 3)
        throw new FormatError(`${explain} length is lower than 3`)
}

function validateUsername(username) {
    validateStringNotEmptyNoSpaces(username, 'username')

    if (username.length < 4)
        throw new FormatError(`username length is lower than 4`)
}

export {
    validateString,
    validateStringNotEmptyOrBlank,
    validateStringNotEmptyNoSpaces,
    validateJwt,
    validatePassword,
    validateUsername
}








