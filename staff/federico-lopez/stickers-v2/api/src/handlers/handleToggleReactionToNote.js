const { handleErrorsAndRespond } = require("./helpers")
const { verifyToken } = require('./helpers')
const { toggleReactionToNote } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)
        let { params: { noteId, type } } = req

        type = Number(type)

        return toggleReactionToNote(userId, noteId, type)
            .then(reactionId => {
                if(reactionId)
                    res.status(200).json({ reactionId })
                else
                    res.status(204).send()
            })
            .catch(error => handleErrorsAndRespond(error, res))

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}