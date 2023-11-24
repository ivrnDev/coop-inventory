require('dotenv').config();
const { format } = require('date-fns')
const nodemailer = require("nodemailer");
module.exports = async function mailer(toAddress, receipt, student_id) {
  const { transaction, orders } = receipt

  const orderDetails = orders.map((value) => {
    return `
      - ${value.product_name.toUpperCase()}    x${value.order_quantity}     ${value.variant_name}    ₱ ${value.order_total}\n`
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  })
  const mailOptions = {
    from: 'QCU COOPERATIVES',
    to: toAddress,
    subject: "You've successfully placed an order.",
    text: `

    Receipt No. ${transaction[0].transaction_id}
    Transaction Date: ${format(transaction[0].transaction_date, "PPpp")}
    Pickup Date: ${format(transaction[0].pickup_date, "PP")}
   

    Student Name: ${transaction[0].student_name}
    Student ID: ${student_id}


    ORDER DETAILS: 
    ${orderDetails.join('')}




    TOTAL AMOUNT: ₱ ${orders[0].overall_total}

    -----------------------------------------------------------
    THANK YOU FOR PURCHASING !!!
    -----------------------------------------------------------
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email Sent')
    }

  })
}
