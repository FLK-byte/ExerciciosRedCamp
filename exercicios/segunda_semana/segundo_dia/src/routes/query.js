const {getSearch} = require('../controller/query')

module.exports = (app)=>{
    app.get('/search', getSearch)
}