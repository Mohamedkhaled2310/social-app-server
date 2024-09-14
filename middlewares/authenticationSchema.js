const Joi=require('joi');
const appError=require('../utils/AppError');

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required() 
   });

const signupSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required() 
});

const signUpValidation=(req,res,next) => {
const {error}=signupSchema.validate(req.body);
if(error)
    return next(appError.create(error.message,400));
    next();
};
const loginValidation=(req,res,next) => {
const {error}=loginSchema.validate(req.body);
if(error)
    return next(appError.create(error.message,400));
    next();
};
module.exports={signUpValidation,loginValidation}