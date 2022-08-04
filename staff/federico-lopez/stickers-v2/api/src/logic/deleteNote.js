const { NotFoundError, ConflictError } = require("../errors")
const { Note } = require("../models")
const { validateObjectId } = require("../validators")

function deleteNote(userId, noteId) {
    validateObjectId(noteId)
    validateObjectId(userId)
    debugger
    return Note.findById(noteId)
        .then(note => {
            if (note === null) throw new NotFoundError(`note with id ${noteId} not found`)
            if (note.user.toString() !== userId) throw new ConflictError(`note with id ${noteId} does not belong to user with id ${userId}`)

            return Note.deleteOne({ _id: noteId})
        })
        .then(() => {})
}

module.exports = deleteNote