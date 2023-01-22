const router = require("express").Router();
const { models: { User } } = require("../_db");
const app = require("../app");
const { google } = require('googleapis');
require('dotenv').config();
const axios = require("axios");
const { decodeJWT, verifyJWT } = require('../_auth/googleOAuth');
const jws = require('jws');
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

//google OAuth to GET user access token

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

//create google content url for client to sign in with
router.get("/google/authurl", async (req, res, next) => {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];
    
    const url = oauth2Client.generateAuthUrl({
      access_type: 'online',
      scope: scopes
    });

    res.send(url);

  } catch(err) {
    res.status(401).send("OAuth Error");
  }
});

router.get("/google/callback", async (req, res, next) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    
    const idToken = tokens.id_token;
    const decodedIdToken = decodeJWT(idToken);
    //Todo verify JWT token before using email in token (JWS)
    
    const verify = async() => {
      try {
        const ticket = await oauth2Client.verifyIdToken({
          idToken: idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        }); 
        const payload = ticket.getPayload();
        console.log('payload-->',payload);
        // const userId = payload['sub'];
      } catch(err) {
        console.log(err);
      }
    }
    // console.log(verify().catch(console.error));
    console.log(verify());
    
    
    // const header = decodedIdToken.header
    // const signature = decodedIdToken.signature;
    // console.log(jws.verify(idToken, header.alg, header.kid))
    
    
    
    // const verifyToken = verifyJWT(decodedIdToken);
    // console.log(verifyToken);
    const userProfile = decodedIdToken.payload;
    const userEmail = userProfile.email;
    const authBody = { email: userEmail, password: "", oauth: true };
    const authUserToken = await User.authenticate(authBody);

    //revoke google token as we now have local JWT
    await axios.post(`https://oauth2.googleapis.com/revoke?token=${tokens.access_token}`,{
      headers: {
        'content-type': "application/x-www-form-urlencoded"
      }
    });

    //send JWT back to client and set token in localstorage
    
    let hrefUrl = ""; //<--check if using prod or dev for href link
    process.env.PORT ? hrefUrl = 'zoneTwo.onrender.com' : hrefUrl = 'localhost:3000';
    res.send(`
      <html>
        <head>
          <script>
            window.localStorage.setItem('token', '${authUserToken}')
            //!!: Will have to add 'https' if needed in future!!
            window.location.href = 'https://${hrefUrl}/dashboard'
          </script>
        </head>
      </html>
    `);    
    
  } catch(err) {
    console.log(err);
    res.status(401).send("Invalid Email/Token")
  }
});