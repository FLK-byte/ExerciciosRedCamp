const { createUser, getUser, getUsers, put, removeUser } = require('../controller/user')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
module.exports = (app) => {
    app.get('/user', getUsers)
    app.post('/user', createUser) // validateCreate, validateErrorUser, validateDuplicatedUserEmail,
    app.get('/user/:id', paramsId, validateErrorUser, getUser)
    app.put('/user/:id', paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail, put)
    app.delete('/user/:id', paramsId, validateFoundById, validateErrorUser, removeUser)
}
