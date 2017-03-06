'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
  Endpoints:
*/
//GET:
app.get('/api/product', (req, res) => {
  res.status(200).send( { message: 'Todo O.K' } );
});

app.get('/api/product/:productId', (req, res) => {

});

//POST:
app.post('/api/product', (req, res) => {
    console.log(req.body);
    res.status(200).send( {message: "Producto recibido"} );
});

//PUT:
app.put('/api/product/:productId', (req, res) => {

});
//DELETE:
app.delete('/api/product/:productId', (req, res) => {

});

//Ecmascript 6 incorpora la funcionalidad de las arrow functions:
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
})
