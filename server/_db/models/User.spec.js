const { expect } = require("chai");
const { db, models: { User } } = require('../../_db');
const seed = require('../../../script/seed');

describe('User Model', ()=> {
  let users;
  beforeEach(async() =>{
    users = (await seed()).users;
  });

  
  // const userToken = User.generateToken();


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
        const userEmail = users[0].email;
        const userPassword = users[0].password;
        const userAuthToken = User.authenticate({ email: userEmail, password: userPassword});
        expect(userAuthToken).to.be.ok;
      });
      it("User located via JWT token", async()=> {
        const userToken = users[0].generateToken();
        const userVerified = await User.findByToken(userToken);
        expect(userVerified.email).to.equal(users[0].email);
      });
    });
  });

});

