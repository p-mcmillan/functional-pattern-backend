const nodemailer = require("nodemailer");
require("dotenv").config();

const USER = process.env.MAILER_USER;
const PASSWORD = process.env.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

function sendMail(data, callback) {
  const mailOptions = {
    from: data.email,
    to: "info@nycbiomechanics.com",
    subject: `A user has just submitted a contact form on NYC Biomechanics website`,
    text: `• Your Name: ${data.firstName} ${data.lastName} \n • Email: ${data.email} \n • Phone: ${data.phoneNumber} \n • Message: "${data.message}"`,
  };
  console.log(mailOptions, "mailoptions");

  transporter.sendMail(mailOptions, callback);
}

module.exports = { sendMail };
