/* Conexión a mongoDB y puesta en marcha de la aplicación nodeJS */
'use strict'
const mongoose = require('mongoose')
// Módulo principal de la aplicación:
const app = require('./app')
// Variables de configuración:
const config = require('./config')

// conexión a la base de datos:
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
