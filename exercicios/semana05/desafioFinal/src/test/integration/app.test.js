const app = require('../../app')
const request = require('supertest')
const agent = request.agent(app)
const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb')
const { connectDb } = require('../../database/connect')

const id = new ObjectId()
const randomTitle = faker.lorem.paragraph(1)
const randomBody = faker.lorem.paragraph(3)
const NewRandomTitle = faker.lorem.paragraph(1)
const NewRandomBody = faker.lorem.paragraph(3)
var createdId = String(id)

beforeEach(async () => {
    const { collection } = await connectDb('postagens', 'allPostagens')
    const { insertedId } = await collection.insertOne({ title: randomTitle, body: randomBody })
    createdId = String(insertedId)
});

afterEach(async () => {
    const { collection } = await connectDb('postagens', 'allPostagens')
    await collection.deleteMany({})
});

test('Request Get - /post  expected status to be 200 - Get all with data', async () => {
    const result = await agent.get('/post')
    expect(result.statusCode).toBe(200)
    expect(true).toBe(Array.isArray(result.body))
    expect(result.body.length).toBe(1)
    expect(result.body).toEqual([{ _id: createdId, title: randomTitle, body: randomBody }])
})

test('Request Get - /post  expected status to be 404 - Get all without data', async () => {
    const { collection } = await connectDb('postagens', 'allPostagens')
    await collection.deleteMany({})
    const result = await agent.get('/post')
    expect(result.statusCode).toBe(404)
    expect(true).toBe(Array.isArray(result.body))
    expect(result.body.length).toBe(1)
    expect(result.body).toEqual([{ messageError: 'Não há postagens' }])
})

test('Request Get - /post  expected status to be 400 - With invalid param', async () => {
    const result = await agent.get('/post/a')
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

test('Request Get - /post  expected status to be 200 - With a valid value', async () => {
    const result = await agent.get(`/post/${createdId}`)
    expect(result.statusCode).toBe(200)
    expect(true).toBe(Array.isArray([result.body]))
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ _id: createdId, title: randomTitle, body: randomBody })
    
})

test('Request Post - /post  expected status to be 200 - Sending data', async () => {
    const { collection } = await connectDb('postagens', 'allPostagens')
    await collection.deleteMany({})
    const result = await agent.post('/post').send({ title: randomTitle, body: randomBody })
    expect(result.statusCode).toBe(201)
    expect(true).toBe(Array.isArray([result.body]))
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ _id: result._body._id, title: randomTitle, body: randomBody })
})

test('Request Post - /post  expected status to be 400 - Sending no data', async () => {
    const result = await agent.post('/post').send({})
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(2)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'title', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'body', location: 'body' }
    ])
})


test('Request Post - /post  expected status to be 400 - Invalid Inputs 2/2', async () => {
    const result = await agent.post('/post').send({ title: "", body: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(2)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'title', location: 'body' },
        { value: '', msg: 'Invalid value', param: 'body', location: 'body' }
    ])
})

test('Request Post - /post  expected status to be 400 - Invalid Inputs 1/2 title', async () => {
    const result = await agent.post('/post').send({ title: "", body: randomBody })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'title', location: 'body' }
    ])
})

test('Request Post - /post  expected status to be 400 - Invalid Inputs 1/2 body', async () => {
    const result = await agent.post('/post').send({ title: NewRandomTitle, body: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'body', location: 'body' }
    ])
})

test('Request Put - /post  expected status 200 - Update with valid data and Id', async () => {
    const result = await agent.put(`/post/${createdId}`).send({ title: NewRandomTitle, body: NewRandomBody })
    expect(result.statusCode).toBe(201)
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ id: createdId, title: NewRandomTitle, body: NewRandomBody })
})

test('Request Put - /post  expected status 404 - Update with valid data and invalid Id', async () => {
    const result = await agent.put(`/post/625f19c62e2ffba424d912da`).send({ title: NewRandomTitle, body: NewRandomBody })
    expect(result.statusCode).toBe(404)
    expect(result.body.messageError.length).toBe(22)
    expect(result.body).toEqual({ messageError: "Notícia não encontrada" })
})

test('Request Put - /post  expected status 400 - Update with invalid data (1/2 title = "") and valid Id', async () => {
    const result = await agent.put(`/post/${createdId}`).send({ title: "", body: NewRandomBody })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([{ value: '', msg: 'Invalid value', param: 'title', location: 'body' }])
})

/* test('Request Put - /user  expected status 400 - Update with invalid data (1/2 name = 7355608) and valid Id', async () => {
    const result = await agent.put(`/user/${createdId}`).send({ name: "7355608", email: NewRandomEmail })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([{ value: '7355608', msg: 'Invalid value', param: 'name', location: 'body' }])
}) */

test('Request Put - /post  expected status 400 - Update with invalid data (1/2 body = "") and valid Id', async () => {
    const result = await agent.put(`/post/${createdId}`).send({ title: NewRandomTitle, body: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(1)
    expect(result.body.messageError).toEqual([
        {value: '', msg: 'Invalid value', param: 'body', location: 'body'}
    ])
})

test('Request Put - /post  expected status 400 - Update with invalid data (2/2) and valid Id', async () => {
    const result = await agent.put(`/post/${createdId}`).send({ title: "", body: "" })
    expect(result.statusCode).toBe(400)
    expect(result.body.messageError.length).toBe(2)
    expect(result.body.messageError).toEqual([
        { value: '', msg: 'Invalid value', param: 'title', location: 'body'},
        {value: '', msg: 'Invalid value', param: 'body', location: 'body'},
    ])
})

test('Request Put - /post  expected status 200 - Delete with valid ID', async () => {
    const result = await agent.delete(`/post/${createdId}`)
    expect(result.statusCode).toBe(200)
    expect([result.body].length).toBe(1)
    expect(result.body).toEqual({ _id: createdId, title: randomTitle, body: randomBody })
})

test('Request Delete - /post  expected status 404 - Delete with invalid ID', async () => {
    const result = await agent.delete(`/post/625f19c62e2ffba424d912da`)
    expect(result.statusCode).toBe(404)
    expect(result.body.messageError.length).toBe(22)
    expect(result.body).toEqual({ messageError: "Notícia não encontrada" })
})

