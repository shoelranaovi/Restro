const express = require('express');
const { register, login, logout, refreshToken, forgotPassword, resetPassword, verifyEmail, getMe, updateProfile, changePassword, resetPasswordLinkverify, checkUser, resendVerificationEmail } = require('../controller/auth.controller');
const { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator, resendEmailValidation } = require('../utils/validator/authValidator');
const verifyUser = require('../middleware/verifyuser');
const { googleAuth, googleCallback, facebookAuth, facebookCallback, googleOnTab } = require('../controller/SocialAuth');
const router = express.Router();



router.post('/register',registerValidator, register);
router.post('/resendVerificationMail',resendEmailValidation, resendVerificationEmail);
router.post('/login',loginValidator, login);
router.get('/logout',verifyUser, logout);
router.get('/checkuser',verifyUser, checkUser);
router.post('/refresh-token', refreshToken);
router.post('/forget-password',forgotPasswordValidator, forgotPassword);
router.get('/reset-password-link/:resettoken', resetPasswordLinkverify);
router.post('/reset-password',resetPasswordValidator, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.get('/me',verifyUser, getMe);
router.put('/me',verifyUser, updateProfile);
router.put('/change-password',verifyUser, changePassword);

// OAuth Routes - Google
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.post('/google/one-tap', googleOnTab);

// OAuth Routes - Facebook
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);

// Social Account Management Routes
// router.post('/link/google', protect, linkAccountValidation, linkGoogleAccount);
// router.post('/link/facebook', protect, link



module.exports = router;