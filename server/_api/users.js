const router = require("express").Router();
const User = require("../_db/models/User");
module.exports = router;

/* DB Model Routes */

//GET all users
router.get("/", async(req, res, next) => {
  try{
    const users = await User.findAll({
      attributes: ["id", "email"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  };
});
