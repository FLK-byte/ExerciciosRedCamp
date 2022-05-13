const { createOneUser, getAllUsers, putUser, getOneUserById, removeUser, authentication, validToken } = require('../models/userModel')

exports.getUsers = async (req, res) => {
    try {
        const { page = 0, limit = 10 } = req.query
        const { data, status } = await getAllUsers(Number(page), Number(limit))
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { data, status } = await createOneUser(req.body)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { data, status } = await getOneUserById(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.put = async (req, res) => {
    try {
        const { data, status } = await putUser(req.params.id, req.body)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.removeUser = async (req, res) => {
    try {
        const { data, status } = await removeUser(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ message: "Erro não esperado" })
    }
}

exports.auth = async (req, res) => {
    try {
        const { data, status } = await authentication(req.body)
        res.status(status).json(data)
    } catch (err) {
        res.status(500).json({ messageError: "Erro não esperado Auth" })
    }
}

exports.isTokenValid = async (req, res) => {
    try {
        const { data } = await validToken(req.userId)
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json({ message: "O token não é utilizável" })
    }

}