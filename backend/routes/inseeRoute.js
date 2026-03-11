const express = require("express");

const router = express.Router();

const {
  getIrl,
  getLatestIrl,
  healthCheck,
} = require("../controller/insee.controller.js");


router.get("/", getIrl);
router.get("/latest", getLatestIrl);
router.get("/health", healthCheck);

module.exports = router;
