const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendOtpEmail } = require("../utils/emailService");
const { sendSuccess, sendError } = require("../utils/UtilController");
const responseCode = require("../Config/responseCode").returnCode;

const JWT_SECRET = "fasdkljio234jkohvsdjk";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, mobileNo, emailVerified, email } = req.body;

    if (!username || !password || !mobileNo || !email) {
      return sendError(req, res, null, responseCode.validationError.message);
    }

    const newUser = new User({
      username,
      password,
      mobileNo,
      emailVerified,
      email,
    });

    await newUser.save();
    sendSuccess(req, res, null, { message: "User registered successfully!" });
  } catch (error) {
    sendError(
      req,
      res,
      null,
      error.message || responseCode.serverError.message
    );
  }
};

exports.Login = async (req, res) => {
  try {
    const { mobileNo } = req.body;
    const user = await User.findOne({ mobileNo });

    if (!user) {
      return sendError(req, res, null, responseCode.userNotFound);
    }
    
    // if (user.status === "inactive") {
    //   return sendError(req, res, null, { message: "User account is inactive. Please contact support." });
    // }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiration = Date.now() + 15 * 60 * 1000; // 15 minut
    await user.save();

    await sendOtpEmail(user.email, otp);
    sendSuccess(req, res, null, { message: "OTP sent to email" });
  } catch (error) {
    sendError(req, res, null, error.message || responseCode.serverError);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobileNo, otp } = req.body;
    console.log(!!!!!!!!!!!!"req.body", req.body);
    // Find the user by mobile number
    const user = await User.findOne({ mobileNo });
    console.log(User, mobileNo);

    // Check if the user exists and if the OTP is valid
    if (!user || user.otp !== otp || Date.now() > user.otpExpiration) {
      return sendError(req, res, null, responseCode.expiredOTP.message);
    }

    // OTP is valid; clear the OTP and its expiration
    user.otp = null;
    user.otpExpiration = null;
    user.lastLogin = Date.now();
    user.loginHistory.push({ loginDate: new Date() });
    await user.save();
    console.log("user", user.save());
 
    return sendSuccess(req, res, null, responseCode.verified.message);
  } catch (error) {
    console.error(error);

    sendError(
      req,
      res,
      null,
      error.message || responseCode.verifyingOTP.message
    );
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { userId, mobileNo, password } = req.body;
    const updates = {};
    if (!userId) {
      return sendError(req, res, null, responseCode.validationError.message);
    }
    if (mobileNo) updates.mobileNo = mobileNo;
    if (password) updates.password = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return sendError(req, res, null, responseCode.userNotFound.message);
    }
    sendSuccess(req, res, null, responseCode.updateUser.message, {
      user: updatedUser,
    });
  } catch (error) {
    sendError(req, res, null, responseCode.serverError.message);
  }
};

exports.LogoutUser = async (req, res) => {
  try {
    const { userId } = req.body;

    
    if (!userId) {
      return sendError(req, res, null, responseCode.validationError);
    }

    // Find the user and update the status to 'inactive'
    const user = await User.findByIdAndUpdate(userId, { status: "inactive" });

    
    if (!user) {
      return sendError(req, res, null, responseCode.userNotFound);
    }


    sendSuccess(req, res, null, responseCode.deactivated);
  } catch (error) {

    sendError(req, res, null, responseCode.serverError);
  }
};


exports.getAllLoggedInUsers = async (req, res) => {
  try {
      const users = await User.find({ 'loginHistory.0': { $exists: true } }, 'mobileNo loginHistory lastLogin');///least one entry
      
      return res.status(200).json({ message: 'List of users who have logged in', users });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving logged-in users' });
  }
};

// exports.deleteUser = async (req, res, next) => {
//   try {
//       const userId = req.body.userId;
//       if (!userId) {
//           return sendError(req, res, next, { message: "User ID is required." });
//       }
//       await User.findByIdAndUpdate(userId, {
//           status: 'inactive', 
//           $push: {
//               logs: {
//                   userId: userId,
//                   data: {
//                       action: "User deleted",
//                       timestamp: new Date(), 
//                   },
//               },
//           },
//       });
//       sendSuccess(req, res, next, {
//           message: "User deleted successfully.",
//       });
//   } catch (err) {
      
//       sendError(req, res, next, { message: err.message || "An error occurred while deleting the user." });
//   }
// }