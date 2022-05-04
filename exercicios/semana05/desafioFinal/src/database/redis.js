const { createClient } = require('redis');
var connection = null

exports.connectRedis = async () => {
    const retry_strategy = function (options) {
        if (options.error && (options.error.code === 'ECONNREFUSED' || options.error.code === 'NR_CLOSED')) {
            // Try reconnecting after 5 seconds
            console.error('The server refused the connection. Retrying connection...');
            return 5000;
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with an individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 50) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
    try {
        if (connection === null) {
            const client = createClient({retry_strategy: retry_strategy});
            client.on("error", () => undefined);
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


