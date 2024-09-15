// user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  profilePicture: {
    type: String,
    default: 'default-profile-pic.jpg'
  },
  bio: {
    type: String,
    trim: true
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;