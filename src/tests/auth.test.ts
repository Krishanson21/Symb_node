import request from "supertest"
import app from "../app"
import mongoose from "mongoose"

describe("Auth API", () => {

  it("should register a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test324",
        email: "test78687@gmail.com",
        password: "123456"
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("user")
  })

  it("should login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test78687@gmail.com",
        password: "123456"
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("token")
  })

})
afterAll(async () => {
  await mongoose.connection.close()
})