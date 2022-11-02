const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeAll(async() => {
  const newUser = {
    username: 'radu',
    password: 'felix'
  }
  
  const testUser = await api.post('/api/users').send(newUser);
});

describe("Test related to signing in.", () => {
  test('user can sign in and token is received', async () => {
    let response = await api.post('/api/login').send({username: 'radu', password: 'felix'});
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('username');
  })
}) 