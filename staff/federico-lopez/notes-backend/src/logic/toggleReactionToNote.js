const { NotFoundError, AuthError } = require("../errors")
const { User, Note, Reaction } = require("../models")
const { validateReactionType, validateObjectId } = require("../validators")

function toggleReactionToNote(userId, noteId, type) {
    validateObjectId(userId)
    validateObjectId(noteId)
    validateReactionType(type)

    let reaction

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.findById(noteId)
        })
        .then(note => {
            debugger
            if (!note) throw new NotFoundError(`note with id ${noteId} not found`)
            if (note.audience === Note.PRIVATE) throw new AuthError(`note with id ${noteId} is private`)

            const previousReactionIndex = note.reactions.findIndex(react => react.user.toString() === userId)

            if (previousReactionIndex === -1) {
                reaction = new Reaction({ user: userId, type })

                note.reactions.push(reaction)

            } else {
                const hasDifferentType = note.reactions[previousReactionIndex].type !== type

                note.reactions.splice(previousReactionIndex, 1)

                if (hasDifferentType) {
                    reaction = new Reaction({ user: userId, type })

                    note.reactions.push(reaction)
                }
            }


            return note.save()
                .then(() => reaction ? reaction.id : undefined)
        })
}

module.exports = toggleReactionToNote