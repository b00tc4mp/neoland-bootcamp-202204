const { FormatError } = require('../errors')
const { isValidObjectId } = require('mongoose')

function validateString(string, explain = 'string') {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not a string`)
}

function validateStringNotEmptyOrBlank(string, explain = 'string') {
    validateString(string, explain)

    if (!string.length) throw new FormatError(`${explain} is empty`)

    if (!string.trim().length) throw new FormatError(`${explain} is blank`)
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

    if (password.length < 8)
        throw new FormatError(`${explain} length is lower than 8`)
}

function validateUsername(username) {
    validateStringNotEmptyNoSpaces(username, 'username')

    if (username.length < 4)
        throw new FormatError('username length is lower than 4')
}

function validateFunction(func, explain = 'function') {
    if (typeof func !== 'function')
        throw new TypeError(`${explain} is not a function`)
}

function validateDate(date, explain = 'date') {
    if (!(date instanceof Date)) throw new TypeError(`${explain} is not Date`)
}

function validateObjectId(id, explain = 'id') {
    if(!isValidObjectId(id)) throw new TypeError(`${explain} wrong`)
}

function validateObject(object, explain = 'object') {
    if(!object instanceof Object) throw new TypeError(`${explain} is not an Object`)
}

function validateNumber(number, explain = 'number') {
    if(typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}

function validateReactionType(reaction, explain = 'reaction type') {
    validateNumber(reaction, explain)
    if (reaction < 0 || reaction > 5) throw new RangeError(`${explain} is less than 0 or more than 5`)
}

module.exports = {
    validateString,
    validateStringNotEmptyOrBlank,
    validateStringNotEmptyNoSpaces,
    validateJwt,
    validatePassword,
    validateUsername,
    validateFunction,
    validateDate,
    validateObjectId,
    validateObject,
    validateNumber,
    validateReactionType
}