const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://carlodinhoo:juan2021@cluster0.82g9q.mongodb.net/StoreApp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
  
.then(db => console.log("Conectado a la base de datos..."))
    .catch(err => console.log(err))

module.exports = mongoose