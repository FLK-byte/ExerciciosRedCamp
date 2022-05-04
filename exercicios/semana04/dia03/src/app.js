const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/user')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
//app.use(morgan('combined'))


routes(app)

module.exports = app