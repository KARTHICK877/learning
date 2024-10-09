// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "kmass8754@gmail.com", 
        pass: "trpf jmtm zvjd liwf", 
    },
});

const sendOtpEmail = (to, otp) => {
    const mailOptions = {
        from: "kmass8754@gmail.com",
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. Please use it to verify your account.`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
