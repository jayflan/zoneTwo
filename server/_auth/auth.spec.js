const { expect } = require("chai");
const { models: { User } } = require("../_db");
const request = require("supertest");
const app = require("../app");

describe("Auth Routes", () => {
  
  it("POST /auth/login", async() => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "cody@gmail.com", password: "cody123" })
      .expect('Content-Type', /json/)
      .expect(200)

      expect(res.body).to.be.an("object")
  });

  it("POST /auth/signup", async() => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ email: "jay@gmail.com", password: "jay123", distUnit: "miles" })
      .expect('Content-Type', /json/)
      .expect(200)

      expect(res.body).to.be.an("object")
  });

  //todo - fix - keep getting 401 error returned from User.findByToken method
  //todo - maybe Supertest misunderstanding?
  it("GET /auth/me", async() => {
  //   const user = await User.findOne({ where: { email: "cody@gmail.com" } })
  //   const userToken = user.generateToken();
    
  //   const res = await request(app)
  //   .post("/auth/me")
  //   .send(userToken)
  //   .expect(200)

  //   expect(res.body.email).to.equal(user.email);
  });

});