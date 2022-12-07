const { expect } = require("chai");
const { db, models: { User } } = require('..');
const  seed = require("../../../script/seed");


describe('Test Db', ()=> {
  
  let testSeed;
  let bikes;
  let users;
  let workouts;
  
  before(async() => {
    testSeed = await seed();
    bikes = testSeed.bikes;
    users = testSeed.users;
    workouts = testSeed.workouts;
  })

  describe('Seed Test Db', ()=> {    
    it("Seeding Successful?", async()=> {
      expect(testSeed).to.be.an('object')
    });
  })
  
  describe('Bike Model', ()=> {
    describe("Bike Data Layer", ()=> {
      describe("Bike Check", ()=> {
        it("There are 2 bikes", async()=> {
          expect(bikes.length).to.equal(2);
        });
        it("First record has a bike", async()=> {
          expect(bikes[0].name).to.be.ok;
        });
        it("First record has a user", async()=> {
          expect(bikes[0].userId).to.be.ok;
        });
      }); 
    });  
  });

  describe("User Data Layer", ()=> {
    describe("User Check", ()=> {
      it("There are 2 users", async()=>{
        expect(users.length).to.equal(2);
      });
      it("First user has email", async()=>{
        expect(users[0].email).to.be.ok;
      });
      it("First user has password", async()=>{
        expect(users[0].password).to.be.ok;
      });
    });
  });

  describe("User Authentication", ()=> {
    describe("User Token Creation", async()=> {
      it("JWT token generated?", async()=> {
        const userToken = users[0].generateToken(); 
        expect(userToken).to.be.ok;
      });
      it("User authenticated via JWT token", async()=> {
        //using first created user from seed.js
        const userEmail = 'cody@gmail.com';
        const userPassword = 'cody123';
        const userAuthToken = User.authenticate({ email: userEmail, password: userPassword});
        expect(await userAuthToken).to.be.ok;
      });
      it("User located via JWT token", async()=> {
        const userToken = users[0].generateToken();
        const userVerified = await User.findByToken(userToken);
        expect(userVerified.email).to.equal(users[0].email);
      });
    });
  });

  describe('Workout Data Layer', ()=> {
    describe('Workout Check', ()=> {
      it('There are 2 workouts', async()=> {
        expect(workouts.length).to.be.greaterThan(1);
      });
      it('First workout has name', async()=> {
        expect(workouts[0].name).to.be.ok;
      });
      it('First workout has description', async()=> {
        expect(workouts[0].description).to.be.ok;
      });
      it('First workout has data uploaded', async()=> {
        expect(workouts[0].data).to.be.ok;
      });
      it('First workout to have user', async()=> {
        expect(workouts[0].userId).to.be.ok;
      });
      it('First workout has distance field', async()=> {
        expect(workouts[0].distance).to.be.greaterThan(-1);
      });
      it('First workout has elevation field', async()=> {
        expect(workouts[0].elevation).to.be.greaterThan(-1);
      });
      it('First workout has time field', async()=> {
        expect(workouts[0].time).to.be.ok;
      });
    });
  });

});

