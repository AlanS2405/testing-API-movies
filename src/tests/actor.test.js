const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
let actorId

beforeAll(async () => {
    return await Actor.bulkCreate([
        {
            firstName: "Daniel",
            lastName: "Radcliffe",
            nationality: "England",
            image: "https://una-foto.jpg",
            birthday: "07-23-1989"
        },
        {
            firstName: "Emma",
            lastName: "Wattson",
            nationality: "England",
            image: "https://una-foto.jpg",
            birthday: "04-15-1990"
        },
    ])
})

const actor = {
    firstName: "Robert",
    lastName: "Downey Jr",
    nationality: "USA",
    image: "https://media.gq.com.mx/photos/5ffa22129274cd36fe35681a/master/w_3000,h_2027,c_limit/robert-downey-jr-star-wars.jpg",
    birthday: "04-04-1965"
}

test("GET -> '/api/v1/actors', should return status code 200, body is defined and res.body.length === 2", async () => {
    const res = await request(app)
    .get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});


test("POST -> '/api/v1/actors', should return status code 201, body is defined, and res.body.firstName === actor.firstName ", async () => {
    const res = await request(app)
    .post('/api/v1/actors')
    .send(actor)
    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


test("GET -> '/api/v1/actors/:id', should return status code 200, body is defined, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
    .get(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});


test("PUT -> '/api/v1/actors/:id', should return status code 200, body is defined and res.body.firstName === actorUpdate.firstName", async () => {
    const actorUpdate = {
        firstName: "Rupert",
        lastName: "Grint",
    }

    const res = await request(app)
    .put(`/api/v1/actors/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
    expect(res.body.lastName).toBe(actorUpdate.lastName)
})


test("DELETE -> '/api/v1/actors/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(204)
})