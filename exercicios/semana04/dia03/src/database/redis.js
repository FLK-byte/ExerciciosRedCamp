const { createClient } = require('redis');
var connection = null
const client = createClient();
client.on("error", ()=> undefined);
exports.connectRedis = async () => {
    try {
        if (connection === null) {
            
            await client.connect();
            await client.ping()
            connection = client
            return connection
        }
        
        await connection.ping()
        return connection
    } catch (err) {
        connection = null
        throw new Error(err.message)
    }
}


