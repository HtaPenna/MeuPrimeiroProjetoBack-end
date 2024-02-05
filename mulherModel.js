const mongoose = require('mongoose')

const MulhereSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    minibio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('diva', MulhereSchema)