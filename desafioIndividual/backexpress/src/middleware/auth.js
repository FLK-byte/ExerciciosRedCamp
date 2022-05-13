const jwt = require('jsonwebtoken')
require('dotenv/config')

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) res.status(401).json({ messageError: "Token nao informado" })

    const parts = authHeader.split(' ')
    if (!parts.length == 2) res.status(401).json({ messageError: "Erro de token" })

    const [bearer, token] = parts

    if(!/^Bearer$/i.test(bearer)) res.status(401).json({ messageError: "Token mal formatado" })

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded)=>{
        if (err) res.status(401).json({ messageError: err })
        
        req.userId = decoded.id
        return next()
    })
}