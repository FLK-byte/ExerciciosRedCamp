window.onload = async function () { 
    const url = "https://ca77-187-182-47-3.sa.ngrok.io/user"
    //https://803a-2804-431-e7c1-70a8-84c1-80ac-f1a5-20a4.sa.ngrok.io/users"
    async function getUsers() {
        try {
            let res = await fetch(url);
            console.log(res)
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function renderUsers() {
        let users = await getUsers();
        console.log(users)
        return users
    }
    const dados = await renderUsers();
    async function renderizarTela(dados) {
        const divUsers = document.querySelector("#users")

        dados.data.map((value, index) => {
            const divUs = document.createElement('div')
            divUs.style.border = "solid black 1px"
            divUs.style.minWidth = "250px"
            divUs.className = `userClass-${index}`

            const divUserId = document.createElement('div')
            divUserId.innerHTML = value._id

            const divUserName = document.createElement('div')
            divUserName.innerHTML = value.name

            const divUserEmail = document.createElement('div')
            divUserEmail.innerHTML = value.email
            divUserEmail.style.marginBottom = "10px"

            const botaoDeletar = document.createElement('button')
            botaoDeletar.innerHTML = "Deletar"

            const botaoEditar = document.createElement('button')
            botaoEditar.innerHTML = "Editar"
            botaoEditar.setAttribute("data-bs-whatever", "Editar")

            var botaoCadastro = document.querySelector("#botaoCadastrar")

            botaoDeletar.onclick = async () => {
                await fetch(`${url}/${value._id}`,
                    {
                        method: 'DELETE'
                    })
                alert(`O usuario: \n com nome : ${value.name} \n com email: ${value.email} \n com id: ${value._id} \n foi deletado`)
                divUsers.removeChild(divUs)
            }
            botaoEditar.onclick = () => {
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
                var exampleModal = document.getElementById('exampleModal')
                var form = exampleModal.querySelector('form')
                var idForm = form.querySelector("#idForm")
                var inputRead = document.createElement('input')
                inputRead.setAttribute("readonly", "true")
                inputRead.id = "recipient-id"
                idForm.append(inputRead)
                var inputName = document.querySelector("#recipient-name")
                var inputEmail = document.querySelector("#recipient-email")

                inputRead.value = value._id
                inputName.value = value.name
                inputEmail.value = value.email

                myModal.show()
            }
            var exampleModal = document.getElementById('exampleModal')
            exampleModal.addEventListener('show.bs.modal', function () {
                var action = botaoEditar.getAttribute('data-bs-whatever')
                var modalTitle = exampleModal.querySelector('.modal-title')

                var botaoDinamico = exampleModal.querySelector("#botaoDinamicoForm")
                botaoDinamico.innerHTML = action
                modalTitle.textContent = action
            })

            botaoCadastro.onclick = () => {
                var modalTitle = exampleModal.querySelector('.modal-title')
                var botaoDinamico = exampleModal.querySelector("#botaoDinamicoForm")
                var inputName = document.querySelector("#recipient-name")
                var inputEmail = document.querySelector("#recipient-email")

                inputName.value = ""
                inputEmail.value = ""

                botaoDinamico.innerHTML = "Cadastrar"
                modalTitle.textContent = "Cadastrar"
            }

            ////////////////////////////////
            divUs.appendChild(divUserId)
            divUs.appendChild(divUserName)
            divUs.appendChild(divUserEmail)
            //// Append Buttons
            divUs.appendChild(botaoDeletar)
            divUs.appendChild(botaoEditar)

            divUsers.appendChild(divUs)
        })
    }
    var exampleModalButtonSendForm = document.querySelector("#botaoDinamicoForm")
    exampleModalButtonSendForm.onclick = async () => {
        var inputName = document.querySelector("#recipient-name")
        var inputEmail = document.querySelector("#recipient-email")
        var inputId = document.querySelector("#recipient-id")

        exampleModalButtonSendForm.innerHTML == "Cadastrar" ? await postData({"name" : inputName.value, "email":inputEmail.value}) : await editarData(inputId.value,{"name" : inputName.value, "email":inputEmail.value})
        exampleModalButtonSendForm.disabled = true
        this.location.reload()
    }
    async function postData(data){
        try {
            let res = await fetch(url, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function editarData(id,data){
        try {
            let res = await fetch(`${url}/${id}`, {
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    renderizarTela(dados)

}