const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const createNote = require('./createNote')
const deleteUser = require('./deleteUser')
const listNotes = require('./listNotes')
const updateNote = require('./updateNote')
const deleteNote = require('./deleteNote')
const retrievePublicNotes = require('./retrievePublicNotes')
const deleteCommentFromNote = require('./deleteCommentFromNote')
const addCommentToNote = require('./addCommentToNote')
const toggleReactionToNote = require('./toggleReactionToNote')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createNote,
    deleteUser,
    listNotes,
    updateNote,
    deleteNote,
    retrievePublicNotes,
    deleteCommentFromNote,
    addCommentToNote,
    toggleReactionToNote
}