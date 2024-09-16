const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const appError = require('../../utils/AppError')
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = appError.create('uesr already exists', 400)
      return next(error)
    }

    const userCreated = new User({
      username,
      email,
      password
    });
    await userCreated.save();
    userCreated.password = undefined;

    // Generate token
    const token = jwt.sign({ id: userCreated._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token, user: userCreated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const login = async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email }).select('+password');

  if (!findUser) {
    return next(appError.create('Invalid credentials', 404));
  }

  const isMatch = await findUser.checkPassword(password);
  if (!isMatch) {
    return next(appError.create('Invalid credentials', 404));
  }
  findUser.password = undefined;

  res.status(200).json({
    email: findUser.email,
  })
};
module.exports = { signUp, login };
