const { createNote } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { text, audience } } = req

        createNote(userId, text, audience)
            .then(noteId => res.status(201).json({ noteId }))
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}