const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/users')

router.get("/", async (req, res) => {
    const response = await User.find()
    res.json(response)
})

router.get("/:id", async(req, res) => {
    const response = await User.findById(req.params.id)
    res.json(response)
})

router.put("/:id", async(req, res) => {
    const {nombre, correo, password} = req.body
    const new_data = {nombre, correo, password}
    await User.findOneAndUpdate(req.params.id, new_data)
    res.json({
        status: "Usuario actualizado"
    })
})

router.use("/:id/reviews", async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(user){
        req.id = req.params.id
        next();
    } else {
        res.json({
            message: 'Usuario no encontrado'
        });
    }
} ,require('./store.routes'))

router.post("/signUp", async (req, res) => {
    const {nombre, correo, password} = req.body

    //Validar Si ya existe
    const userFound = await User.findOne({correo: req.body.correo})
    if(userFound !== null){
        return res.json({mensaje: "Ya existe un Usuario con ese correo"})
    }

    //Agrega Usuario
    const nuevoUsuario = new User({
        nombre: nombre,
        correo: correo,
        password: password
    })

    const usuarioGuardado = await nuevoUsuario.save()

    res.json(
        {auth: usuarioGuardado}
    )
})

router.post("/signIn", async(req, res) => {
    const userFound = await User.findOne({correo: req.body.correo})

    if(!userFound){
        return res.json({mensaje: "Usuario no encontrado"})
    }

    const matchPassword = req.body.password === userFound.password ? true : false

    if(!matchPassword){
        return res.json({token: '', mensaje: "Contraseña invalida"})
    }

    const token = jwt.sign({userFound}, "usuarios_api_secret", {expiresIn: '1d'})

    res.json({auth: userFound})
})


module.exports = router