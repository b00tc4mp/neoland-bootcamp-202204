const { NotFoundError } = require("../errors")
const { Note, User } = require("../models")
const { validateObjectId } = require("../validators")

function retrievePublicNotes(userId) {
    validateObjectId(userId)

    return User.findById({ _id: userId })
        .then(result => {
            if (result === null) throw new NotFoundError(`user with id ${userId} dos not exist`)
        })
        .then(() => {
            return Note.find({ user: userId, audience: Note.PUBLIC}).lean()
        })
        .then(notes => {
            notes.forEach(note => {
                note.id = note._id.toString()

                delete note._id
                delete note.user
                delete note.__v
                return note
            })
            return notes
        })
}

module.exports = retrievePublicNotes