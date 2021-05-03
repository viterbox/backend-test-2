const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
    nombre: {type: String},
    correo: {type: String},
    password: {type: String}
})

userSchema.statics.encryptPassword = async (password) => {
    try{
        const salt = bcrypt.genSalt(10)
        const res = await bcrypt.hash(password, salt)
        return res
    }catch(err){
        console.log(err)
    }
}

userSchema.statics.comparePassword = async (password, passwordCompare) => {
    try{
        return await bcrypt.compare(password, passwordCompare)
    }catch(err){
        console.log(err)
    }
}

module.exports = mongoose.model('Users', userSchema)