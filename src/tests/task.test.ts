import request from "supertest"
import app from "../app"
import mongoose from "mongoose"

let token = ""

beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({
      email: "test78687@gmail.com",
      password: "123456"
    })

  token = res.body.token
})

describe("Task API", () => {

  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test2 Task",
        description: "Testing2",
        priority: "high"
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("_id")
  })

  it("should get tasks", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
  })

})
afterAll(async () => {
  await mongoose.connection.close()
})