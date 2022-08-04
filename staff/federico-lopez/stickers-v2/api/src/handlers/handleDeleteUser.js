const { handleErrorsAndRespond, verifyToken } = require("./helpers")
const { deleteUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)
        const { body: { password } } = req

        deleteUser(userId, password)
            .then(() => res.status(204).send())
            .catch(error => handleErrorsAndRespond(error, res))

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}