const { handleErrorsAndRespond } = require("./helpers")
const { verifyToken } = require('./helpers')
const { addCommentToNote } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)
        const { body: { text }, params: { noteId } } = req

        return addCommentToNote(userId, noteId, text)
            .then(commentId => res.status(200).json({ commentId }))
            .catch(error => handleErrorsAndRespond(error, res))

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}
