const express = require("express");
const { generateShortId,getUrlfromId } = require("../controllers/urlControllers");
const router = express.Router();

router.post('/',generateShortId);
router.get('/:id',getUrlfromId);

module.exports = router;