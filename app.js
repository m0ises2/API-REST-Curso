/* Aqui va la funcionalidad/configuración de express: */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// Módulo api
const api = require('./routes')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Todas las URL que tengan el prefijo api, pasan por el módulo api
app.use('/api', api)

module.exports = app
