const { MongoClient } = require('mongodb');
require('dotenv/config')
const url =   process.env.DATABASEURL;
const client = new MongoClient(url);

exports.connectDb = async (DataBase, Collection) => {
    try {
        await client.connect();
        const db = client.db(DataBase);
        return db.collection(Collection);
    } catch (err) {
        console.log("erro", err)
    }
}


