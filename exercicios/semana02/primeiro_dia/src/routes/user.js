const {createUser, getUser, getUsers, put, removeUser} = require('../controller/user')

module.exports = (app)=>{
    app.get('/user', getUsers)
    app.post('/user', createUser)
    app.get('/user/:id', getUser)
    app.put('/user/:id', put)
    app.delete('/user/:id', removeUser)
}
