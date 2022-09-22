const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const reaction = require('./reaction')
const comment = require('./comment')

const note = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
        default: null
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    audience: {
        type: String,
        require: true,
        enum: ['public', 'private', 'friends'],
        default: 'private'
    },

    reactions: [reaction],

    comments: [comment]
})

module.exports = note