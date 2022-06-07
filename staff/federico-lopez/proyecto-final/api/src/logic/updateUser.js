const { User } = require('../models')
const { NotFoundError } = require('../errors')
const { validateObjectId, validateStringNotEmptyOrBlank, validateDate} = require('../validators')

async function updateUser({ userId, firstName, lastName, dateOfBirth }) {
    validateObjectId(userId)
    if (firstName) validateStringNotEmptyOrBlank(firstName, 'first name')
    if (lastName) validateStringNotEmptyOrBlank(lastName, 'last name')
    if (dateOfBirth) dateOfBirth = new Date(dateOfBirth)

    const result = await User.updateOne({ _id: userId }, { $set: { firstName, lastName, dateOfBirth } })

    if (result.matchedCount === 0) throw new NotFoundError(`user with id ${userId} not found`)
}

module.exports = updateUser