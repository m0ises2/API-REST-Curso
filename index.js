'use strict'
const express = require('express');

const app = express();

//Ecmascript 6 incorpora la funcionalidad de las arrow functions:
app.listen(3000, () => {
  console.log("API REST corriendo en http://localhost:3000");
})
