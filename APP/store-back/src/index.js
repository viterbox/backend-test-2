const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const server = express()

const { mongoose } = require('./database')

//configuraciones
server.set('port', process.env.PORT || 3200)

//middleware
server.use(morgan('dev'))
server.use(express.json())

// cors
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//rutas
server.use('/review/store', require('./routes/store.routes'))
server.use('/review/user', require('./routes/users.routes'))

//servidor
server.listen(server.get('port'), () => {
    console.log("Servidor en puerto ", server.get('port'))
})