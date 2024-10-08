const jwt = require("jsonwebtoken");

module.exports=async(payload)=>{
    
const token=await jwt.sign(payload,
    process.env.TOKEN_KEY,
    {expiresIn:'1h'});
return token;
}