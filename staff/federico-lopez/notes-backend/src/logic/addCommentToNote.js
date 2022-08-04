const { User, Note } = require('../models')
const { NotFoundError, AuthError } = require('../errors')
const { validateObjectId, validateStringNotEmptyOrBlank } = require('../validators')
const { Comment } = require('../models')

function addCommentToNote(userId, noteId, text) {
    validateObjectId(noteId)
    validateObjectId(userId)
    validateStringNotEmptyOrBlank(text, 'text')

    return User.findById(userId)
        .then(note => {
            if (!note) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.findById(noteId)
        })
        .then(note => {
            if(note.audience === Note.PRIVATE) throw new AuthError(`note with id ${noteId} is private`)

            const comment = new Comment({ user: userId, text })

            note.comments.push(comment)

            return note.save()
                .then(() => comment.id)
        })
}

module.exports = addCommentToNote