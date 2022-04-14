const express = require('express')
const routes = require('./routes/query')

const app = express()
app.use(express.json())

routes(app)

app.listen(3000, () => { console.log("Servidor rodando na porta http://localhost:3000") })