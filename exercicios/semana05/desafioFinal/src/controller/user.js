const { createOnePosts, getAllPosts, putPost, getOnePostById, removePost, writePostsInDb, getNewsInIFPE } = require('../models/index')

exports.getDataPlaceHolderAndWrite = async (req, res) => {
    try {
        const { data, status } = await writePostsInDb()
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no getDataPlaceHolder/controller" })
    }
}

exports.getWriteNews = async (req, res) => {
    try {
        const { amount } = req.query
        const { data, status } = await getNewsInIFPE(amount)
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no getNews/controller" })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const { data, status } = await getAllPosts()
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no getPosts/controller" })
    }
}

exports.createPost = async (req, res) => {
    try {
        const { data, status } = await createOnePosts(req.body)
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no createPost/controller" })
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { data, status } = await getOnePostById(req.params.id)
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no getPostById/controller" })
    }
}

exports.put = async (req, res) => {
    try {
        const { data, status } = await putPost(req.params.id, req.body)
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no put/controller" })
    }
}

exports.removePostagem = async (req, res) => {
    try {
        const { data, status } = await removePost(req.params.id)
        return res.status(status).json(data)
    } catch (err) {
        return res.status(500).json({ message: "Erro não esperado no removeUser/controller" })
    }
}