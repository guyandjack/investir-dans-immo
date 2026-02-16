import { body, validationResult, matchedData } from "express-validator";
import regEx from "../utils/regEx.js";

const CIVILITIES = ["Monsieur", "Madame", "Mademoiselle"];

export const checkDataUserForm = [
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

export default checkDataUserForm;
