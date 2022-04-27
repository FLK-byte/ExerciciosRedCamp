const { MongoClient } = require('mongodb');
require('dotenv/config')
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
var connection = null
exports.connectDb = async (DataBase, Collection) => {
    if(connection === null){
        console.log("criando nova conexao")
        await client.connect()
        await client.db('admin').command({ping: 1})
        connection = client.db(DataBase)
    }
    return {
        collection : connection.collection(Collection)
    }
}


