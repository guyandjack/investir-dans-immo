import nodemailer from "nodemailer";

const successResponse = {
  status: "success",
  message: "Votre message a été transmis",
  code: "200",
};

const validationResponse = {
  status: "error",
  message: "Données invalides",
  code: "401",
};





export const handleContactForm = (req, res) => {
  const isProd = process.env.NODE_ENV;
  console.log("isprod: ", isProd);
  const ADRESS =
    isProd === "prod"
      ? process.env.MAILBOX_PROD_ADRESS
      : process.env.MAILBOX_DEV_ADRESS;
  console.log("adress: ", ADRESS);
  const PASSWORD =
    isProd === "prod"
      ? process.env.MAILBOX_PROD_PASSWORD
      : process.env.MAILBOX_DEV_PASSWORD;
  console.log("password: ", PASSWORD);
  const HOST =
    isProd === "prod"
      ? process.env.MAILBOX_PROD_HOST
      : process.env.MAILBOX_DEV_HOST;
  console.log("host: ", HOST);

  if (!isProd || !ADRESS || !PASSWORD || !HOST) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
      code: "500"
  })
}

  if (Array.isArray(req.validationErrors) && req.validationErrors.length > 0) {
    return res.status(200).json({
      ...validationResponse,
      errors: req.validationErrors,
    });
  }

  const data = req.validatedContact ?? req.body;

  const transporter = nodemailer.createTransport({
    host: HOST,
    auth: {
      user: ADRESS,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: data.email,
    to: ADRESS,
    subject: "User message from 'monprojetlocatif.org'",
    text: data.message,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        message: `Erreur lors de l'envoi du mail: ${error.message}`,
        code: "500",
      });
    }
    return res.status(200).json(successResponse);
  });
};

export default handleContactForm;
