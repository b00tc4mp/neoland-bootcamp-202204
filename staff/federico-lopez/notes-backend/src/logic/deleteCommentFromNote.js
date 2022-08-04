const { User, Note } = require('../models')
const { NotFoundError, AuthError } = require('../errors')
const { validateObjectId, validateStringNotEmptyOrBlank } = require('../validators')

function deleteComentFromNote(userId, noteId, commentId) {
    validateObjectId(noteId)
    validateObjectId(userId)
    validateObjectId(commentId)

    return User.findById(userId)
        .then(note => {
            if (!note) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.findById(noteId)
        })
        .then(note => {
            const commentIndex = note.comments.findIndex(com => com.id === commentId)

            if (commentIndex === -1) throw new NotFoundError(`comment with id ${commentId} not found`)
            debugger
            if (note.comments[commentIndex].user.toString() !== userId)
                throw new AuthError(`user with id ${userId} can delete a comment that not belong them`)
            
            note.comments.splice(commentIndex, 1)

            return note.save()
                .then(() => {})
        })
}

module.exports = deleteComentFromNote