/****************************************
 * Middelware qui envoi un mail au webmaster
 **************************************/
const nodemailer = require("nodemailer");


exports.sendMail = (req, res, next) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.orange.fr",
    auth: {
      user: "g-dupanloup@wanadoo.fr",
      pass: "9bce6hq9BCE6HQ",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: req.body.email,
    to: "g-dupanloup@wanadoo.fr",
    subject: "user message from 'immo-invest.com'",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(300).json({ message_status: error });
    } else {
      res.status(201).json({ message_status: "sended" });
    }
  });
};
