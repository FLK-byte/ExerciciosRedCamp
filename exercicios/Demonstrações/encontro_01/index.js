
 // array
// const = constante (algo que não muda)
// coloca uma constante em um objeto
// voce n pode alterar o tipo do objeto mas os seus valores sim.

 
// destruct - (
    // ele extrair dados ou itens de um objeto
//)

// const { idade } = data

// pegando posições de um array (as duas ultimas, ou as duas primeiras e por ai vai)
// object = {}
// array = []
// const zero = array[0]
// const um = array[1]
// const [higor, diego] = array


// const nomes = ['higor', 'dana', 'gabriel']

// const salarios = [100, 150, 200]

// console.log('Nome: ' + nomes[0] + ' recebe o valor: ', salarios[0])
// console.log('Nome: ' + nomes[1] + ' recebe o valor: ', salarios[1])
// console.log('Nome: ' + nomes[2] + ' recebe o valor: ', salarios[2])

// const [higor, dana, gabriel] = ['higor', 'dana', 'gabriel']

// const [sh, sd, sg] = [100, 150, 200]

// console.log('Nome: ' + higor + ' recebe o valor: ', sh)
// console.log('Nome: ' + dana + ' recebe o valor: ', sd)
// console.log('Nome: ' + gabriel + ' recebe o valor: ', sg)


// spread - receber varios argumentos (
    // copia do array (do valor) reutilizando ele
    // descompactar iteraveis (permitir compartilhar os dados)
// )


// object
const data = {
    nome: 'higor',
    idade: 10
}

let nomes = ['higor', 'dana', 'gabriel', 'testando','testando5', 'higor', 'dana']
let salarios = [100, 150, 200, 300, 590, 300, 590]
// eu quero colocar o nogueira para receber 300 reais

// nomes = ['nogueira', ...nomes]
// salarios = [300, ...salarios]

const nome = 'nogueira' // [n,o,g,u,e,i,r,a]
const numero = [1,2,3,4,5]

// spread
// ele quebra todo os elementos em um novo objeto ou char para ser reutilizado
// ...nome = n o g u e i r a
// [...nome] = [n,o,g,u,e,i,r,a]
console.log(...nome)

