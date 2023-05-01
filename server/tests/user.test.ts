import supertest from "supertest";
import { usersInDb } from "./test_helper";
import { Jwt } from "jsonwebtoken";
import app from "../app";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const api = supertest(app);

describe("when there is one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "testUser",
      name: "testName",
      password: "TESTPASSPORD",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("username already exist", async () => {
    const newUser = {
      username: "testUser",
      name: "testName",
      password: "TESTPASSPORD",
    };
    const userAtStart = await usersInDb();
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length);
  });

  test("username is shorter than 3 characters", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "Te",
      name: "name",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password must be at least 3 characters long");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("password is shorter than 3 characters", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "testName",
      name: "name",
      password: "pa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password must be at least 3 characters long");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
