const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewsSchema = new Schema({
    id: {type: String, required: false},
    texto: { type: String, required: false },
    calificacion: { type: String, required: false},
    usuario_id: {type: String}
})

module.exports = mongoose.model('Reviews', reviewsSchema)