const express = require('express');
const router = express.Router();
const ctrls = require('../controllers/search');

router.get('/search', ctrls.getSearch);

module.exports = router;
