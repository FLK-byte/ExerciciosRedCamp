const app = require('../../app')
const request = require('supertest')
const agent = request.agent(app)
const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb')
const { connectDb } = require('../../database/connect')

const id = new ObjectId()
const randomName = faker.name.findName();
const randomEmail = faker.internet.email();
const NewRandomName = faker.name.findName();
const NewRandomEmail = faker.internet.email();
var createdId = String(id)

beforeEach(async () => {
    const collection = await connectDb('usuarios', 'users')
    const { insertedId } = await collection.insertOne({ name: randomName, email: randomEmail })
    createdId = String(insertedId)
});

afterEach(async () => {
    const collection = await connectDb('usuarios', 'users')
    await collection.deleteMany({})
});

test('Request Get - /user  expected status to be 200 - Get all with data', async () => {
    const result = await agent.get('/user')
    expect(result.statusCode).toBe(200)
    expect(true).toBe(Array.isArray(result.body))
    expect(result.body.length).toBe(1)
    expect(result.body).toEqual([{ _id: createdId, name: randomName, email: randomEmail }])
})

test('Request Get - /user  expected status to be 404 - Get all without data', async () => {
    const collection = await connectDb('usuarios', 'users')
    await collection.deleteMany({})
    const result = await agent.get('/user')
    expect(result.statusCode).toBe(404)
    expect(true).toBe(Array.isArray(result.body))
    expect(result.body.length).toBe(1)
    expect(result.body).toEqual([{ messageError: 'Não há usuarios' }])
})

test('Request Get - /user  expected status to be 400 - With invalid param', async () => {
    const result = await agent.get('/user/a')
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        {
            value: 'a',
            msg: 'Invalid value',
            param: 'id',
            location: 'params'
        }
    ])
})

test('Request Get - /user  expected status to be 200 - With a valid value', async () => {
    const result = await agent.get(`/user/${createdId}`)
    expect(result.statusCode).toBe(200)
    expect(true).toBe(Array.isArray([result.body]))
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ _id: createdId, name: randomName, email: randomEmail })
})

test('Request Post - /user  expected status to be 200 - Sending data', async () => {
    const collection = await connectDb('usuarios', 'users')
    await collection.deleteMany({})
    const result = await agent.post('/user').send({ name: randomName, email: randomEmail })
    expect(result.statusCode).toBe(201)
    expect(true).toBe(Array.isArray([result.body]))
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ id: result.body.id, name: randomName, email: randomEmail })
})

test('Request Post - /user  expected status to be 400 - Sending no data', async () => {
    const result = await agent.post('/user').send({})
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(3)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'name', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' }
    ])
})

test('Request Post - /user  expected status to be 400 - Invalid Email', async () => {
    const result = await agent.post('/user').send({ name: randomName, email: "emailInvalido" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        { value: "emailInvalido", msg: 'Invalid value', param: 'email', location: 'body' }
    ])
})

test('Request Post - /user  expected status to be 400 - Invalid Inputs 2/2', async () => {
    const result = await agent.post('/user').send({ name: "", email: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(3)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'name', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' }
    ])
})

test('Request Post - /user  expected status to be 400 - Invalid Inputs 1/2 name', async () => {
    const result = await agent.post('/user').send({ name: "", email: randomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'name', location: 'body' }
    ])
})

test('Request Post - /user  expected status to be 400 - Invalid Inputs 1/2 email', async () => {
    const result = await agent.post('/user').send({ name: randomName, email: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(2)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' }
    ])
})

test('Request Post - /user  expected status 400 - DuplicatedEmail', async () => {
    const result = await agent.post('/user').send({ name: randomName, email: randomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(18)
    expect(result.body).toEqual({ messageError: 'Cadastro duplicado' })
})

test('Request Put - /user  expected status 200 - Update with valid data and Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: NewRandomName, email: NewRandomEmail })
    expect(result.statusCode).toBe(201)
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ name: NewRandomName, email: NewRandomEmail })
})

test('Request Put - /user  expected status 404 - Update with valid data and invalid Id', async () => {
    const result = await agent.put(`/user/625f19c62e2ffba424d912da`).send({ name: NewRandomName, email: NewRandomEmail })
    expect(result.statusCode).toBe(404)
    expect(result.body.messageError.length).toBe(22)
    expect(result.body).toEqual({ messageError: "Usuario não encontrado" })
})

test('Request Put - /user  expected status 400 - Update with invalid data (1/2 name = "") and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: "", email: NewRandomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([{ value: '', msg: 'Invalid value', param: 'name', location: 'body' }])
})

/* test('Request Put - /user  expected status 400 - Update with invalid data (1/2 name = 7355608) and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: "7355608", email: NewRandomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([{ value: '7355608', msg: 'Invalid value', param: 'name', location: 'body' }])
}) */

test('Request Put - /user  expected status 400 - Update with invalid data (1/2 email = "") and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: NewRandomName, email: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(2)
    expect(result.body.messageError).toEqual([
        {value: '', msg: 'Invalid value', param: 'email', location: 'body'},
        { value: '', msg: 'Invalid value', param: 'email', location: 'body' }])
})

test('Request Put - /user  expected status 400 - Update with invalid data (1/2 email = "dasdas") and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: NewRandomName, email: "dasdas" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([{value: 'dasdas', msg: 'Invalid value', param: 'email', location: 'body'}])
})

test('Request Put - /user  expected status 400 - Update with invalid data (1/2 email duplicated) and valid Id', async () => {
    await agent.post(`/user`).send({ name: NewRandomName, email: NewRandomEmail })
    const result = await agent.put(`/user/${createdId}`).send({ name: "Jorgin", email: NewRandomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(18)
    expect(result.body.messageError).toEqual("Cadastro duplicado")
})

test('Request Put - /user  expected status 400 - Update with invalid data (2/2) and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: "", email: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(3)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'name', location: 'body'},
        {value: '', msg: 'Invalid value', param: 'email', location: 'body'},
        {value: '', msg: 'Invalid value', param: 'email', location: 'body'}
    ])
})

test('Request Put - /user  expected status 200 - Delete with valid ID', async () => {
    const result = await agent.delete(`/user/${createdId}`)
    expect(result.statusCode).toBe(200)
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ _id: createdId, name: randomName, email: randomEmail })
})

test('Request Delete - /user  expected status 404 - Delete with invalid ID', async () => {
    const result = await agent.delete(`/user/625f19c62e2ffba424d912da`)
    expect(result.statusCode).toBe(404)
    expect(result.body.messageError.length).toBe(22)
    expect(result.body).toEqual({ messageError: "Usuario não encontrado" })
})