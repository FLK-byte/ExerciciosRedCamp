const { createPokemon, getPokemons, put, removePokemon, getPokemonByName, getPokemonById } = require('../controller/pokemon')
const { validateFoundById, paramsId, validateCreate, validateErrorUser, validateDuplicatedUserEmail, validateGetAll } = require('../middleware/user')
module.exports = (app) => {
    app.get('/pokemon', getPokemons) //validateGetAll, 
    app.post('/pokemon', createPokemon) // validateCreate, validateErrorUser, validateDuplicatedUserEmail, 
    app.get('/pokemon/:id', getPokemonById)
    app.get('/pokemonByName', getPokemonByName) //paramsId, validateErrorUser, 
    app.put('/pokemon/:id', put) //paramsId, validateFoundById, validateCreate, validateErrorUser, validateDuplicatedUserEmail,
    app.delete('/pokemon/:id', removePokemon)// paramsId, validateFoundById, validateErrorUser, 
}