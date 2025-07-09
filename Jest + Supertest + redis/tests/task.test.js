const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "123456" });

        token = res.body.token;
    });

    test("Create task", async () => {
        const res = await request(app)
            .post("/api/task")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Finish Backend",
                description: "Livecode CRUD and testing",
            });

        expect(res.statusCode).toBe(201);
    });

    test("Get tasks", async () => {
        const res = await request(app)
            .get("/api/task")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
