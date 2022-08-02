const { NotFoundError } = require('errors')
const { User, Interpretation } = require('../models')
const { validateObjectId } = require('../validators')

module.exports = async (userId) => {
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)
    debugger

    const interpretations = await Interpretation.find({ user: userId }).populate({ path: 'song', populate: { path: 'artist' } }).lean()

    interpretations.forEach(interpretation => {
        interpretation.id = interpretation._id.toString()
        interpretation.user = interpretation.user.toString()
        interpretation.songName = interpretation.song.name
        interpretation.songId = interpretation.song._id.toString()
        interpretation.artistName = interpretation.song.artist.name
        interpretation.artistId = interpretation.song.artist._id.toString()

        delete interpretation._id
    })

    // // interpretations.forEach(interpretation => {
    // //     delete interpretation.song._id
    // //     delete interpretation.artist._id
    // //     delete interpretation.user._id

    // })

    return interpretations
}