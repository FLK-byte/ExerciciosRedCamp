const numberCep = 38401092
const url = `https://pokeapi.co/api/v2/pokemon/ditto`
const https = require('https')

const chamadaApi = (urlToSearch) => new Promise((resolve, reject) => https.get(urlToSearch, res => {
    var data = []
    console.log(`status resposta ${res.statusCode}`)
    res.on('data', d => data.push(d))
    res.on('end', () => resolve(JSON.parse(Buffer.concat(data).toString())))
    res.on('error', (err) => reject(console.log('deu ruim...', err)))
}))


chamadaApi(url)
    .then(resultado => console.log('resultado aqui é: ', resultado))
    .catch(() => console.log('esse cep não consta na consulta'))

