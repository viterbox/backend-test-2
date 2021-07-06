const express = require('express')
const router = express.Router()

const Review = require('../models/reviews')

router.get("/", async (req, res) => {
    let art = [];
    if(req.id) {
        art = await Review.find({ usuario_id: req.id })
    } else {
        art = await Review.find();
    }
   
    res.json(art)
})

router.get("/:idReview", async(req, res) => {
    console.log("req params ",req.id);
    console.info(req.params)
    const rev = await Review.findById(req.params.idReview)
    res.json(rev)
})

router.post("/", async (req, res) => {
    const {texto, calificacion, usuario_id } = req.body
    const art = new Review({
        texto, calificacion, usuario_id
    })
    await art.save()

    res.json({
        status: 'reseña guardada',
        data: art
    })
})

router.put("/:idReview", async (req, res) => {
    const { texto, calificacion, usuario } = req.body
    const art = {texto, calificacion, usuario}
    await Review.findByIdAndUpdate(req.params.idReview, art)
    res.json({
        status: "Reseña actualizada"
    })
})

router.delete("/:idReview", async (req, res) => {
    await Review.findByIdAndRemove(req.params.idReview)
    res.json({
        status: "Reseña borrada"
    })
})

// router.get("/users/:id/reviews/:id", async(req, res) => {
//     const rev = await Review.find({usuario_id: req.params.id})
//     res.json(rev)
// })

module.exports = router