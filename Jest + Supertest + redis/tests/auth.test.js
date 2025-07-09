const request = require('supertest');
const app = require('../src/app');
describe('Auth API', () => {
    let token = "";
    test("register user", async () => {
        const res = await request(app).post('/api/user/register').send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
    });
    test("login user", async () => {
        const res = await request(app).post('/api/user/login').send({

            username: "testuser",
            email: "testuser@example.com",
            password: "password"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User logged in successfully");
        token = res.body.token;
    });
    test("get user profile", async () => {
        const res = await request(app).get('/api/user/profile').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User profile fetched successfully");
    });
});