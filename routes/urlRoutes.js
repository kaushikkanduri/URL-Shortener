const express = require("express");
const { generateShortId } = require("../controllers/urlControllers");
const router = express.Router();

router.post('/',generateShortId);

module.exports = router;