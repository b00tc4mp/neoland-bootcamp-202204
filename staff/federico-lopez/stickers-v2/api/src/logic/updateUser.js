const { User } = require('../models')
const { NotFoundError } = require('../errors')
const { validateObjectId, validateStringNotEmptyOrBlank, validateStringNotEmptyNoSpaces, validateString, validateNumber } = require('../validators')

function updateUser(userId, name, age, email, phone) {
    validateObjectId(userId)
    if (name) validateStringNotEmptyOrBlank(name, 'name')
    if (age) validateNumber(age, 'age')
    if (email) validateStringNotEmptyNoSpaces(email, 'email')
    if (phone) validateString(phone, 'phone')

    return User.updateOne({ _id: userId }, { $set: { name, age, email, phone } })
        .then(result => {
            if (result.matchedCount === 0)
                throw new NotFoundError(`user with id ${userId} does not exist`)
        })
}

module.exports = updateUser