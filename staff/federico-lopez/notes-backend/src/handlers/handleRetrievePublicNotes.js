const { handleErrorsAndRespond } = require("./helpers")
const { verifyToken } = require('./helpers')
const { retrievePublicNotes } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)

        return retrievePublicNotes(userId)
            .then(notes => {
                res.status(200).json(notes)
            })
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}