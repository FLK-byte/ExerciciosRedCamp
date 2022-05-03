const { getWriteNews, createPost, getPostById, getPosts, put, removePostagem, getDataPlaceHolderAndWrite } = require('../controller/user')
const { validateGetAll, validateFoundById, validateErrorUser, paramsId, validateCreate } = require('../middleware/user')
module.exports = (app) => {
    app.get('/postagensPlace', getDataPlaceHolderAndWrite)
    app.get('/news', getWriteNews)
    app.get('/post', validateGetAll, getPosts) 
    app.post('/post', validateCreate, validateErrorUser, createPost) 
    app.get('/post/:id', paramsId, validateErrorUser, validateFoundById, getPostById) 
    app.put('/post/:id', paramsId, validateCreate, validateFoundById, validateErrorUser, put) 
    app.delete('/post/:id', paramsId, validateFoundById, validateErrorUser, removePostagem)
}
