const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewsSchema = new Schema({
    id: {type: String, required: false},
    texto: { type: String, required: false },
    calificacion: { type: String, required: false},
    usuario: { type: String, required: false}
})

module.exports = mongoose.model('Reviews', reviewsSchema)