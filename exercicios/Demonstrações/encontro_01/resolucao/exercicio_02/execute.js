const operacao = ['+', '-', '*', '/']

function geracao(tipoOperacao, valor1, valor2) {
    if (!operacao.indexOf(tipoOperacao)) {
        const calculadora = new Function('a', 'b', `return a ${tipoOperacao} b`);    
        return calculadora(valor1, valor2)
    }
    throw 'tipo de operação inválida!'
}

exports.execute = (a,b,c) =>{
    if (a =='soma') return geracao('+', b, c)
    if (a =='subtracao') return geracao('-', b, c)
    if (a =='multiplicacao') return geracao('*', b, c)
    if (a =='divisao') return geracao('/', b, c)
}