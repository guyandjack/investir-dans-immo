const { body, validationResult, matchedData } = require("express-validator");
const regEx = require("../utils/regEx");

const CIVILITIES = ["Monsieur", "Madame", "Mademoiselle"];

const checkDataUserForm = [
  body("civilite")
    .trim()
    .isIn(CIVILITIES)
    .withMessage("civilite invalide"),
  body("lastname")
    .trim()
    .matches(regEx.masqueText)
    .withMessage("lastname invalide"),
  body("firstname")
    .trim()
    .matches(regEx.masqueText)
    .withMessage("firstname invalide"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("email invalide"),
  body("message")
    .trim()
    .matches(regEx.masqueMessage)
    .withMessage("message invalide"),
  body("sujet").custom((value) => {
    if (value && value.trim().length > 0) {
      throw new Error("honeypot");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.validationErrors = errors.array();
    } else {
      req.validatedContact = matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      });
    }
    return next();
  },
];

module.exports = { checkDataUserForm };
