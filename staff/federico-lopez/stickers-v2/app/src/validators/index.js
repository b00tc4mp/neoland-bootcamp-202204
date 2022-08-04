import { AuthError } from "../errors"
import { FormatError } from "../errors"

function validateJWT(token) {
    const hasPartsFull = token.split('.').every(part => part.length > 0)

    if (token.split('.').length !== 3 || !hasPartsFull) throw new AuthError('invalid token')

    const otherFormatPart2 = token.split('.')[1]
    
    const jsonPart2 = atob(otherFormatPart2)

    const part2 = JSON.parse(jsonPart2)

    const { exp } = part2

    if(exp < Math.round(Date.now()/1000)) throw new AuthError('token expired')
}

function isValidJWT(token) {
    try {
        validateJWT(token)

        return true
    } catch(error) {
        return false
    }
}

function validateString(string, explain) {
    if(typeof string !== 'string') throw new TypeError(`${explain} is not a string`)
}

function validatePassword(password, explain) {
    validateString(password, explain || 'password')
    
    if(password.length < 8) throw new FormatError(`${explain} has less than 8 characters`)
}

function validateNoteId(noteId) {
    validateString(noteId, 'note Id')
    const parts = noteId.split(".")
    if(!parts instanceof Array || parts.length !==2 || parts[0].length !== 13 || parts[1].length !== 10) throw new FormatError('invalid note Id')
}

export { validateJWT, validateNoteId, validatePassword, validateString, isValidJWT }
