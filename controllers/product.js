'use strict'
const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (error, product) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ product: product })
  })
}

function getProducts (req, res) {
  Product.find({}, (error, products) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})
    if (!products) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({ products: products })
  })
}

function saveProduct (req, res) {
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
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let bodyUpdate = req.body

  Product.findByIdAndUpdate(productId, bodyUpdate, (error, productUpdated) => {
    if (error) return res.status(500).send({message: `Error al realizar la actualización del producto. Error: ${error}`})

    res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (error, product) => {
    if (error) return res.status(500).send({message: `Error al realizar la petición: ${error}`})

    product.remove(error => {
      if (error) return res.status(500).send({message: `Error al realizar el borrado del producto. Error: ${error}`})

      res.status(200).send({ message: `El producto ha sido eliminado` })
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  saveProduct,
  deleteProduct
}
