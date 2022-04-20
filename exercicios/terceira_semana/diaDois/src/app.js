const express = require('express')

const app = express()

app.use(express.json())

const routes = require('./routes/user')

routes(app)

module.exports = app