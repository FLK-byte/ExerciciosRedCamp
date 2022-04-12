const { integrationHttp } = require('../services/http')

const url = 'https://624df93353326d0cfe55cbf7.mockapi.io/users'


exports.getAllUsers = async () => {
    return integrationHttp(`${url}`, "GET")
}

exports.createOneUser = async ({name, email}) => {
    return integrationHttp(`${url}`, "POST", {name, email})
}

exports.getOneUser = async (id) => {
    return integrationHttp(`${url}/${id}`, "GET")
}

exports.putUser = async (id, {name, email}) =>{
    return integrationHttp(`${url}/${id}`, "PUT", {name, email})
}

exports.removeUser = async (id) => {
    return integrationHttp(`${url}/${id}`, "DELETE")
}
