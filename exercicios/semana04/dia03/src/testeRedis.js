(async () => {
    const { connectRedis } = require('./database/redis')
    const connect = await connectRedis()
    const key = 'A'
    await connect.set('A', "{\"somevalue\": \"value\"}")
    const value = await connect.get(key)
    console.log(JSON.parse(value).somevalue)
    console.log("value", value)
})()