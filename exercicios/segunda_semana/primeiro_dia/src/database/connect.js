const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://batatinha123:batatinha123@auladev.fmmz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

exports.connectDb = async (DataBase, Collection) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(DataBase);
        return db.collection(Collection);
    } catch (err) {
        console.log("erro", err)
    }
}


