const url = 'https://viacep.com.br/ws'
const https = require('https')


const httpsGet = (pesquisa) => (resolve, reject) => https.get(pesquisa, res => {
        let body=[];
        res.on('data', d => body.push(d));
        res.on('end', () => resolve(JSON.parse(Buffer.concat(body).toString())));
        res.on('error', ()=> reject())
})

const req=(pesquisa) => {
    return new Promise(httpsGet(pesquisa));
}

const pesquisa= `${url}/18087689/json`

req(pesquisa)
    .then((result)=>console.log('Dados do CEP:', result))
    .catch((result)=>{console.log('ERRO', result)})