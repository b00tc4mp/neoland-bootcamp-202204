const { validateObjectId } = require('../validators')
const { User } = require('../models')
const { NotFoundError } = require('errors')

module.exports = async userIdd => {
    const userId = '62e5041bbd9bacd7b8921b9d'
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const followingUsers = user.following

    const songs = await Song.find({ 'interpretations.user': { $in: followingUsers } }).populate('artist').lean()

    const interpretations = []

    songs.forEach(song => {
        const userInterpretations = song.interpretations.filter(interpretation => followingUsers.includes(interpretation.user))

        userInterpretations.forEach(interpretation => {
            interpretation.id = interpretation._id.toString()
            interpretation.user = interpretation.user.toString()
            interpretation.songName = song.name
            interpretation.songId = song._id.toString()
            interpretation.artistName = song.artist.name
            interpretation.artistId = song.artist._id.toString()

            delete interpretation._id

            interpretations.push(interpretation)
        })
    })                                                           
}