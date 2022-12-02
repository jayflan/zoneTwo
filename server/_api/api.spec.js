const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { db, models: { User, Workout } } = require("../_db");

let userId;
let userWorkouts;

describe("API Routes", () => {
  describe("/api/users", () => {
    
    it("GET /api/users", async() => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

        userId = res.body[0].id

        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
    } );
    it("GET /api/workouts", async() => {
      const res = await request(app)
        .get('/api/workouts')
        .expect(200)
        
        userWorkouts = res.body.filter((workout) => workout.userId === userId ? workout : "" );
        
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(1);
    });
    it("GET /api/workouts/user/id", async() => {
      const singleUserWorkout = userWorkouts[0].id;
      const res = await request(app)
        .get(`/api/workouts/user/${singleUserWorkout}`)
        .expect(200)

        const workoutId = res.body.id

        expect(workoutId).to.be.ok;
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