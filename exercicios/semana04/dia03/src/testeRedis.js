const redis = require("redis");
const retryStrategy = require("node-redis-retry-strategy");
(async () => {
    const client = redis.createClient({
        host: "127.0.0.1",
        port: 6379,
        retry_strategy: retryStrategy()
    });
    await client.connect()
    client.on("connect", function () {
        console.log("connected!");
    });
    client.on("end", function () {
        console.log("redis connection has closed");
    });
    client.on("error", function () {
        return undefined
    });
    client.on("reconnecting", function (o) {
        console.log("redis client reconnecting", o.attempt, o.delay);
        return undefined
    });
    setInterval(async function () {
        const key = 'A'
        await client.set('A', "{\"somevalue\": \"value\"}")
        const value = await client.get(key)
        console.log(JSON.parse(value).somevalue)
        console.log("value", value)
    }, 3000)
})()