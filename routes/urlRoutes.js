const express = require("express");
const { generateShortId,getUrlfromId, getAnalyticsfromId } = require("../controllers/urlControllers");
const router = express.Router();

router.post('/',generateShortId);
router.get('/:id',getUrlfromId);
router.get('/analytics/:id',getAnalyticsfromId);

module.exports = router;