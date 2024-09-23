const jwt=require('jsonwebtoken');
const httphandler=require('../utils/httpStatusText');
const appError=require('../utils/AppError');

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization']||req.headers['authorization'];
    if(!authHeader)
    {
     const error = appError.create('authorization token is required', 401, httphandler.ERROR);
     return next(error);
    }
    const token=authHeader.split(' ')[1];
  try{
  jwt.verify(token,process.env.JWT_SECRET_KEY)
    next();

  }
  catch(err)
  {
    const error = appError.create('invalid token', 401, httphandler.ERROR);
    return next(error);
  }
}
module.exports=verifyToken; 