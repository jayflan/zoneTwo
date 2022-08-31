const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("API Routes", () => {
  describe("/api/users", () => {
    
    it("GET /api/users", async() => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
    } );
    it("GET /api/workouts", async() => {
      const res = await request(app)
        .get('/api/workouts')
        .expect(200)

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
    });
    it("GET /api/bikes", async() => {
      const res = await request(app)
        .get('/api/bikes')
        .expect(200)

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
    });
  });
});