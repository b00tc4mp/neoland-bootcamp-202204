const { Song, Artist, Interpretation } = require("../models")
const { NotFoundError } = require('errors')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = async (songName, artistName) => {
    validateStringNotEmptyOrBlank(songName)
    validateStringNotEmptyOrBlank(artistName)
    
    const reArtist = new RegExp(artistName)

    const artist = await Artist.findOne({ name: { $regex: reArtist, $options: 'i' } })

    if (!artist) throw new NotFoundError(`artist ${artistName} not found`)

    const reSong = new RegExp(songName)

    const song = await Song.findOne({ name: { $regex: reSong, $options: 'i' }, artist: artist._id }).lean()

    if (!song) throw new NotFoundError(`song ${songName} not found`)

    const interpretations = await Interpretation.find({ song: song._id })

    interpretations.forEach(interpretation => {
        interpretation.id = interpretation._id.toString()

        delete interpretation._id
        delete interpretation.__v

        return interpretation
    })

    return interpretations
}