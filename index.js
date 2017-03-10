'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
  Endpoints:
*/
// GET:
app.get('/api/products', (req, res) => {
  Product.find({}, (error, products) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    if (!products) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({ products: products })
  })
})

// GET un solo producto según su ID:
app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (error, product) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ product: product })
  })
})

// POST:
app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  // Guardamos en la BD:
  let product = new Product()

  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((error, productStored) => {
    if (error) res.status(500).send(`Error al guardar el producto en la base de datos ${error}`)

    res.status(200).send({ product: productStored })
  })
})

// PUT:
app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let bodyUpdate = req.body

  Product.findByIdAndUpdate(productId, bodyUpdate, (error, productUpdated) => {
    if (error) return res.status(500).send({message: `Error al realizar la actualización del producto. Error: ${error}`})

    res.status(200).send({ product: productUpdated })
  })
})

// DELETE:
app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (error, product) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})

    product.remove(error => {
      if (error) return res.status(500).send({message: `Error al realizar el borrado del producto. Error: ${error}`})

      res.status(200).send({ message: `El producto ha sido eliminado` })
    })
  })
})

// Database:
mongoose.connect('mongodb://localhost:27017/shop', (error, res) => {
  if (error) {
    return console.log(`Error al conectar a la base de datos ${error}`)
  }

  console.log('Conexión a la base de datos establecida.')
  // Ecmascript 6 incorpora la funcionalidad de las arrow functions:
  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
