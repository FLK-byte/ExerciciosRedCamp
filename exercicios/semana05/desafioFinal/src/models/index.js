const { connectDb } = require('../database/connect')
const { connectRedis } = require('../database/redis')
const { ObjectId } = require('mongodb')
const axios = require('axios')
const cheerio = require('cheerio');

/* const storedKeys = []
function findAndClearIdInKeys(id) {
    storedKeys.map(async (key) => {
        const connect = await connectRedis()
        const result = await connect.get(key)
        JSON.parse(result).map(async (post)=>{
            if(post._id == id){
                return await connect.set(key, null)
            }
  
        })
    })
} */
exports.writePostsInDb = async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const { collection } = await connectDb('postagens', 'allPostagens')
        const result = await Promise.all(data.map(post => {
            return collection.insertOne({ title: post.title, body: post.body })
        }))
        return { data: result, status: 201 }
    } catch (err) {
        return ("Erro model writePostsInDb->", err.message)
    }
}

exports.getAllPosts = async () => {
    try {
        const connect = await connectRedis()
        const key = `posts`
        const result = await connect.get(key)
        if (result) return { data: JSON.parse(result), status: 200 }

        const { collection } = await connectDb('postagens', 'allPostagens')
        const data = await collection.find({}, { title: 1, body: 1 }).toArray()
        await connect.set(key, JSON.stringify(data))
        /* if (storedKeys.length == 0) {
            storedKeys.push(key)
        } else {
            storedKeys.map(keyArmazenada => {
                keyArmazenada == key ? null : storedKeys.push(key)
            })
        } */
        return { data, status: 200 }
    } catch (err) {
        return ("Erro model getAllUsers->", err.message)
    }
}

exports.getNewsInIFPE = async (amount) => {
    try {
        const { data } = await axios.get(`https://www.ifpe.edu.br/noticias?b_start:int=${amount || 0 * 20}`)
        const $ = cheerio.load(data, null, false);
        let list = $('.summary.url,.description').toArray().map((value, index, Array) => {
            if (index % 2 == 0) {
                return { title: $(value).text(), body: $(Array[index + 1]).text() }
            }
        })
        const filtered = list.filter(value => {
            return value != undefined
        })
        const { collection } = await connectDb('postagens', 'allPostagens')
        const result = await Promise.all(filtered.map(post => {
            return collection.insertOne({ title: post.title, body: post.body })
        }))
        return { data: result, status: 200 }
    } catch (err) {
        return ("Erro model getAllUsers->", err.message)
    }
}

exports.createOnePosts = async ({ title, body }) => {
    try {
        const { collection } = await connectDb('postagens', 'allPostagens')
        const { insertedId } = await collection.insertOne({ title, body })
        return { data: { _id: insertedId, title, body }, status: 201 }
    } catch (err) {
        return ("Erro model createOnePosts->", err.message)
    }
}

exports.getOnePostById = async (id) => {
    try {
        const { collection } = await connectDb('postagens', 'allPostagens')
        const data = await collection.findOne({ _id: ObjectId(id) })
        return { data, status: 200 }
    } catch (err) {
        return ("Erro model getOnePostById->", err.message)
    }
}

exports.putPost = async (id, { title, body }) => {
    try {
        /* findAndClearIdInKeys(id) */
        const { collection } = await connectDb('postagens', 'allPostagens')
        await collection.updateOne({ _id: ObjectId(id) }, { $set: { title, body } })
        return { data: { id: id, title, body }, status: 201 }
    } catch (err) {
        return ("Erro model putUser ->", err.message)
    }
}

exports.removePost = async (id) => {
    try {
        const { collection } = await connectDb('postagens', 'allPostagens')
        const dataPost = await collection.findOne({ _id: ObjectId(id) })
        const data = await collection.deleteOne({ _id: ObjectId(id) })
        return { data: dataPost, status: 200 }
    } catch (err) {
        return ("Erro model removePost ->", err.message)
    }
}
