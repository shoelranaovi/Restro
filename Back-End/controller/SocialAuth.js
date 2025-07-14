
const { OAuth2Client } = require('google-auth-library');
const passport = require("passport");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/user.model"); 


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// @desc    Initiate Google OAuth
// @route   GET /api/auth/google
// @access  Public
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }, 
    async (err, user) => {
      if (err) {
        console.error('Google OAuth error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_error`);
      }

      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_cancelled`);
      }

      try {
        // Generate tokens
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token
        user.refreshTokens = user.refreshTokens.filter(
          tokenObj => tokenObj.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        user.refreshTokens.push({ token: refreshToken });
        
        // Update metadata
        user.metadata.lastLoginIP = req.ip;
        user.metadata.userAgent = req.get('User-Agent');
        
        await user.save();

        // Set secure HTTP-only cookie
        const cookieOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        // Redirect to client with success and token
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${accessToken}&user=${encodeURIComponent(JSON.stringify({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          authProvider: user.authProvider
        }))}`;

        res.redirect(redirectUrl);
      } catch (error) {
        console.error('Token generation error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=token_error`);
      }
    }
  )(req, res, next);
}

// @desc    Initiate Facebook OAuth
// @route   GET /api/auth/facebook
// @access  Public

const facebookAuth = passport.authenticate('facebook', {
  scope: ['email']
});

const facebookCallback = async (req, res, next) => {
  passport.authenticate('facebook', { failureRedirect: '/login?error=facebook_auth_failed' }, 
    async (err, user) => {
      if (err) {
        console.error('Facebook OAuth error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_error`);
      }

      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_cancelled`);
      }

      try {
        // Generate tokens
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token
        user.refreshTokens = user.refreshTokens.filter(
          tokenObj => tokenObj.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        user.refreshTokens.push({ token: refreshToken });
        
        // Update metadata
        user.metadata.lastLoginIP = req.ip;
        user.metadata.userAgent = req.get('User-Agent');
        
        await user.save();

        // Set secure HTTP-only cookie
        const cookieOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        // Redirect to client with success and token
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${accessToken}&user=${encodeURIComponent(JSON.stringify({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          authProvider: user.authProvider
        }))}`;

        res.redirect(redirectUrl);
      } catch (error) {
        console.error('Token generation error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=token_error`);
      }
    }
  )(req, res, next);
}

const linkGoogleAccount =async (req, res, next) => {
  const { googleToken } = req.body;

  if (!googleToken) {
    return next(new ErrorResponse('Google token is required', 400));
  }

  try {
    // Verify Google token
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const googleEmail = payload.email;

    // Check if Google account is already linked to another user
    const existingUser = await User.findOne({
      'socialAuth.google.id': googleId,
      _id: { $ne: req.user.id }
    });

    if (existingUser) {
      return next(new ErrorResponse('Google account is already linked to another user', 400));
    }

    // Link Google account to current user
    const user = await User.findById(req.user.id);
    user.socialAuth.google = {
      id: googleId,
      email: googleEmail,
      verified: true
    };
    
    // Update auth provider
    if (user.authProvider === 'local') {
      user.authProvider = 'hybrid';
    }

    // Verify email if it matches
    if (user.email === googleEmail.toLowerCase()) {
      user.isEmailVerified = true;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Google account linked successfully',
      data: {
        user: {
          id: user._id,
          authProvider: user.authProvider,
          socialAuth: user.socialAuth
        }
      }
    });
  } catch (error) {
    return next(new ErrorResponse('Failed to verify Google token', 400));
  }
}

