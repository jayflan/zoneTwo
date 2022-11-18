const { expect } = require('chai');
const seed = require('../../../script/seed');
const { db, models: { Workout } } = require('../../_db');

describe('Workout Model', ()=> {
  let workouts;
  beforeEach(async() =>{
    workouts = (await seed()).workouts;
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
    });
  });

});