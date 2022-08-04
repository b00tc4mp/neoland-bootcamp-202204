const { ConflictError, NotFoundError } = require("../errors");
const { Note } = require("../models");
const { validateObjectId, validateString } = require("../validators");

function updateNote(userId, noteId, text, audience) {
    validateObjectId(noteId)
    validateObjectId(userId)
    if (text) validateString(text)
    if (audience != null && audience !== Note.PUBLIC && audience !== Note.PRIVATE) throw new FormatError(`audience is different to 'private' and 'public`)
    
    return Note.findById(noteId)
        .then(note => {
            if(!note) throw new NotFoundError(`note with id ${noteId} does not exist`)

            if((note.text === text && note.audience === audience) || (note.text == null && note.audience == null)) return

            if(note.user.toString() !== userId) throw new ConflictError(`note with id ${noteId} does not belong to user with id ${userId}`)

            if (text) note.text = text
            if (audience) note.audience = audience
            
            return note.save()
        })
        .then(() => {})
}

module.exports = updateNote