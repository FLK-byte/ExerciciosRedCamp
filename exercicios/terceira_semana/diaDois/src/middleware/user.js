const {body, param, validationResult} = require('express-validator')
const {getOneUserById, getOneUserByEmail, getAllUsers} = require('../models/index') 

const {ObjectId} = require('mongodb')

exports.paramsId = [
    param('id').notEmpty().custom((value)=> ObjectId.isValid(value))
]

exports.validateCreate = [
    body('name').trim().notEmpty().isString().isAlpha(),
    body('email').trim().notEmpty().isEmail()
]
exports.validateGetAll = async (req, res, next) =>{
    const {data} = await getAllUsers()
    if(data.length == 0) return res.status(404).json({message : "Não há usuarios"})
    return next()
}
exports.validateErrorUser = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    return next()
}

exports.validateDuplicatedUserEmail = async (req, res, next) =>{
    const {email} = req.body
    const {data} = await getOneUserByEmail(email)
    if (data) return res.status(400).json({message: 'Cadastro duplicado'})
    return next()
}

exports.validateFoundById = async (req, res, next) =>{
    const {id} = req.params
    const {data} = await getOneUserById(id)

    if (!data) return res.status(400).json({message: 'Usuario não encontrado'})
    return next()
}


   
