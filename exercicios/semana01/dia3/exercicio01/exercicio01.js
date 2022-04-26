(async () => {

    // 7 - Refazer a função de tal forma que seja reutilizada.


    const https = require('https')
    ///////////CONSTS
    const url = 'https://624df93353326d0cfe55cbf7.mockapi.io'


    const integrationHttp = (pesquisa, options, data = null) => (resolve, reject) => {
        var req = https.request(pesquisa, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }
            let body = [];
            res.on('data', d => body.push(d));
            res.on('end', () => resolve(JSON.parse(Buffer.concat(body).toString())));
            res.on('error', () => reject())
        })

        if (data) req.write(data)
        req.end()
    }


    //////////////METHODS
    const Get = (pesquisa) => {
        var options = {
            method: 'GET',
        }

        return new Promise(integrationHttp(pesquisa, options));
    }

    const Post = (pesquisa, data) => {
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

    const Patch = (pesquisa, data) => {
        const dataString = JSON.stringify(data)

        var options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
            }
        };

        return new Promise(integrationHttp(pesquisa, options, dataString))
    }

    const Put = (pesquisa, data) => {
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

    const Delete = (pesquisa) => {

        var options = {
            method: 'DELETE',
        };

        return new Promise(integrationHttp(pesquisa, options))
    }

    // Promise
    // 1 - Pending = não colocar o ()
    // 2 - Resolve = then ou await
    // 3 - Reject = catch

    /////////////////DADOS

    try {
        const [user] = await Get(`${url}/usersdhyusa`) // esse vai ser o primeiro

        const userGetOne = await Get(`${url}/users/${user.id}`) // esse vai ser o segundo

        const createUser = await Post(`${url}/users`, { "name": "Giovani", "email": "giovani@email" }) // esse vai ser o terceiro

        const updateUser = await Put(`${url}/users/${userGetOne.id}`, { "name": "Giovani", "email": "giovani@email" }) //...

        const patchUser = await Patch(`${url}/users/${userGetOne.id}`, { "name": "Giovani", "email": "giovani@email" }) //...

        const deleteOne = await Delete(`${url}/users/${createUser.id}`) //...


    } catch (error) {
        console.log('Error no codigo....', error)
    }

})()