const request = require('supertest')
const app = require('../app')
const Genre = require('../models/Genre')
let genreId

beforeAll(async () => {
    return await Genre.bulkCreate([
        {
            name:"Superheroes"
        },
        {
            name:"Horror"
        },
    ])
})

const genre = {
    name: "Fantasy"
}

test("GET -> '/api/v1/genres', should return status code 200, body is defined and res.body.length === 2", async () => {
    const res = await request(app)
    .get('/api/v1/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});


test("POST -> '/api/v1/genres', should return status code 201, body is defined, and res.body.name === genre.name ", async () => {
    const res = await request(app)
    .post('/api/v1/genres')
    .send(genre)
    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})


test("GET -> '/api/v1/genres/:id', should return status code 200, body is defined, and res.body.name === genre.name", async () => {
    const res = await request(app)
    .get(`/api/v1/genres/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});


test("PUT -> '/api/v1/genres/:id', should return status code 200, body is defined and res.body.name === genreUpdate.name", async () => {
    const genreUpdate = {
        name: "Suspense"
    }

    const res = await request(app)
    .put(`/api/v1/genres/${genreId}`)
    .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
})


test("DELETE -> '/api/v1/genres/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`/api/v1/genres/${genreId}`)

    expect(res.status).toBe(204)
})