const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://juanc:juan2021@cluster0.mt1p9.mongodb.net/back-review?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
  
.then(db => console.log("Conectado a la base de datos..."))
    .catch(err => console.log(err))

module.exports = mongoose