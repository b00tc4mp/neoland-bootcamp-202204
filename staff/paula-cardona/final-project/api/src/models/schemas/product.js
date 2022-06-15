const { Schema } = require('mongoose')

const product = new Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    

})

module.exports = product

