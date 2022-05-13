const { createOnePokemon, getAllPokemons, putPokemon, getOnePokemonById, removePokemon, getOnePokemonByName, getNames } = require('../models/pokemonModel')

exports.getPokemons = async (req, res) => {
    try {
        const { page = 0, limit = 10 } = req.query
        const { data, status } = await getAllPokemons(Number(page), Number(limit))
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.createPokemon = async (req, res) => {
    try {
        const { data, status } = await createOnePokemon(req.body)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        const { data, status } = await getOnePokemonById(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}
exports.getPokemonByName = async (req, res) => {
    try {
        const { data, status } = await getOnePokemonByName(req.query.name)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.put = async (req, res) => {
    try {
        const { data, status } = await putPokemon(req.params.id, req.body)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.removePokemon = async (req, res) => {
    try {
        const { data, status } = await removePokemon(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.getPokemonNames = async (req, res) => {
    try {
        const { data, status } = await getNames()
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}