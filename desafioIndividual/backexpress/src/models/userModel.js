const { connectDb } = require('../database/connect')
const { ObjectId } = require('mongodb')
const { connectRedis } = require('../database/redis')

/* const storedKeys = []
function findAndClearIdInKeys(id) {
    storedKeys.map(async (key) => {
        const connect = await connectRedis()
        const result = await connect.get(key)
        JSON.parse(result).data.map(async (user) => {
            if (user._id == id) {
                await connect.set(key, null)
            }
        })
    })
} */
exports.getAllUsers = async (page, limit) => {
    try {

        /* const connect = await connectRedis()
        const key = `users - page: ${page} - limit: ${limit}`
        const result = await connect.get(key)
        if (result) return { data: JSON.parse(result), status: 200 } */
        const { collection } = await connectDb('Pokemon', 'pokemonUsers')
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
        /* await connect.set(key, JSON.stringify(data))
        if (storedKeys.length == 0) {
            storedKeys.push(key)
        } else {
            storedKeys.map(keyArmazenada => {
                keyArmazenada == key ? null : storedKeys.push(key)
            })
        } */
        /* const data = await collection.find().toArray() */
        return { data, status: 200 }
    } catch (err) {
        console.log("Erro model getAllUsers->", err.message)
    }
}

exports.createOneUser = async ({email, senha }) => {
    const { collection } = await connectDb('Pokemon', 'pokemonUsers')
    const { insertedId } = await collection.insertOne({ email, senha })
    return { data: { id: insertedId, email, senha }, status: 201 }
}

exports.getOneUserById = async (id) => {
/*     const connect = await connectRedis()
    const key = `users - id: ${id}`
    const result = await connect.get(key)
    if (result) return { data: JSON.parse(result), status: 200 }
 */
    const { collection } = await connectDb('Pokemon', 'pokemonUsers')
    const data = await collection.findOne({ _id: ObjectId(id) })
    //await connect.set(key, JSON.stringify(data))
    return { data, status: 200 }
}

exports.getOneUserByEmail = async (email) => {
    const { collection } = await connectDb('Pokemon', 'pokemonUsers')
    const data = await collection.findOne({ email: email })
    return { data, status: 200 }
}

exports.putUser = async (id, { email, senha }) => {
    try {
        //findAndClearIdInKeys(id)
        /* const connect = await connectRedis()
        const key = `users - id: ${id}` */
        const { collection } = await connectDb('Pokemon', 'pokemonUsers')
        const { insertedId } = await collection.updateOne({ _id: ObjectId(id) }, { $set: { email, senha } })

        //await connect.set(key, JSON.stringify({ id: insertedId, email, senha }))
        return { data: { id: insertedId, email, senha }, status: 201 }
    } catch (err) {
        console.log("Erro model putUser ->", err.message)
    }
}

exports.removeUser = async (id) => {
    const { collection } = await connectDb('Pokemon', 'pokemonUsers')
    const dataUser = await collection.findOne({ _id: ObjectId(id) })
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data: dataUser, status: 200 }
}
