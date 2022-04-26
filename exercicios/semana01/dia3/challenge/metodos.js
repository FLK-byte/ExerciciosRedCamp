(async () => {
    const https = require('https')

    const integrationHttp = (pesquisa, options, data = null) => (resolve, reject) => {
        var req = https.request(pesquisa, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }
            let a = [];
            res.on('data', d => a.push(d));
            res.on('end', () => resolve(JSON.parse(Buffer.concat(a).toString())));
            res.on('error', () => reject())
        })

        if (data) req.write(data)
        req.end()
    }
    //Methods
    exports.Get = (pesquisa) => {
        var options = {
            method: 'GET',
        }

        return new Promise(integrationHttp(pesquisa, options));
    }

    exports.Post = (pesquisa, data) => {
        const dataString = JSON.stringify(data)

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
            }
        };

        return new Promise(integrationHttp(pesquisa, options, dataString))
    }

    exports.Put = (pesquisa, data) => {
        const dataString = JSON.stringify(data)

        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
            }
        };

        return new Promise(integrationHttp(pesquisa, options, dataString))
    }

})()
