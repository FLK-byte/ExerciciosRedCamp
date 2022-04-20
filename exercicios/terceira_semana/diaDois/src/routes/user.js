const { createUser, getUser, getUsers, put, removeUser } = require('../controller/user')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
module.exports = (app) => {
    app.get('/user', validateGetAll, getUsers)
    app.post('/user', validateCreate, validateErrorUser, validateDuplicatedUserEmail, createUser)
    app.get('/user/:id', paramsId, validateErrorUser, getUser)
    app.put('/user/:id', paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateFoundById, put)
    app.delete('/user/:id', paramsId, validateFoundById, validateErrorUser, removeUser)
}
