const { connectDb } = require('../database/connect')
const { ObjectId } = require('mongodb')
const { connectRedis } = require('../database/redis')

/* const storedKeys = []
function findAndClearIdInKeys(id) {
    storedKeys.map(async (key) => {
        const connect = await connectRedis()
        const result = await connect.get(key)
        JSON.parse(result).data.map(async (Pokemon) => {
            if (Pokemon._id == id) {
                await connect.set(key, null)
            }
        })
    })
} */
exports.getAllPokemons = async (page, limit) => {
    try {
        /* const connect = await connectRedis()
        const key = `Pokemons - page: ${page} - limit: ${limit}`
        const result = await connect.get(key)
        if (result) return { data: JSON.parse(result), status: 200 } */
        const { collection } = await connectDb('Pokemon', 'pokemons')
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
        console.log("Erro model getAllPokemons->", err.message)
    }
}

exports.createOnePokemon = async (bodyPokemon) => {
    const { collection } = await connectDb('Pokemon', 'pokemons')
    const { insertedId } = await collection.insertOne(bodyPokemon)
    return { data: { id: insertedId, bodyPokemon }, status: 201 }
}

exports.getOnePokemonById = async (id) => {
/*     const connect = await connectRedis()
    const key = `Pokemons - id: ${id}`
    const result = await connect.get(key)
    if (result) return { data: JSON.parse(result), status: 200 }
 */
    const { collection } = await connectDb('Pokemon', 'pokemons')
    const data = await collection.findOne({ _id: ObjectId(id) })
    //await connect.set(key, JSON.stringify(data))
    return { data, status: 200 }
}

exports.getOnePokemonByName = async (name) => {
    const { collection } = await connectDb('Pokemon', 'pokemons')
    const data = await collection.findOne({ Name: name })
    return { data, status: 200 }
}

exports.putPokemon = async (id, bodyPokemon) => {
    try {
        //findAndClearIdInKeys(id)
        /* const connect = await connectRedis()
        const key = `Pokemons - id: ${id}` */
        const { collection } = await connectDb('Pokemon', 'pokemons')
        const { insertedId } = await collection.updateOne({ _id: ObjectId(id) }, { $set: bodyPokemon })

        //await connect.set(key, JSON.stringify({ id: insertedId, email, senha }))
        return { data: { id: insertedId, bodyPokemon }, status: 201 }
    } catch (err) {
        console.log("Erro model putPokemon ->", err.message)
    }
}

exports.removePokemon = async (id) => {
    const { collection } = await connectDb('Pokemon', 'pokemons')
    const dataPokemon = await collection.findOne({ _id: ObjectId(id) })
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data: dataPokemon, status: 200 }
}
