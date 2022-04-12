// template_string=``
// concatenacao_string=''

// const primeiroNome = 'Higor'
// const segundoNome = 'Diego'

// console.log('O  primeiro nome é: ' + primeiroNome + ' e o segundo é: ' + segundoNome)
// console.log(`O  primeiro nome é: ${primeiroNome} e o segundo é: ${segundoNome}`)

const { geracao } = require('./func')

console.log('A soma de 6 + 2 = ' + geracao('+', 6, 2));
console.log('A sub de 6 - 2 = ' + geracao('-', 6, 2));
console.log('A multiplicão de 6 * 2 = ' + geracao('*', 6, 2));
console.log('A divisão de 6 / 2 = ' + geracao('/', 6, 2));


