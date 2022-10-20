const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'Official Company <official@company.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };
  // Below returns a promise - don't think need to save result here
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;