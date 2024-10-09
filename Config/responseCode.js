module.exports = {
  returnCode: {
    exists: {
      code: 400,
      message: 'User already exists and is active.',
    },
    accountSuspended: {
      code: 403,
      message: 'User account is suspended.',
    },
    duplicate: {
      code: 409,
      message: 'User already exists.',
    },
    success: {
      code: 201,
      message: 'User created successfully.',
    },
    validSession: {
      code: 109,
      message: 'Valid session, user is already logged in.'
    },
    errror: {
      code: 600,
      message: 'Error occurred.'
    },
    validationError: {
      code: 400,
      message: 'Validation error.'
    },
    userNotFound: {
      code: 404,
      message: 'User not found.'
    },
    serverError: {
      code: 500,
      message: 'Server error.',

    },
    expiredOTP: {
      code: 401,
      message: 'Invalid or expired OTP',
      
    },
    verified: {
      code: 200,
      message: 'OTP verified successfully',
    },
    verifyingOTP: {
      code: 500,
      message: 'Error verifying OTP',
    },
    updateUser:{
      code: 200,
      message: 'User updated successfully',
    },
    deactivated:{
      code: 200,
      message: 'User deactivated successfully',
    }
  },
};
