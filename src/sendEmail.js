const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chessclubdal@gmail.com',
      pass: 'ffqj uqtc dayc xfjn',
    },
  });

  let mailOptions = {
    from: 'chessclubdal@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

