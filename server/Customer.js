const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    image_path: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        index: true
    },
    username: String,
    media_count: Number
}, {versionKey: false})

const Customer = module.exports = mongoose.model('Customer', userSchema, 'customer')