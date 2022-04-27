const { createOneUser, getAllUsers, putUser, getOneUserById, removeUser } = require('../models/index')

exports.getUsers = async (req, res) => {
    try {
        const {page = 0, limit = 10} = req.query
        const { data, status } = await getAllUsers(Number(page), Number(limit))
        res.status(status).json(data)
    }catch (err) {
        res.status(500).json({message : "Erro não esperado"})
    }
}

exports.createUser = async (req, res) => {
    const { data, status } = await createOneUser(req.body)
    res.status(status).json(data)
}

exports.getUser = async (req, res) => {
    const { data, status } = await getOneUserById(req.params.id)
    res.status(status).json(data)
}

exports.put = async (req, res) => {
    const { data, status } = await putUser(req.params.id, req.body)
    res.status(status).json(data)
}

exports.removeUser = async (req, res) => {
    const { data, status } = await removeUser(req.params.id)
    res.status(status).json(data)
}