import { FormatError } from '../errors'
// CREATING COSTUM ERROR FUNCTIONS
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


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

function validateJwt(token) {
    validateString(token, 'token')

    const parts = token.split('.')

    if (parts.length !== 3 || !parts.every(part => part.length > 0)) throw new FormatError('invalid token format')
}


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

function validateEmail(email, explain = 'email') {
    if (!EMAIL_REGEX.test(email))
        throw new FormatError(`${explain} is not an email`)
}

export {
    validateString,
    validateStringNotEmptyOrBlank,
    validateStringNotEmptyNoSpaces,
    validateJwt,
    validatePassword,
    validateUsername, 
    validateEmail
}








