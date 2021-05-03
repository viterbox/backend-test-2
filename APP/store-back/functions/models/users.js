const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
    nombre: {type: String},
    correo: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('Users', userSchema)