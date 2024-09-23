const User = require("../../models/User");
const generateJWT = require("..//..//utils/generateJWT");
const appError = require('..//..//utils/AppError');
const httphandler = require("..//..//utils/httpStatusText");
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email }).select('-__v');

    if (existingUser) {
      const error = appError.create('uesr already exists', 400, httphandler.FAILURE);
      return next(error)
    }

    const userCreated = new User({
      username,
      email,
      password
    });


    const token = await generateJWT({ email: userCreated.email, id: userCreated._id });
    userCreated.token = token;
    await userCreated.save();
    userCreated.password = undefined;
    res.status(201).json({ status: httphandler.SUCCESS, Data: { user: userCreated } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const login = async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    return next(appError.create('Invalid credentials', 404));
  }

  const isMatch = await findUser.checkPassword(password);
  if (!isMatch) {
    return next(appError.create('Invalid credentials', 404));
  }
  findUser.password = undefined;
  const token = await generateJWT({ email: findUser.email, id: findUser._id })
  return res.json({ status: httphandler.SUCCESS, data: { email: findUser.email, token: token } });
};
module.exports = {
  signUp,
  login
};
