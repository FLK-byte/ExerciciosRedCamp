const { connectDb } = require('../database/connect')
const { ObjectId } = require('mongodb')
const { connectRedis } = require('../database/redis')

const storedKeys = []
function findAndClearIdInKeys(id) {
    storedKeys.map(async (key) => {
        const connect = await connectRedis()
        const result = await connect.get(key)
        JSON.parse(result).data.map(async (user) =>{
            if (user._id == id){
                console.log("key limpa")
                await connect.set(key, null)
            }
        })
    })
}
exports.getAllUsers = async (page, limit) => {
    try {
        console.log("StoredKeys ->", storedKeys)
        const connect = await connectRedis()
        const key = `users - page: ${page} - limit: ${limit}`
        const result = await connect.get(key)
        if (result) return { data: JSON.parse(result), status: 200 }
        const { collection } = await connectDb('usuarios', 'users')
        const skip = page > 0 ? page * limit : 0
        const [data] = await collection.aggregate(
            [
                {
                    $facet: {
                        metaData: [{ $count: 'total' },
                        { $addFields: { page } }],
                        data: [{ $skip: skip }, { $limit: limit }]
                    }
                }
            ]
        ).toArray()
        await connect.set(key, JSON.stringify(data))
        console.log(storedKeys.length)
        if(storedKeys.length == 0){
            storedKeys.push(key)
        }else {
            storedKeys.map(keyArmazenada =>{
                keyArmazenada == key ? null : storedKeys.push(key)
            })
        }
        /* const data = await collection.find().toArray() */
        return { data, status: 200 }
    } catch (err) {
        console.log("Erro model getAllUsers->", err.message)
    }
}

exports.createOneUser = async ({ name, email }) => {
    const { collection } = await connectDb('usuarios', 'users')
    const { insertedId } = await collection.insertOne({ name, email })
    return { data: { id: insertedId, name, email }, status: 201 }
}

exports.getOneUserById = async (id) => {
    const connect = await connectRedis()
    const key = `users - id: ${id}`
    const result = await connect.get(key)
    if (result) return { data: JSON.parse(result), status: 200 }

    const { collection } = await connectDb('usuarios', 'users')
    const data = await collection.findOne({ _id: ObjectId(id) })
    await connect.set(key, JSON.stringify(data))
    return { data, status: 200 }
}

exports.getOneUserByEmail = async (email) => {
    const { collection } = await connectDb('usuarios', 'users')
    const data = await collection.findOne({ email: email })
    return { data, status: 200 }
}

exports.putUser = async (id, { name, email }) => {
    try {
        findAndClearIdInKeys(id)
        const connect = await connectRedis()
        const key = `users - id: ${id}`
        const { collection } = await connectDb('usuarios', 'users')
        const { insertedId } = await collection.updateOne({ _id: ObjectId(id) }, { $set: { name, email } })

        await connect.set(key, JSON.stringify({ id: insertedId, name, email }))
        return { data: { id: insertedId, name, email }, status: 201 }
    } catch (err) {
        console.log("Erro model putUser ->", err.message)
    }
}

exports.removeUser = async (id) => {
    /* findAndClearIdInKeys(id) */
    const { collection } = await connectDb('usuarios', 'users')
    const dataUser = await collection.findOne({ _id: ObjectId(id) })
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data: dataUser, status: 200 }
}
