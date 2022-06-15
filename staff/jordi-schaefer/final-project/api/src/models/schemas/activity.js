const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema
const comment = require('./comment')
const point = require('./point')


const activity = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        default: 'Mountain Activity'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    sport: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    private: {
        type: Boolean,
        default: false
    },
    
    points: [point],
    
    comments: [comment],
    
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],


})

module.exports = activity