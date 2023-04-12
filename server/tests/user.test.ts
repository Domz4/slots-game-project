import request from "supertest";
import app from "../app";
import User from "../models/User";
import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/config";

const testUser = {
    username: "jestUser",
    email: "jestUser@example.com",
    password: "jestUserPassword",
};

beforeAll(async () => {
    if (!MONGODB_URI) {
        throw new Error("Database error");
    }

    await mongoose.connect(MONGODB_URI);
});

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User Registration", () => {
    it("should register a new user successfully", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body.username).toEqual(testUser.username);
        expect(response.body.email).toEqual(testUser.email);
    });

    it("should fail if email is already registered", async () => {
        await request(app).post("/api/users/register").send(testUser);

        const response = await request(app)
            .post("/api/users/register")
            .send(testUser);

        expect(response.status).toBe(500);
        expect(response.body.error).toContain("E11000");
    });
});

describe("User Authentication", () => {
    beforeEach(async () => {
        await request(app).post("/api/users/register").send(testUser);
    });

    it("should log in successfully with correct credentials", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: testUser.email, password: testUser.password });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it("should fail to log in with an incorrect password", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: testUser.email, password: "wrongpassword" });

        expect(response.status).toBe(401);
        expect(response.body.error).toEqual("Invalid email or password");
    });

    it("should fail to log in with an unregistered email", async () => {
        const response = await request(app).post("/api/users/login").send({
            email: "unregistered@example.com",
            password: testUser.password,
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toEqual("Invalid email or password");
    });
});
