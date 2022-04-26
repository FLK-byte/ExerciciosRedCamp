(async () => {
    const url = "https://624df93353326d0cfe55cbf7.mockapi.io"
    const { Get, Post, Put } = require('./metodos')

    const verificarCpfOrCnpj = (string) => {
        if (string.length == 14) {
            return "CPF"
        } else if (string.length == 18) {
            return "CNPj"
        }
        return ("Insira um cpf ou um cnpj \n no seguinte formato \n CPF: xxx.xxx.xxx-xx \n CNPJ: XX.XXX.XXX/0001-XX")
    }

    const createUser = async (value, name, cpf_cnpj, email, senha, logista) => {
        const verifyUser = await Get(`${url}/users/?email=${email}`)
        let lojista = false
        lojista = verificarCpfOrCnpj(cpf_cnpj) == "CPF" ? false : true
        if (logista == lojista) {
            if (!(verifyUser.length > 0)) {
                verificarCpfOrCnpj(cpf_cnpj)
                const newUser = await Post(`${url}/users`, { value: value, name: name, cpf_cnpj: cpf_cnpj, email: email, senha: senha, logista: lojista })
                console.log(newUser)
            } else {
                return ("O usuario existe \n Se estiver tentando criar uma Loja, verifique se o email é único para a loja")
            }
        } else {
            return "Confira as opções Logista e o seu Cpf"
        }

    }

    const transaction = async (value, remetente, destinatario) => {
        const fetchRemetente = await Get(`${url}/users/?id=${remetente}`)
        const fetchDestinatario = await Get(`${url}/users/?id=${destinatario}`)
        if (fetchRemetente[0].logista == true) {
            console.log("Lojas não podem realizar transferencias")
        } else if (fetchRemetente[0].value >= value) {
            const validacao = await Get("https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6")
            if (validacao.message == "Autorizado") {
                const transferencia = await Post(`${url}/transaction`, {value: value, usuario: fetchRemetente[0].id, logista: fetchDestinatario[0].id })
                const updateContaRemetente = await Put(`${url}/users/?id=${remetente}`, {value: fetchRemetente[0].value - value})
                const updateContaDestinatario = await Put(`${url}/users/?id=${destinatario}`, {value : fetchDestinatario[0].value + value})
                const notify = await Post(`${url}/notify`, {user : fetchRemetente[0].id })

                return transferencia
            } else {
                return "Nao foi autorizado a transferencia"
            }
        } else {
            return "Saldo insuficiente"
        }

    }
    transaction(100, "56", "57")
    // AStolfo pessoa: 56 LojaAstolfo: 57
    //createUser(1000, "LojaAstolfo", "123.456.789-454444", "LojaAstolfo@redfox.tech", "senhaSegura", true )
    //Nao esta funcionando :( )
})()
