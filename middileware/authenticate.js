const User = require("../model/userSchema");
var jwt = require("jsonwebtoken");
const authenticate = async (req, res, next)=> {
  try {
    const jwtoken = await req.cookies.jwtoken;
    const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = User.findOne({
      _id: verifytoken._id,
      "tokens.token": token,
    })
    if (!rootuser) {
      throw new Error("user not found")
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next()
  }catch(e) {
    console.log(e)}
}
module.exports = authenticate;