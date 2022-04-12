
// template string
// new Function
// ;

const operacao = ['+', '-', '*', '/']

// binário
    // 0 -> desligado
    // 1 -> ligado
// booleano
    // - 0 - false
    // - 1 - true
// tabela verdade
    // - True !True = false
    //  - False !False = true

    
exports.geracao = function (tipoOperacao, valor1, valor2) {
    if (!operacao.indexOf(tipoOperacao)) {
        const calculadora = new Function('a', 'b', `return a ${tipoOperacao} b`);    
        return calculadora(valor1, valor2)
    }
    throw 'tipo de operação inválida!'
}