'use-strict'

const express = require('express')
const api = express.Router()
const Productcontroller = require('../controllers/product')
const auth = require('../middlewares/auth')

/*
  Endpoints:
*/
// GET:
api.get('/products', Productcontroller.getProducts)
// GET un solo producto según su ID:
api.get('/product/:productId', Productcontroller.getProduct)
// POST:
api.post('pi/product', Productcontroller.saveProduct)
// PUT:
api.put('/product/:productId', Productcontroller.updateProduct)
// DELETE:
api.delete('/product/:productId', Productcontroller.deleteProduct)

api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
