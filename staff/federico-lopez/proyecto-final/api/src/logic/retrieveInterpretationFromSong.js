const { Interpretation } = require("../models")
const { validateObjectId } = require('../validators')
const { NotFoundError } = require('errors')

module.exports = async interpretationId => {
    validateObjectId(interpretationId)

    const interpretationFound = await Interpretation.findById(interpretationId)

    if (!interpretationFound) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    interpretationFound.id = interpretationFound._id.toString()

    delete interpretationFound._id
    delete interpretationFound.__v

    return interpretationFound
}