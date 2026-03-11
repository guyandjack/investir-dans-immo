const express = require("express");

const router = express.Router();

const {
  getIrl,
  getLatestIrl,
} = require("../controller/insee.controller.js");


router.get("/", getIrl);
router.get("/latest", getLatestIrl);

module.exports = router;
