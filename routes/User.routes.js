const express = require('express');
const router = express.Router();
const UserController = require ('../controller/UserController')
const authenticate= require('../Middleware/authenticate')

router.post('/registerUser', UserController.registerUser);
router.post('/mobileNoLogin', UserController.Login);
router.post('/verifyOtp', UserController.verifyOtp);
router.post('/updateUser', UserController.updateUser);
router.post('/deleteUser', UserController.LogoutUser);
router.get('/logged-in-users', UserController.getAllLoggedInUsers);
// router.delete('/delete', UserController.deleteUser);


module.exports = router;
