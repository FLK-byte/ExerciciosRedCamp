const { connectDb } = require('../database/connect')

exports.getSearchs = async (searchWord) => {
    const collection = await connectDb('test', 'searchs')
    const data = await collection.find({$text:{$search:`${searchWord}`}}, {score:{$meta:"textScore"}}).sort({score:{$meta: "textScore"}}).toArray()
    return { data, status: 200 }
}

db.searchs.find({$text:{$search: {"text": {"path" : "name", "query" : "DNA"}}}}, {score:{$meta:"textScore"}}).sort({score:{$meta: "textScore"}}).pretty()