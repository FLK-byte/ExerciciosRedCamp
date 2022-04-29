const { createUser, getUser, getUsers, put, removeUser } = require('../controller/user')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
module.exports = (app) => {
    app.get('/user',getUsers) //validateGetAll, 
    app.post('/user', createUser) // validateCreate, validateErrorUser, validateDuplicatedUserEmail,
    app.get('/user/:id', paramsId, validateErrorUser, getUser)
    app.put('/user/:id', put) //paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail, 
    app.delete('/user/:id', removeUser)//paramsId, validateFoundById, validateErrorUser, 
}
