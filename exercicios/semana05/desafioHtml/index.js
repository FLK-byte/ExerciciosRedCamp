window.onload = async function () {
    const url = "http://localhost:3000/user"
    //https://803a-2804-431-e7c1-70a8-84c1-80ac-f1a5-20a4.sa.ngrok.io/users"
    let count = 0
    async function getUsers(count) {
        try {
            let res = await fetch(`${url}?page=${count}`);
            console.log(res)
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function renderUsers(count = 0) {
        let users = await getUsers(count);
        console.log(users)
        return users
    }
    const dados = await renderUsers();
    const tbody = document.querySelector("tbody")
    async function renderizarTela(dados) {
        console.log(tbody)
        dados.data.map((value, index) => {
            const trUser = document.createElement('tr')
            const thUser = document.createElement('th')
            const tdUserId = document.createElement('td')
            const tdUserName = document.createElement('td')
            const tdUserEmail = document.createElement('td')
            const tdOptions = document.createElement('td')

            thUser.innerHTML = index + 1
            tdUserId.innerHTML = value._id
            tdUserName.innerHTML = value.name
            tdUserEmail.innerHTML = value.email

            trUser.appendChild(thUser)
            trUser.appendChild(tdUserId)
            trUser.appendChild(tdUserName)
            trUser.appendChild(tdUserEmail)
            trUser.appendChild(tdOptions)

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
                tbody.removeChild(trUser)
                //this.location.reload()
            }
            botaoEditar.onclick = () => {
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})

                var inputRead = document.querySelector('#recipient-id')
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

                var inputRead = document.querySelector('#recipient-id')
                var inputName = document.querySelector("#recipient-name")
                var inputEmail = document.querySelector("#recipient-email")

                inputName.value = ""
                inputEmail.value = ""
                inputRead.value = "Seu ID será gerado automaticamente"

                botaoDinamico.innerHTML = "Cadastrar"
                modalTitle.textContent = "Cadastrar"
            }
            tdOptions.append(botaoDeletar, botaoEditar)
            tbody.appendChild(trUser)
        })
    }
    const exampleModalButtonSendForm = document.querySelector("#botaoDinamicoForm")
    exampleModalButtonSendForm.onclick = async () => {
        var inputName = document.querySelector("#recipient-name")
        var inputEmail = document.querySelector("#recipient-email")
        var inputId = document.querySelector("#recipient-id")

        exampleModalButtonSendForm.innerHTML == "Cadastrar" ? await postData({ "name": inputName.value, "email": inputEmail.value }) : await editarData(inputId.value, { "name": inputName.value, "email": inputEmail.value })
        exampleModalButtonSendForm.disabled = true
        this.location.reload()
    }
    async function postData(data) {
        try {
            let res = await fetch(url, {
                method: "POST",
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
    async function editarData(id, data) {
        try {
            let res = await fetch(`${url}/${id}`, {
                method: "PUT",
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

    const buttonNextpage = document.querySelector("#buttonNextPage")
    const buttonPreviouspage = document.querySelector("#buttonPreviousPage")
    const buttonLastPage = document.querySelector("#buttonLastPage")
    const buttonFirstPage = document.querySelector("#buttonFirstPage")

    buttonNextpage.onclick = async () => {
        const currentData = await renderUsers(count)
        if(currentData.length <= 0){
            return buttonNextpage.className = "page-item disabled"
        }
        buttonNextpage.className = "page-item"
        count += 1
        const nextPageData = await renderUsers(count)
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }
        renderizarTela(nextPageData)
        buttonPreviouspage.className = "page-item"
    }
    buttonPreviouspage.onclick = async () => {
        count -= 1
        const previousPageData = await renderUsers(count)
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }
        renderizarTela(previousPageData)
        count <= 0 ? buttonPreviouspage.className = "page-item disabled" :  buttonNextpage.className = "page-item"
    }
    buttonLastPage.onclick = async () =>{
        const totalUsers = dados.metaData[0].total
        count = ((totalUsers/10)-1)
        if (totalUsers%10 == 0){
            const nextPageData = await renderUsers((totalUsers/10)-1)
            while (tbody.hasChildNodes()) {
                tbody.removeChild(tbody.firstChild);
            }
            renderizarTela(nextPageData)
            buttonPreviouspage.className = "page-item"
            buttonNextpage.className = "page-item disabled"
            return console.log(count)
        }
        const nextPageData = await renderUsers(parseInt(totalUsers/10))
        count = (parseInt(totalUsers/10))
            while (tbody.hasChildNodes()) {
                tbody.removeChild(tbody.firstChild);
            }
            renderizarTela(nextPageData)
            buttonPreviouspage.className = "page-item"
            buttonNextpage.className = "page-item disabled"
            return console.log(count)
    }
    buttonFirstPage.onclick =  async () => {
        count = 0
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }
        buttonNextpage.className = "page-item"
        buttonPreviouspage.className = "page-item disabled" 
        renderizarTela(dados)
    }
    renderizarTela(dados)

}