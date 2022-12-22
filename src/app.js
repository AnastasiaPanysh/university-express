const express = require('express')
const user = require('./controller/controller.user')
const bodyParser = require('body-parser')


const app = express()


app.use(bodyParser.json())

app.use('/user', user)

app.use(function (error, req, res, next) {
    res.status(500).send(error.message)
})

module.exports = app