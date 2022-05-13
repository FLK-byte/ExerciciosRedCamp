const { createUser, getUser, getUsers, put, removeUser, auth, isTokenValid } = require('../controller/user')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
const { authMiddleware } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/user', getUsers) //validateGetAll, 
    app.post('/user', createUser) // validateCreate, validateErrorUser, validateDuplicatedUserEmail, 
    app.get('/user/:id', getUser) //paramsId, validateErrorUser, 
    app.put('/user/:id', put) //paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail,
    app.delete('/user/:id', removeUser)// paramsId, validateFoundById, validateErrorUser, 
    app.post('/user/authenticate', auth)
    app.get('/isAuthenticated', authMiddleware, isTokenValid)
}
