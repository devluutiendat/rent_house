const router = require('express').Router();
const ctrls = require('../controllers/data');
router.get('/data', ctrls.getData);
router.get('/details/:id',ctrls.getDataId);
module.exports = router;
