const app = require('../../app')
const request = require('supertest')

const agent = request.agent(app)

test('Request Get - /user  expected status to be 200', async () => {
    const result = await agent.get('/user')
    expect(result.statusCode).toBe(200)
})

test('Request Get - /user  expected status to be 400', async () => {
    const result = await agent.get('/user/a')
    expect(result.statusCode).toBe(400)
})

test('Request Get - /user  expected status to be 200', async () => {
    const result = await agent.get('/user/62606e6453148b088a37d2c8')
    expect(result.statusCode).toBe(200)
})

test('Request Post - /user  expected status to be 400', async () => {
    const result = await agent.post('/user').send({})
    expect(result.statusCode).toBe(400)
})

test('Request Post - /user  expected status to be 400', async () => {
    const result = await agent.post('/user').send({name : "", email: "dfgdfagrgre"})
    expect(result.statusCode).toBe(400)
})

test('Request Post - /user  expected status to be 400', async () => {
    const result = await agent.post('/user').send({name : "", email: "lalal@gmail.com"})
    expect(result.statusCode).toBe(400)
})

test('Request Post - /user  expected status 400 to duplicatedEmail', async () => {
    const result = await agent.post('/user').send({name : "Jorginson", email: "Jorginson@gmail.com"})
    expect(result.statusCode).toBe(400)
})