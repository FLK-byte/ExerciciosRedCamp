const { connectDb } = require('../database/connect')

exports.getSearchs = async (searchWord) => {
    const collection = await connectDb('test', 'searchs')
    const data = await collection.find({$text:{$search:`${searchWord}`}}, {score:{$meta:"textScore"}}).sort({score:{$meta: "textScore"}}).toArray()
    return { data, status: 200 }
}

db.searchs.find({$or:[{name:/D/i},{body:/D/i}]}).pretty()

//db.searchs.find({$text:{$search:`DNA`}, {$or:[{name:/D/i},{body:/D/i}]}}, {score:{$meta:"textScore"}}).sort({score:{$meta: "textScore"}}).pretty()