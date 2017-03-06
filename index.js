'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hola/:name/:lastname', (req, res) => {
  res.send({message: `Hola. Tu nombre es ${req.params.name} y tu apellido ${req.params.lastname}`
  });
});

//Ecmascript 6 incorpora la funcionalidad de las arrow functions:
app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
})
