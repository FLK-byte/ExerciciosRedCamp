(async () => {

    const { Get, Post } = require('./exercicioBonus')
    /*
        Exercicio Bonus
        1 - Realizar pagamento
            https://624df93353326d0cfe55cbf7.mockapi.io/pagamento
            METHOD: POST
            body: {
                    "valor": 43,
                    "id_user": 87
                },
        Obs:
            Você só poderá realizar um pagamento para um usuário
            exemplo:
                Higor recebeu 100 reais. Caso eu tente fazer um novo pagamento
                    para o Higor o sistema não pode deixar pois o Higor já recebeu.
        
        Caso de teste:
            1 - Pagamento duplicados
            2 - Criação dos usuários
            3 - Criação dos pagamentos
    
    */
    const url = 'https://624df93353326d0cfe55cbf7.mockapi.io'

    // 1 -> criar um cadastro 

    const criarUser = async () => {
        const fetchUser = await Get(`${url}/users/?email=filipe.santos@redfox.tech`)
        if (fetchUser.length > 0) {
            console.log("O usuario já existe")
            const validarPagamento = await Get(`${url}/pagamento/?id_user=${fetchUser[0].id_user}`)

            if (!(validarPagamento.length > 0)) {
                const pagamento = await Post(`${url}/pagamento`, { valor: 100, id_user: fetchUser[0].id_user })
                console.log('poagamento efetuado: ', pagamento)
            } else {
                console.log('esse cara ja recebeu pagamento....')
            }
        } else {
            const resultado = await Post(`${url}/users`, { name: 'Filipe Santos', email: 'filipe.santos@redfox.tech', id_user: "77" })
            const validarPagamento = await Get(`${url}/pagamento/?id_user=${resultado.id_user}`)

            if (!(validarPagamento.length > 0)) {
                const pagamento = await Post(`${url}/pagamento`, { valor: 100, id_user: resultado.id_user })
                console.log('poagamento efetuado: ', pagamento)
            } else {
                console.log('esse cara ja recebeu pagamento....')
            }
        }
    }
    //criarUser()

    const transferir = async (valorASerEnviado, remetente, destinatario) => {
        const fetchRemetente = await Get(`${url}/users/?id=${remetente}`)
        const fetchDestinatario = await Get(`${url}/users/?id=${destinatario}`)
        
        if (fetchRemetente.length > 0 && fetchDestinatario.length > 0) {
            const saldoRemetente = await Get(`${url}/pagamento/?id_user=${remetente}`)
            console.log(saldoRemetente)
            if (Number(saldoRemetente[0].valor) <= Number(valorASerEnviado)) {
                transferencia = await Post(`${url}/transferencia`, { id_user_r: fetchDestinatario[0].id, id_user_t: fetchRemetente[0].id, valor : `${valorASerEnviado}` })
                console.log("transferencia", transferencia)
            } else {
                console.log("Não há saldo o suficiente para o envio")
            }
        } else {
            console.log("Algum dos dois usuarios não existe")
        }
    }
    transferir(10,1,2)
    /* const resultado = await Post(`${url}/users`, { name: 'Filipe Santos', email: 'filipe.santos@redfox.tech', id_user: "77" })

    const validarPagamento = await Get(`${url}/pagamento/?id_user=${resultado.id_user}`)

    if (!(validarPagamento.length > 0)) {
        const pagamento = await Post(`${url}/pagamento`, { valor: 100, id_user: resultado.id_user})
        console.log('poagamento efetuado: ', pagamento)
    } else {
        console.log('esse cara ja recebeu pagamento....')
    } */

})()



/*
 1 -> Eu vou cadastrar o usuário
    O que eu preciso fazer ?
        -> Usar POST enviar uma request nessa url: ${url}/users passando esses dados ...{}
        -> Receber o retorno do usuário

 2 -> Verificar se o usuário já teve um pagamento.
    O que eu preciso fazer ?
        -> usar o GET para pesquisar se aquele id do usuário está retornando no array
        -> https://624df93353326d0cfe55cbf7.mockapi.io/pagamento/?id_user=87
        -> Se o array for maior que zero então ele já recebeu um pagamento.

 3 -> Criar pagamento
    O que eu preciso fazer ?
        -> Usar o POST para enviar os dados de pagamento com base no id do passo 1.

        */