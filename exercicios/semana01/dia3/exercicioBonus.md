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
            Higor recebeu 100 reais. Caso eu tentei fazer um novo pagamento
                para o Higor o sistema não pode deixar pois o Higor já recebeu.
    
    Caso de teste:
        1 - Pagamento duplicados
        2 - Criação dos usuários
        3 - Criação dos pagamentos

    2 - Realizar transferencia
        Você pode realizar inumeras transferencias caso tenha saldo.
        Quando o usuário transferir o seu dinheiro para outro você deve retirar o dinheiro
            da conta do usuário que transferiu.
        obs: Caso o usuário não tenha dinheiro suficiente para trasnferir, informa-lo
            que não poderá realizar essa ação.
        
        Exemplo:
            Higor gostaria de transferir 100 reais para a Dana, o sistema deve possibilitar
            essa transferencia caso o higor tenha saldo.
            O sistema deve retirar o dinheiro do saldo do cliente após a realização da transferencia.
        
        https://624df93353326d0cfe55cbf7.mockapi.io/transferencia
            METHOD: POST
            body: {
                    "id_user_r": 81, -> o que vai receber o dinheiro
                    "id_user_t": 24, -> o que vai transferir o dinheiro
                    "valor": 77,
            },

        Caso de teste
            1 - Trasnferencia sem dinheiro
            2 - Transferencia com dinheiro
            3 - Transferencia com o usuário não existente.
*/