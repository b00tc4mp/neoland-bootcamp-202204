const { sign } = require('jsonwebtoken')

function generateToken(userId) {
    const token = sign({ sub: userId }, process.env.JWT_SECRET)

    return token
}

module.exports = generateToken