// @desc    Link Facebook account to existing user
// @route   POST /api/auth/link/facebook
// @access  Private
const linkFacebookAccount = async (req, res, next) => {
  const { facebookToken } = req.body;

  if (!facebookToken) {
    return next(new ErrorResponse('Facebook token is required', 400));
  }

  try {
    // Verify Facebook token
    const fetch = require('node-fetch');
    const response = await fetch(`https://graph.facebook.com/me?access_token=${facebookToken}&fields=id,email,name`);
    const facebookData = await response.json();

    if (facebookData.error) {
      return next(new ErrorResponse('Invalid Facebook token', 400));
    }

    const facebookId = facebookData.id;
    const facebookEmail = facebookData.email;

    // Check if Facebook account is already linked to another user
    const existingUser = await User.findOne({
      'socialAuth.facebook.id': facebookId,
      _id: { $ne: req.user.id }
    });

    if (existingUser) {
      return next(new ErrorResponse('Facebook account is already linked to another user', 400));
    }

    // Link Facebook account to current user
    const user = await User.findById(req.user.id);
    user.socialAuth.facebook = {
      id: facebookId,
      email: facebookEmail,
      verified: true
    };
    
    // Update auth provider
    if (user.authProvider === 'local') {
      user.authProvider = 'hybrid';
    }

    // Verify email if it matches
    if (facebookEmail && user.email === facebookEmail.toLowerCase()) {
      user.isEmailVerified = true;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Facebook account linked successfully',
      data: {
        user: {
          id: user._id,
          authProvider: user.authProvider,
          socialAuth: user.socialAuth
        }
      }
    });
  } catch (error) {
    return next(new ErrorResponse('Failed to verify Facebook token', 400));
  }
}

// @desc    Unlink social account
// @route   DELETE /api/auth/unlink/:provider
// @access  Private
const unlinkSocialAccount = async (req, res, next) => {
  const { provider } = req.params;

  if (!['google', 'facebook'].includes(provider)) {
    return next(new ErrorResponse('Invalid provider', 400));
  }

  const user = await User.findById(req.user.id);

  // Check if user has a password or another social account linked
  const hasPassword = user.password;
  const hasOtherSocial = provider === 'google' ? 
    user.socialAuth.facebook?.id : 
    user.socialAuth.google?.id;

  if (!hasPassword && !hasOtherSocial) {
    return next(new ErrorResponse(
      'Cannot unlink the only authentication method. Please set a password first or link another social account.',
      400
    ));
  }

  // Remove social auth data
  user.socialAuth[provider] = {
    id: undefined,
    email: undefined,
    verified: false
  };

  // Update auth provider
  if (user.authProvider === 'hybrid') {
    if (!hasOtherSocial) {
      user.authProvider = 'local';
    }
  } else if (user.authProvider === provider) {
    user.authProvider = hasOtherSocial ? 
      (provider === 'google' ? 'facebook' : 'google') : 
      'local';
  }

  await user.save();

  res.json({
    success: true,
    message: `${provider.charAt(0).toUpperCase() + provider.slice(1)} account unlinked successfully`,
    data: {
      user: {
        id: user._id,
        authProvider: user.authProvider,
        socialAuth: user.socialAuth
      }
    }
  });
}

// @desc    Get social auth status
// @route   GET /api/auth/social-status
// @access  Private
const getSocialAuthStatus = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: {
      authProvider: user.authProvider,
      hasPassword: !!user.password,
      socialAuth: {
        google: {
          linked: !!user.socialAuth.google?.id,
          email: user.socialAuth.google?.email,
          verified: user.socialAuth.google?.verified
        },
        facebook: {
          linked: !!user.socialAuth.facebook?.id,
          email: user.socialAuth.facebook?.email,
          verified: user.socialAuth.facebook?.verified
        }
      }
    }
  });
}


// Google One-tap Sign-in Route
const googleOnTab= async (req, res) => {
  try {
    const { credential } = req.body;
  
    
    
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();


    
    // Create a profile object similar to passport strategy
    const profile = {
      id: payload.sub,
      emails: [{ value: payload.email }],
      name: {
        givenName: payload.given_name,
        familyName: payload.family_name
      },
      displayName: payload.name,
      photos: [{ value: payload.picture }]
    };

    // Find or create user
    const user = await User.findOrCreateSocialUser(profile, 'google');
    
    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    
    // Store refresh token
    user.refreshTokens.push({
      token: refreshToken,
      createdAt: new Date()
    });
    await user.save();

    // Set secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
    
    res.cookie('refreshToken', refreshToken, cookieOptions);

    // Return user data
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      authProvider: user.authProvider
    };

    res.status(200).json({
      success: true,
      message: 'Google One-tap sign-in successful',
      user: userData,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Google One-tap error:', error);
    
    if (error.message.includes('Token used too early')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token timing'
      });
    }
    
    if (error.message.includes('Invalid token')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google token'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}


module.exports = {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  linkGoogleAccount,
  linkFacebookAccount,
  unlinkSocialAccount,
  getSocialAuthStatus,
  googleOnTab
};