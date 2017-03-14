'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  /* La propiedad select: false quiere decir que cada vez que se haga un get
    a esta entidad, no va a devolver la contraseña.
  */
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

/*
  Función que se ejecutará antes de que el evento save ocurra en mongoose:
*/
userSchema.pre('save', (next) => {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    // Callback hell. Buen momento para usar promesas :D
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

/*
  Método que hashea un email y retorna el url ficticio del avatar
  correspondiente al usuario
*/
userSchema.methods.gavatar = function () {
  if (!this.email) return `https://gavatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')

  return `https://gavatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', userSchema)
