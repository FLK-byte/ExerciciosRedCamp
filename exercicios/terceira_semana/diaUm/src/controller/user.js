const { createOneUser, getAllUsers, putUser, removeUser, getOneUserByEmail, getOneUserById } = require('../models/index')
const { validatorEmail } = require('../shared/emailValidator')

exports.getUsers = async (req, res) => {
    const { data, status } = await getAllUsers()
    res.status(status).json(data)
}

exports.createUser = async (req, res) => {
    const { name, email } = req.body
    if (name && email) {
        if (validatorEmail(email)) {
            const emailExistente = await getOneUserByEmail(email)
            if (emailExistente.data == null) {
                const { data, status } = await createOneUser(req.body)
                return res.status(status).json(data)
            }
            return res.status(404).json({ messageError: "O email já está sendo utilizado" })
        } else {
            return res.status(404).json({ messageError: "O seu email é inválido" })
        }
    }
    res.status(404).json({ messageError: "Preencha os campos corretamente" })
}

exports.getUser = async (req, res) => {
    try {
        const { data, status } = await getOneUserById(req.params.id)
        data ? res.status(status).json(data) : res.status(status).json({ messageError: "Usuario não existente" })
    } catch (err) {
        res.status(404).json({ messageError: `Não foi possivel encontrar o seguinte id: ${req.params.id}` })
    }
}

exports.put = async (req, res) => {
    const userExistente = await getOneUserById(req.params.id)
    if (userExistente.data) {
        const { name, email } = req.body
        if (name && email) {
            if (validatorEmail(email)) {
                const emailExistente = await getOneUserByEmail(email)
                if (emailExistente.data == null) {
                    const { data, status } = await putUser(req.params.id, req.body)
                    return res.status(status).json(data)
                }
                return res.status(404).json({ messageError: "O email já está sendo utilizado" })
            }
            return res.status(404).json({ messageError: "O seu email é inválido" })
        } else if (name) {
            req.body.email = userExistente.data.email
            const { data, status } = await putUser(req.params.id, req.body)
            return res.status(status).json(data)
        } else if (email) {
            if (validatorEmail(email)) {
                const emailExistente = await getOneUserByEmail(email)
                if (emailExistente.data == null) {
                    req.body.name = userExistente.data.name
                    const { data, status } = await putUser(req.params.id, req.body)
                    return res.status(status).json(data)
                }
                return res.status(404).json({ messageError: "O email já está sendo utilizado" })
            }
            return res.status(404).json({ messageError: "O seu email é inválido" })
        }
        return res.status(404).json({ messageError: "Preencha os campos corretamente" })
    }
    res.status(404).json({ messageError: "Usuario Nao encontrado" })
}

exports.removeUser = async (req, res) => {
    try {
        const { data, status } = await removeUser(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(404).json({ messageError: "Usuario Nao encontrado verifique o ID inserido" })
    }

}