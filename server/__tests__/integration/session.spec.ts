import request from "supertest";
import mongoose from "mongoose";

import app from "../../src/app";
import User from "../../src/models/User";

describe("Check the process in a authentication", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const newUser = await User.create({
      email: "admin@mail.com",
      password: "1234qwer",
    });
    expect(newUser).not.toBeFalsy();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should be FAIL to authenticate a user, because email not found", async () => {
    const response = await request(app).post("/sessions").send({
      email: "fakeadmin@mail.com",
      password: "1234qwer",
    });

    expect(response.status).toBe(404);
  });

  it("should be FAIL to authenticate a user, because password is incorrect", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "qwer1234",
    });

    expect(response.status).toBe(401);
  });

  it("should be authenticate a user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "1234qwer",
    });

    expect(response.status).toBe(200);
  });
});