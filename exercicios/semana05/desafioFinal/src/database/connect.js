const { MongoClient } = require('mongodb');
require('dotenv/config')

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
var connection = null
const retry = 5

const sleep = async (timing) => new Promise((resolve) => {
    setTimeout(() => { resolve() }, timing)
})

const retryConnection = async (DataBase, Collection, tryN = 1) => {
    try {
        if (connection === null) {
            await client.connect()
            await client.db('admin').command({ ping: 1 })
            connection = client.db(DataBase)
        }
        if (connection != null) {
            await connection.command({ ping: 1 })
        }
        return {
            collection: connection.collection(Collection)
        }
    } catch (err) {
        connection = null
        if (tryN > retry) throw new Error(err.message)
        await sleep(800)
        return retryConnection(DataBase, Collection, tryN + 1)
    }
}
exports.connectDb = async (DataBase, Collection) => {
    return await retryConnection(DataBase, Collection)
}


