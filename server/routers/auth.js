// routers/auth.js
const router = require('express').Router();
const ctrls = require('../controllers/auth');
const Joi = require('joi');
const validateDto = require('../middlewares/validation');
const {stringReq,typeReq} = require('../middlewares/joiShema')

router.post('/register',
    validateDto(Joi.object({
        password: stringReq,
        name: stringReq,
        phone: stringReq,
        avatar:stringReq,
        type:typeReq,
        email:stringReq 
    })), 
    ctrls.register
);

router.post('/signin',
    validateDto(Joi.object({
        password: stringReq,
        phone: stringReq, // Assuming phone is required and should be a string
    })), 
    ctrls.signIn
);

module.exports = router;
