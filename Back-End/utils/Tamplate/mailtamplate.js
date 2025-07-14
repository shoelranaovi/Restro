const createAccountHTML = (name, verificationLink, verificationCode) =>   
  `<div style="max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(251, 146, 60, 0.3);">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ea580c; font-size: 32px; font-weight: bold; margin: 0; font-family: 'Arial', sans-serif;">🍽️ Restro</h1>
      </div>
      <p style="font-size: 18px; margin-bottom: 20px; text-align: center; color: #4b5563; font-weight: bold;">Welcome to Restro, ${name}!</p>
      <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #4b5563;">Thank you for creating an account with us. Please click the button below to verify your email address and activate your account:</p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="${verificationLink}" style="background-color: #ea580c; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; transition: background-color 0.3s ease;">Verify Email Address</a>
      </div>
      <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">Please note that the device you are using for this verification process will be set as your primary device.</p>
      <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #6b7280;">The verification link will expire in 30 minutes.</p>
      <p style="font-size: 16px; margin-bottom: 15px; text-align: center; color: #ea580c; font-weight: bold;">Your verification code is: <span style="color: #000000; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${verificationCode}</span></p>
      <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">If you did not create an account with Restro, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="font-size: 12px; text-align: center; color: #9ca3af;">© 2025 Restro. All rights reserved.</p>
    </div>
  </div>`;
  const createResetPasswordHTML = (name, resetLink, resetCode) => 
    `<div style="max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(251, 146, 60, 0.3);">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ea580c; font-size: 32px; font-weight: bold; margin: 0; font-family: 'Arial', sans-serif;">🍽️ Restro</h1>
        </div>
        <p style="font-size: 18px; margin-bottom: 20px; text-align: center; color: #4b5563; font-weight: bold;">Password Reset Request</p>
        <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #4b5563;">Hello ${name},</p>
        <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #4b5563;">We received a request to reset your password for your Restro account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${resetLink}" style="background-color: #ea580c; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; transition: background-color 0.3s ease;">Reset Password</a>
        </div>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">This reset link will create a new password for your account and will expire in 30 minutes for security reasons.</p>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #6b7280;">For your security, this password reset link will expire in 30 minutes.</p>
        <p style="font-size: 16px; margin-bottom: 15px; text-align: center; color: #ea580c; font-weight: bold;">Your password reset code is: <span style="color: #000000; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${resetCode}</span></p>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">If you did not request a password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; text-align: center; color: #9ca3af;">© 2025 Restro. All rights reserved.</p>
      </div>
    </div>`;
const verifyLoginHTML = (
  name,
  verificationLink,
  blockLink,
  currentContextData,
  
) => `
      <div style="background-color: #F4F4F4; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
          <h1 style="color: black; font-size: 24px; margin-bottom: 20px;">New login attempt detected</h1>
          <p>Dear ${name},</p>
          <p>Our system has detected that a new login was attempted from the following device and location at ${currentContextData.time}:</p>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>IP Address:</strong> ${currentContextData.ip}</li>
            <li><strong>Location:</strong> ${currentContextData.city}, ${currentContextData.country}</li>
            <li><strong>Device:</strong> ${currentContextData.device} ${currentContextData.deviceType}</li>
            <li><strong>Browser:</strong> ${currentContextData.browser}</li>
            <li><strong>Operating System:</strong> ${currentContextData.os}</li>
            <li><strong>Platform:</strong> ${currentContextData.platform}</li>
          </ul>
          <p>If this was you, please click the button below to verify your login:</p>
          <div style="text-align: center;">
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #1da1f2; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px;">Verify Login</a>
          </div>
          <p>If you believe this was an unauthorized attempt, please click the button below to block this login:</p>
          <div style="text-align: center;">
            <a href="${blockLink}" style="display: inline-block; padding: 10px 20px; background-color: #E0245E; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px;">Block Login</a>
          </div>
          <p>Please verify that this login was authorized. If you have any questions or concerns, please contact our customer support team.</p>
        </div>
      </div>
    `;

const BookingConfirmation = (name, verificationLink, verificationCode) =>
  `
    <div style="max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgb(104, 182, 255);">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
        <img src="https://raw.githubusercontent.com/nz-m/SocialEcho/main/client/src/assets/SocialEcho.png" alt="SocialEcho Logo" style="display: block; margin: auto auto 20px;max-width: 50%;">
        <p style="font-size: 18px; margin-bottom: 20px; text-align: center; color: #4b5563; font-weight: bold;">Welcome to Restro, ${name}!</p>
        <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #4b5563;">Please click the button below to verify your email address and activate your account:</p>
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${verificationLink}" style="background-color: #3b82f6; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold;">Verify Email Address</a>
       </div>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">Please note that the device you are using for this verification process will be set as your primary device.</p>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #6b7280;">The link will expire in 30 minutes.</p>
        <p style="font-size: 16px; margin-bottom: 15px; text-align: center; color: #3b82f6; font-weight: bold;">Your verification code is: <span style="color: #000000;">${verificationCode}</span></p>
        <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">If you did not create an account, please ignore this email.</p>
       </div>
    </div>`;


module.exports = { createAccountHTML, verifyLoginHTML,BookingConfirmation,createResetPasswordHTML };
