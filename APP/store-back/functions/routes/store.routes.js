const express = require('express')
const router = express.Router()

const Review = require('../models/reviews')

router.get("/all", async (req, res) => {
    const art = await Review.find()
    res.json(art)
})

router.get("/get/:id", async(req, res) => {
    const rev = await Review.findById(req.params.id)
    res.json(rev)
})

router.post("/save", async (req, res) => {
    const {texto, calificacion, usuario } = req.body
    const art = new Review({
        texto, calificacion, usuario
    })
    console.log("usuario ",usuario)
    await art.save()

    res.json({
        status: 'reseña guardada',
        data: art
    })
})

router.put("/update/:id", async (req, res) => {
    const { texto, calificacion, usuario } = req.body
    const art = {texto, calificacion, usuario}
    await Review.findByIdAndUpdate(req.params.id, art)
    res.json({
        status: "Reseña actualizada"
    })
})

router.delete("/delete/:id", async (req, res) => {
    await Review.findByIdAndRemove(req.params.id)
    res.json({
        status: "Reseña borrada"
    })
})

router.post("/get/myreviews", async(req, res) => {
    const rev = await Review.find({usuario: req.body.usuario})
    res.json(rev)
})

module.exports = router