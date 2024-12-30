const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset Your NutriPlan Password',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #0284c7;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin: 20px 0;
      ">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail,
};
