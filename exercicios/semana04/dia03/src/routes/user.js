const { createUser, getUser, getUsers, put, removeUser } = require('../controller/user')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
module.exports = (app) => {
    app.get('/user', getUsers) //validateGetAll, 
    app.post('/user', validateCreate, validateErrorUser, validateDuplicatedUserEmail, createUser) // 
    app.get('/user/:id', getUser) //paramsId, validateErrorUser, 
    app.put('/user/:id', paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail, put) //
    app.delete('/user/:id', paramsId, validateFoundById, validateErrorUser, removeUser)// 
}
