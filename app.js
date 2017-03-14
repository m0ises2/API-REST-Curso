/* Aqui va la funcionalidad/configuración de express: */
const express = require('express')
// Middleware para parsear los body de las solicitudes HTTP a JSON:
const bodyParser = require('body-parser')
// Instancia del servidor express:
const app = express()
// Módulo api para ruteo con express Router:
const api = require('./routes')

// Incrusto los middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Todas las URL que tengan el prefijo api, pasan por el módulo api
app.use('/api', api)

module.exports = app
