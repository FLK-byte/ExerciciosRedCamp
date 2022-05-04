window.onload = async function () {
    /* const fetchResponsePromise = fetch("http://localhost:3000/user")
    const Users = []
    await fetchResponsePromise
    .then((res)=>{
        res.text()
        .then((result)=>{
            JSON.parse(result).data.map(el=>{
                Users.push(el)
            })
        })
    })

    setTimeout(()=>console.log(Users), 1000)
    const divUsers = document.querySelector("#users")
    divUsers.innerHTML = "OLA"
     */



    async function getUsers() {
        try {
            let res = await fetch("http://localhost:3000/user");
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function renderUsers() {
        let users = await getUsers();
        return users
    }
    async function renderizarTela() {

        const dados = await renderUsers();

        const divUsers = document.querySelector("#users")
        console.log(dados.data)

        dados.data.map(el => {
            const divUs = document.createElement('div')

            const divUserId = document.createElement('div')
            divUserId.innerHTML = el._id

            const divUserName = document.createElement('div')
            divUserName.innerHTML = el.name

            const divUserEmail = document.createElement('div')
            divUserEmail.innerHTML = el.email
            divUserEmail.style.marginBottom = "10px"

            const botaoDeletar = document.createElement('button')
            botaoDeletar.innerHTML = "Deletar"

            const botaoEditar = document.createElement('button')
            botaoEditar.innerHTML = "Editar"

            const botaoUpdate = document.createElement('button')
            botaoUpdate.innerHTML = "Update"

            botaoDeletar.onclick = () => {
                alert(`O usuario: \n com nome : ${el.name} \n com email: ${el.email} \n com id: ${el._id} \n foi deletado`)
                divUsers.removeChild(divUs)
                
            }

            ////////////////////////////////
            divUs.appendChild(divUserId)
            divUs.appendChild(divUserName)
            divUs.appendChild(divUserEmail)
            //// Append Buttons
            divUs.appendChild(botaoDeletar)
            divUs.appendChild(botaoEditar)
            divUs.appendChild(botaoUpdate)

            divUsers.appendChild(divUs)
        })
    }
    renderizarTela()

}