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
            return res.status(400).json({ messageError: "O email já está sendo utilizado" })
        }
        return res.status(400).json({ messageError: "O seu email é inválido" })
    }
    res.status(400).json({ messageError: "Preencha os campos corretamente" })
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
    const { name, email } = req.body
    try {
        const userExistente = await getOneUserById(req.params.id)
        if (userExistente !== null) {
            if (!name.trim() || !email.trim()) {
                return res.status(400).json({ messageError: "Preencha os campos corretamente" })
            }
            if (email && !validatorEmail(email)) {
                return res.status(400).json({ messageError: "Email inválido" })
            }
            let emailExistente = await getOneUserByEmail(email)
            if (emailExistente.data == null) {
                const { data, status } = await putUser(req.params.id, req.body)
                return res.status(status).json(data)
            }
            return res.status(400).json({ messageError: "Email já cadastrado" })
        }
    } catch (err) {
        return res.status(404).json({ messageError: "Usuario não existente" })
    }
}
exports.removeUser = async (req, res) => {
    try {
        const { data, status } = await removeUser(req.params.id)
        res.status(status).json(data)
    } catch (err) {
        res.status(404).json({ messageError: "Usuario não encontrado verifique o ID inserido" })
    }

}