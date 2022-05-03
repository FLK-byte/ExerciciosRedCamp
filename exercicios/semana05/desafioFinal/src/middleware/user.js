const { body, param, validationResult } = require('express-validator')
const { getOnePostById, getAllPosts } = require('../models/index')

const { ObjectId } = require('mongodb')

exports.paramsId = [
    param('id').notEmpty().custom((value) => ObjectId.isValid(value))
]

exports.validateCreate = [
    body('title').trim().notEmpty().isString().escape(),
    body('body').trim().notEmpty()
]
exports.validateGetAll = async (req, res, next) => {
    try {
        const { data } = await getAllPosts()
        if (data.length == 0) return res.status(404).json([{ messageError: "Não há postagens" }])
        return next()
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado -> middleware" })
    }
}
exports.validateErrorUser = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ messageError: errors.array() })
    }
    return next()
}

exports.validateFoundById = async (req, res, next) => {
    try {
        const { id } = req.params
        const { data } = await getOnePostById(id)
        if (!data) return res.status(404).json({ messageError: 'Notícia não encontrada' })
        return next()
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado -> middleware" })
    }
}



