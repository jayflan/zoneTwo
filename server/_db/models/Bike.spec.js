const { expect } = require("chai");
const { db, models: { Bike }} = require("../../_db");
const  seed = require("../../../script/seed");

describe('Bike Model', ()=> {
  let bikes;
  beforeEach(async() => {
    bikes = (await seed()).bikes;
  });

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