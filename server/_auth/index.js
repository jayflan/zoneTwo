const router = require("express").Router();
const { models: { User } } = require("../_db");
const app = require("../app");
module.exports = router;

//logout auth GET to pass logout method
router.get("/logout",(req, res) => {
  //todo logout() is for Passport, which you aren't using!!!
  //todo may only need logout via frontend? (destroy token)
  // req.logout();
  res.redirect("/");
});
//login auth POST to pass User authenticate method (generateJWT)
router.post("/login", async (req, res, next)=>{
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch(err) {
    res.status(401).send("Invalid Email/Password")
    next(err);
  };
});
//signup auth POST to create new user & generateJWT
router.post("/signup", async (req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch(err) {
    if(err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    };
  };
});
//user 'me' auth to GET user db data
router.get("/me", async (req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization); 
    const {id, email, distUnit } = user;
    res.send({id, email, distUnit});
  } catch(err) {
    next(err);
    //send error to auth for bad token detection
    res.send("error")
  }
});