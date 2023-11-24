const nodemailer = require("nodemailer");

module.exports = async function mailer(toAddress) {
  console.log('called')
  const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: "qcucooperatives@gmail.com",
      pass: "pnze yjqh fdps mugr"
    }
  })
  const mailOptions = {
    from: 'qcucooperatives@gmail.com',
    to: toAddress,
    subject: "You've successfully placed order.",
    text: "This is my first email. I am so excited!"
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('email sent')
    }

  })
}
