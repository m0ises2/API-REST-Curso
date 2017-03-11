'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// Database:
mongoose.connect(config.db, (error, res) => {
  if (error) {
    return console.log(`Error al conectar a la base de datos ${error}`)
  }

  console.log('Conexión a la base de datos establecida.')
  // Ecmascript 6 incorpora la funcionalidad de las arrow functions:
  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
