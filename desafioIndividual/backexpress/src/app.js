const express = require('express')
const morgan = require('morgan')
const routeUser = require('./routes/user')
const routePokemon = require('./routes/pokemon')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
//app.use(morgan('combined'))

routePokemon(app)
routeUser(app)


module.exports = app