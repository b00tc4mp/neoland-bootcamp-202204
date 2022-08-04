const { User, Note } = require('../models')
const { NotFoundError, FormatError } = require('../errors')
const { validateStringNotEmptyNoSpaces, validateString } = require('../validators')

function createNote(userId, text, audience) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    if (text != null) validateString(text, 'text')
    if (audience != null && audience !== Note.PUBLIC && audience !== Note.PRIVATE) throw new FormatError(`audience is different to 'private' and 'public`)
    debugger

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Note.create({ user: userId, text, audience })
        })
        .then(note => note.id)
}

module.exports = createNote