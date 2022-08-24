const { expect } = require("chai");
const { db, models: { User } } = require('../../_db');
const seed = require('../../../script/seed');

describe('User Model', ()=> {
  let users;
  beforeEach(async() =>{
    users = (await seed()).users;
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

});

