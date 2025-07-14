const transporter = require("../../confiq/nodemailer");
const Mailverify = require("../../model/mailverify.model");
const sendResponse = require("../response/sendResponse");
const {
  
  BookingConfirmation,
  createAccountHTML,
  createResetPasswordHTML,
} = require("../Tamplate/mailtamplate");
const generateJwtToken = require("../Token/generateToken");

const sendVerificationEmail = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `${process.env.SERVER_URL}/api/auth/verify?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Blogify" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "signup",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};
const sendVerificationEmailforMagiclinklogIn = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `http://localhost:3000/api/auth/magicLink/verifylogin?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Blogify" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "logIn",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};
const sendVerificationEmailForForgetpass = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `${process.env.SERVER_URL}/api/v1/changepass?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Oshop" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "Forget-pass",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sendBookingConfirmationMail = async (data, res,reservation) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { username, email } = data;
  console.log(data);

  try {
    let info = await transporter.sendMail({
      from: `"Restro" <${USER}>`,
      to: email,
      subject: "Confirmation Booking",
      html: BookingConfirmation(username),
    });

    const newVerification = new Mailverify({
      email,
      messageId: info.messageId,
      for: "Create-Booking",
    });

    await newVerification.save();

    return sendResponse(
      res,
      200,
      `Verification email was successfully sent to ${email}`,
      reservation
    );
  } catch (err) {
    
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    return sendResponse(res, 500, "Something went wrong", null, err);
  }
};



// done
const sendVerificationEmailSignup = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, firstName ,verificationUrl} = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);




  const verificationLink = verificationUrl

  try {
    let info = await transporter.sendMail({
      from: `"Restro" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: createAccountHTML(firstName, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "signup",
    });

    await newVerification.save();
    return res.status(200).json({
      success:true,
      message:"A mail was send your mail address"
    })

  } catch (err) {
    console.log(err)
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    )
    return res.status(400).json({
      success:true,
      message:"A mail was send your mail address"
    })
  }
};


//done
const sendVerificationEmailforgetpass = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, firstName ,resetUrl} = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);




  const verificationLink = resetUrl

  try {
    let info = await transporter.sendMail({
      from: `"Restro" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: createResetPasswordHTML(firstName, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "Forget Password",
    });

    await newVerification.save();
    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });

  } catch (err) {
    console.log(err)
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    )
    res.status(400).json({
      success: true,
      message: "some error ",
    });
  }
};

module.exports = {
  sendVerificationEmail,
  sendVerificationEmailforMagiclinklogIn,
  sendVerificationEmailForForgetpass,
  sendBookingConfirmationMail,
  sendVerificationEmailSignup,
  sendVerificationEmailforgetpass
};
