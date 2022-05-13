const { createPokemon, getPokemons, put, removePokemon, getPokemonByName, getPokemonById } = require('../controller/pokemon')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
const { authMiddleware } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/pokemon',authMiddleware, getPokemons) //validateGetAll, 
    app.post('/pokemon', authMiddleware, createPokemon) // validateCreate, validateErrorUser, validateDuplicatedUserEmail, 
    app.get('/pokemon/:id',authMiddleware, getPokemonById)
    app.get('/pokemonByName',authMiddleware, getPokemonByName) //paramsId, validateErrorUser, 
    app.put('/pokemon/:id', authMiddleware, put) //paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail,
    app.delete('/pokemon/:id', authMiddleware, removePokemon)// paramsId, validateFoundById, validateErrorUser, 
}