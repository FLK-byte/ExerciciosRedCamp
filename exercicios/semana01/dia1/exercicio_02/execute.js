exports.execute = (string, x, y) => {
    return string == "soma" ? x + y : 
    string == "sub" ? x - y : 
    string == "div" ? x / y : "insira uma opção válida soma, sub, div "  
}   