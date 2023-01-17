const base64url = require('base64url');
const jws = require('jws');


module.exports = {

  decodeJWT: function  (token) {
    const segments = token.split('.');

    if (segments.length !== 3) {
      throw new Error ('Not enough or too many segments');
    }

    //All segments should be base64
    const headerSeg = segments[0];
    const payloadSeg = segments[1];
    const signatureSeg = segments[2];

    //base64 decode and parse JSON
    const header = JSON.parse(base64url.decode(headerSeg));
    const payload = JSON.parse(base64url.decode(payloadSeg));

    return {
      header: header,
      payload: payload,
      signature: signatureSeg
    }
  
  },

  verifyJWT: function (decodedToken) {

    const header = decodedToken.header;
    const signature = decodedToken.signature;
    const algo = header.alg;
    const key = header.kid;
    console.log(jws.verify(decodedToken,algo,key));
    // return jws.verify(signature,algo,key);

  } 

}