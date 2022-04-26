const {getSearchs} = require('../models/index')

exports.getSearch = async(req,res) => {
    const data = await getSearchs(req.query.q)
    res.status(200).json(data)
}