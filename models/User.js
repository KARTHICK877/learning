const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  mobileNo: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Boolean, default: true },
  status: { type: String, default: 'active' },
  lastLogin: { type: Date, default: Date.now },  
  loginHistory: [
    {
        loginDate: {
            type: Date,
            default: Date.now,
        },
    },
], 
  otp: { type: String },
  otpExpiration: { type: Date },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
